import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import dns from "dns/promises";

const ContactSchema = z.object({
  name: z.string().min(2, "Ime i prezime moraju imati bar 2 znaka"),
  email: z.string().email("Neispravan email"),
  phone: z
    .string()
    .min(7, "Broj telefona je prekratak")
    .regex(/^\+?[0-9\s\-().]+$/, "Neispravan format telefona"),
  message: z.string().min(10, "Poruka mora imati bar 10 znakova"),
});

export async function POST(request: NextRequest) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("Nedostaju SMTP varijable u .env.local:", {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
    });
    return NextResponse.json(
      { error: "Server nije pravilno konfigurisan" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neispravan JSON" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }
  const { name, email, phone, message } = parsed.data;

  try {
    const domain = email.split("@")[1];
    const mx = await dns.resolveMx(domain);
    if (!mx || mx.length === 0) {
      return NextResponse.json(
        { error: "Domena e-maila nema MX zapise" },
        { status: 400 }
      );
    }
  } catch (err: unknown) {
    console.warn("MX lookup failed:", err);
    return NextResponse.json(
      { error: "Ne mogu provjeriti e-mail domenu" },
      { status: 400 }
    );
  }

  const port = Number(SMTP_PORT);
  const secure = port === 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { rejectUnauthorized: secure },
  });

  const mailOptions = {
    from: `"Kontakt forma" <${SMTP_USER}>`,
    to: SMTP_USER,
    replyTo: email,
    subject: `Nova poruka od ${name}`,
    html: `
      <p><strong>Ime i prezime:</strong> ${name}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Poruka:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
    `,
  };

  try {
    await transporter.verify();
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (err instanceof Error) console.error("Mail error:", err);
    else console.error("Mail error, non-Error thrown:", err);
    return NextResponse.json(
      { error: "Greška pri slanju emaila" },
      { status: 500 }
    );
  }
}




