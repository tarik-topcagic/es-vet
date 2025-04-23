"use client";

import React, { useEffect, useRef, useState } from "react";
import { Home, MapPin, Phone, Smartphone, Mail, Clock } from "lucide-react";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const normalize = (num: string) => num.replace(/[^\d+]/g, "");
  const landline = "037 772 – 002";
  const mobile = "+387 62 – 647 – 943";
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.contactSection}>
      <div
        className={`${styles.mapContainer} ${
          animate ? styles.slideInLeft : ""
        }`}
      >
        <iframe
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.368293110142!2d15.815132076258571!3d45.17964047107072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4766ad5bddfc1313%3A0x95bb310cd36809dc!2sVeterinarska%20stanica%20E.%20S.%20Vet%20d.o.o.!5e0!3m2!1sen!2sba!4v1745227882801!5m2!1sen!2sba"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa veterinarske stanice"
        />
      </div>

      <div
        className={`${styles.infoContainer} ${
          animate ? styles.slideInRight : ""
        }`}
      >
        <h2 className={styles.title}>Posjetite nas</h2>
        <ul className={styles.infoList}>
          <li>
            <Home className={styles.icon} /> Veterinarska stanica E. S. Vet
          </li>
          <li>
            <MapPin className={styles.icon} /> Zuhdije Žalića 84, Velika Kladuša
            77230
          </li>
          <li>
            <Phone className={styles.icon} />
            <a href={`tel:${normalize(landline)}`} className={styles.phoneLink}>
              {landline}
            </a>
          </li>
          <li>
            <Smartphone className={styles.icon} />
            <a href={`tel:${normalize(mobile)}`} className={styles.phoneLink}>
              {mobile}
            </a>
          </li>
          <li>
            <Mail className={styles.icon} /> esvet.vk@gmail.com
          </li>
          <li>
            <Clock className={styles.icon} /> Ponedjeljak – Subota: 08h – 15h
            (redovne intervencije) <br /> 00h – 24h (hitne intervencije)
          </li>
        </ul>
      </div>
    </section>
  );
}
