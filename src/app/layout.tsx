import type { Metadata } from "next";
import "../styles/globals.css";
import { Poppins } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Dobrodošli u E.S-Vet veterinarsku stanicu",
  description:
    "Posjetite nas. Veterinarska stanica E.S.-Vet. Ulica Zuhdije Žalića 84, 77230 Velika Kladuša. 037-772-002. +387 62-647-943. esvet.vk@gmail.com",
  icons: {
    icon: "/favicon-32x32.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
