"use client";

import React from "react";
import styles from "./Hero.module.css";
import { PawPrint } from "lucide-react"; // Uvozimo ikonu
import Link from "next/link";

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
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={styles.heroContent}>
        <PawPrint className={styles.heroIcon} size={70} />
        <h1 className={styles.heading}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.buttons}>
          {buttonText1 && (
            <button className="button primaryButton">
              <Link href="/kontakt" className="primaryButtonLink">
                {buttonText1}
              </Link>
            </button>
          )}
          {buttonText2 && (
            <button className="button secondaryButton">
              <Link href="/usluge#firstService" className="secondaryButtonLink">
                {buttonText2}
              </Link>
            </button>
          )}
        </div>
        <div className={styles.contactInfo}>
          {phoneNumber && <p>Telefon: {phoneNumber}</p>}
          {mobileNumber && <p>Mobitel: {mobileNumber}</p>}
        </div>
      </div>
    </section>
  );
};

export default Hero;
