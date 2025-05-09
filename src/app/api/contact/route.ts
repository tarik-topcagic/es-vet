import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import dns from "dns/promises";

interface ReCaptchaVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  "error-codes"?: string[];
  [key: string]: unknown;
}

const ContactSchema = z.object({
  name: z.string().min(2, "Ime i prezime moraju imati bar 2 znaka"),
  email: z.string().email("Neispravan email"),
  phone: z
    .string()
    .min(7, "Broj telefona je prekratak")
    .regex(/^\+?[0-9\s\-().]+$/, "Neispravan format telefona"),
  message: z.string().min(10, "Poruka mora imati bar 10 znakova"),
  recaptchaToken: z.string().min(1, "Recaptcha token nedostaje"),
});

export async function POST(request: NextRequest) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RECAPTCHA_SECRET_KEY } =
    process.env;
  if (
    !SMTP_HOST ||
    !SMTP_PORT ||
    !SMTP_USER ||
    !SMTP_PASS ||
    !RECAPTCHA_SECRET_KEY
  ) {
    console.error("Nedostaju SMTP varijable u .env.local:", {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      RECAPTCHA_SECRET_KEY,
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
  const { name, email, phone, message, recaptchaToken } = parsed.data;

  const verifyRes = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      }),
    }
  );
  const verifyJson = (await verifyRes.json()) as ReCaptchaVerifyResponse;
  if (!verifyJson.success) {
    return NextResponse.json(
      { error: "reCAPTCHA verifikacija nije uspjela" },
      { status: 400 }
    );
  }

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

  const phoneForEmail = phone.startsWith("+") ? phone : `+${phone}`;

  const mailOptions = {
    from: `"Kontakt forma" <${SMTP_USER}>`,
    to: SMTP_USER,
    replyTo: email,
    subject: `Nova poruka od ${name}`,
    html: `
      <p><strong>Ime i prezime:</strong> ${name}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phoneForEmail}</p>
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
      { error: `Greška pri slanju emaila: ${message}` },
      { status: 500 }
    );
  }
}
