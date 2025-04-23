"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const normalize = (num: string) => num.replace(/[^\d+]/g, "");
  const [animate, setAnimate] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
            <button className="button primaryButton">
              <Link
                href="/kontakt#contact-section"
                className="primaryButtonLink"
              >
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
