"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ServicesContainer.module.css";
import { useOnScreen } from "../hooks/useOnScreen";

interface Service {
  id: number;
  title: string;
  text: string;
  imageSrc: string;
}

const servicesData: Service[] = [
  {
    id: 1,
    title: "Preventivna njega",
    text: "Naša veterinarska stanica nudi kompletnu preventivnu njegu za vašeg ljubimca, uključujući redovne preglede, vakcinacije i savjete o ishrani i njezi, kako bi vaš ljubimac bio zdrav i sretan kroz cijeli život.",
    imageSrc: "/services1.webp",
  },
  {
    id: 2,
    title: "Zubna usluga",
    text: "Pružamo profesionalne zubne usluge, uključujući čišćenje zuba, liječenje desni i druge stomatološke intervencije, kako bi osigurali zdravlje usne šupljine vašeg ljubimca i spriječili ozbiljne zdravstvene probleme.",
    imageSrc: "/services2.webp",
  },
  {
    id: 3,
    title: "Hirurgija",
    text: "Naša veterinarska stanica nudi sigurne i stručne hirurške usluge za različite medicinske potrebe vašeg ljubimca, uključujući operacije povreda, bolesti, kao i rutinske zahvate poput sterilizacije ili kastracije.",
    imageSrc: "/services3.webp",
  },
  {
    id: 4,
    title: "Laboratorijska ispitivanja",
    text: "Nudimo širok spektar laboratorijskih ispitivanja za preciznu dijagnostiku vašeg ljubimca, uključujući analize krvi, urina i izmeta, kako bismo brzo i efikasno otkrili bilo kakve zdravstvene probleme.",
    imageSrc: "/services4.webp",
  },
  {
    id: 5,
    title: "Ultrazvučna dijagnostika",
    text: "Nudimo ultrazvučne preglede za brzu i preciznu dijagnostiku unutrašnjih organa vašeg ljubimca, uz minimalan stres i potpunu sigurnost.",
    imageSrc: "/services5.webp",
  },
  {
    id: 6,
    title: "Vještačko osjemenjavanje krava",
    text: "Izvodimo stručno vještačko osjemenjavanje krava kako bismo unaprijedili reproduktivne rezultate i genetski potencijal stada.",
    imageSrc: "/services6.webp",
  },
  {
    id: 7,
    title: "Obilježavanje konja i pasa mikročipom",
    text: "Pružamo uslugu mikročipiranja konja i pasa radi pouzdane identifikacije i usklađenosti sa zakonskim propisima.",
    imageSrc: "/services7.webp",
  },
  {
    id: 8,
    title: "Mliječni program",
    text: "Nudimo savjetodavne usluge u okviru mliječnog programa koje uključuju ishranu, zdravlje vimena i povećanje proizvodnje mlijeka.",
    imageSrc: "/services8.webp",
  },
  {
    id: 9,
    title: "Izrada programa iz oblasti poljoprivredne proizvodnje",
    text: "Izrađujemo individualne programe za unapređenje biljne i stočarske proizvodnje, prilagođene potrebama vašeg domaćinstva ili farme.",
    imageSrc: "/services9.webp",
  },
];

export default function ServicesContainer() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#firstService') {
      const element = document.getElementById('firstService');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);
  
  return (
    <section className={styles.servicesContainer}>
      {servicesData.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}
    </section>
  );
}

interface ServiceBlockProps {
  service: Service;
  index: number;
}

function ServiceBlock({ service, index }: ServiceBlockProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const visible = useOnScreen(ref, "0px", 0.1);
  const isEven = (index + 1) % 2 === 0;

  return (
    <div
      id={index === 0 ? "firstService" : undefined}
      ref={ref}
      className={`
        ${styles.serviceBlock}
        ${isEven ? styles.evenBlock : styles.oddBlock}
        ${visible ? styles.visible : ""}
      `}
    >
      {!isEven ? (
        <>
          <div className={styles.serviceText}>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </div>
          <div className={styles.serviceImage}>
            <Image
              src={service.imageSrc}
              alt={service.title}
              width={250}
              height={250}
              className={styles.squareImage}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.serviceImage}>
            <Image
              src={service.imageSrc}
              alt={service.title}
              width={250}
              height={250}
              className={styles.squareImage}
            />
          </div>
          <div className={styles.serviceText}>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </div>
        </>
      )}
    </div>
  );
}
