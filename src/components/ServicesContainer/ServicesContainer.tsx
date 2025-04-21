"use client";

import React from "react";
import Image from "next/image";
import styles from "./ServicesContainer.module.css";

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
    imageSrc: "/services1.png",
  },
  {
    id: 2,
    title: "Zubna usluga",
    text: "Pružamo profesionalne zubne usluge, uključujući čišćenje zuba, liječenje desni i druge stomatološke intervencije, kako bi osigurali zdravlje usne šupljine vašeg ljubimca i spriječili ozbiljne zdravstvene probleme.",
    imageSrc: "/services2.jpeg",
  },
  {
    id: 3,
    title: "Hirurgija",
    text: "Naša veterinarska stanica nudi sigurne i stručne hirurške usluge za različite medicinske potrebe vašeg ljubimca, uključujući operacije povreda, bolesti, kao i rutinske zahvate poput sterilizacije ili kastracije.",
    imageSrc: "/services3.jpeg",
  },
  {
    id: 4,
    title: "Laboratorijska ispitivanja",
    text: "Nudimo širok spektar laboratorijskih ispitivanja za preciznu dijagnostiku vašeg ljubimca, uključujući analize krvi, urina i izmeta, kako bismo brzo i efikasno otkrili bilo kakve zdravstvene probleme.",
    imageSrc: "/services4.jpeg",
  },
  {
    id: 5,
    title: "Ultrazvučna dijagnostika",
    text: "Nudimo ultrazvučne preglede za brzu i preciznu dijagnostiku unutrašnjih organa vašeg ljubimca, uz minimalan stres i potpunu sigurnost.",
    imageSrc: "/services5.jpeg",
  },
  {
    id: 6,
    title: "Vještačko osjemenjavanje krava",
    text: "Izvodimo stručno vještačko osjemenjavanje krava kako bismo unaprijedili reproduktivne rezultate i genetski potencijal stada.",
    imageSrc: "/services6.jpeg",
  },
  {
    id: 7,
    title: "Obilježavanje konja i pasa mikročipom",
    text: "Pružamo uslugu mikročipiranja konja i pasa radi pouzdane identifikacije i usklađenosti sa zakonskim propisima.",
    imageSrc: "/services7.jpeg",
  },
  {
    id: 8,
    title: "Mliječni program",
    text: "Nudimo savjetodavne usluge u okviru mliječnog programa koje uključuju ishranu, zdravlje vimena i povećanje proizvodnje mlijeka.",
    imageSrc: "/services8.jpeg",
  },
  {
    id: 9,
    title: "Izrada programa iz oblasti poljoprivredne proizvodnje",
    text: "Izrađujemo individualne programe za unapređenje biljne i stočarske proizvodnje, prilagođene potrebama vašeg domaćinstva ili farme.",
    imageSrc: "/services9.jpeg",
  },
];

export default function ServicesContainer() {
  return (
    <section className={styles.servicesContainer}>
      {servicesData.map((service, index) => {
        const isEven = (index + 1) % 2 === 0;
        return (
          <div
            key={service.id}
            id={index === 0 ? "firstService" : undefined}
            className={`${styles.serviceBlock} ${
              isEven ? styles.evenBlock : styles.oddBlock
            }`}
          >
            {!isEven && (
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
            )}
            {isEven && (
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
      })}
    </section>
  );
}
