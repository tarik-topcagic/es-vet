"use client";

import React, { useRef } from "react";
import styles from "./Hero.module.css";
import { PawPrint } from "lucide-react"; // Uvozimo ikonu
import Link from "next/link";
import { useOnScreen } from "../hooks/useOnScreen";

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText1?: string;
  buttonText2?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  buttonText1,
  buttonText2,
  phoneNumber,
  mobileNumber,
  imageUrl,
}) => {
  const normalize = (num: string) => num.replace(/[^\d+]/g, "");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const animate = useOnScreen(contentRef, "0px", 0.1);

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div
        ref={contentRef}
        className={`${styles.heroContent} ${animate ? styles.animate : ""}`}
      >
        <PawPrint className={styles.heroIcon} size={70} />
        <h1 className={styles.heading}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.buttons}>
          {buttonText1 && (
            <Link
              href="/kontakt#contact-section"
              className="button primaryButton"
            >
              {buttonText1}
            </Link>
          )}
          {buttonText2 && (
            <Link
              href="/usluge#firstService"
              className="button secondaryButton"
            >
              {buttonText2}
            </Link>
          )}
        </div>
        <div className={styles.contactInfo}>
          {phoneNumber && (
            <p>
              Telefon:{" "}
              <a
                href={`tel:${normalize(phoneNumber)}`}
                className={styles.phoneLink}
              >
                {phoneNumber}
              </a>
            </p>
          )}
          {mobileNumber && (
            <p>
              Mobitel:{" "}
              <a
                href={`tel:${normalize(mobileNumber)}`}
                className={styles.phoneLink}
              >
                {mobileNumber}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
