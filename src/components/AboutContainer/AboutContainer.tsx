"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./AboutContainer.module.css";
import Lightbox from "../Lightbox/Lightbox";

export default function AboutContainer() {
  const lightboxImages = [
    "/company-interior.jpg",
    "/work-room.jpg",
    "/work-room2.jpg",
    "/work-room3.jpg",
  ];

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <section className={styles.aboutContainer}>
      <div id="about-section" className={styles.row}>
        <div className={styles.textColumn}>
          <h3 className={styles.title}>
            Vaš pouzdan partner za cjelokupnu veterinarsku njegu
          </h3>
          <p className={styles.paragraph}>
            E. S. Vet d.o.o. je veterinarska stanica koja je potpuno posvećena
            dobrobiti Vaših ljubimaca. Nudimo preventivnu njegu, opću hirurgiju,
            zubne usluge, dijagnostičko snimanje, laboratorijska ispitivanja na
            licu mjesta, identifikaciju mikro čipova, farmaceutske proizvode...
          </p>
        </div>
        <div className={styles.imgColumn}>
          <Image
            src="/dog.jpg"
            alt="Dog"
            width={250}
            height={250}
            className={styles.squareImage}
          />
        </div>
      </div>

      <div className={`${styles.row} ${styles.evenBlock}`}>
        <div className={styles.imgColumn}>
          <Image
            src="/operating-room.jpg"
            alt="Vet Operating Room"
            width={250}
            height={250}
            className={styles.squareImage2}
          />
        </div>
        <div className={styles.textColumn}>
          <h3 className={styles.title}>
            Suvremena veterina vođena brigom i suosjećanjem
          </h3>
          <p className={styles.paragraph}>
            Naš tim nastoji omogućiti dobrobit svih kućnih ljubimaca. Zbog
            posvećenosti jedinstvenim potrebama svakog pacijenta, cilj nam je da
            iskoristimo najnovija dostignuća u veterinarskoj medicini i da
            stalno poboljšavamo naš standard njege. Svakodnevno se trudimo da
            iskoristimo svoje vještine, znanje i suosjećanje da bismo služili
            Vama i Vašem ljubimcu.
          </p>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.textColumn}>
          <h3 className={styles.title}>
            Sve za vašeg ljubimca, na jednom mjestu od 2010. godine
          </h3>
          <p className={styles.paragraph}>
            Veterinarska stanica E. S. Vet d.o.o. je izgrađena 2010. godine kako
            bi vlasnicima kućnih ljubimaca u gradu i okolini ponudila svaku
            uslugu neophodnu za njihovog ljubimca - sve pod jednim krovom.
          </p>
        </div>
        <div className={styles.imgColumn}>
          <Image
            src="/company-exterior.jpg"
            alt="Company exterior"
            width={250}
            height={250}
            className={styles.squareImage2}
          />
        </div>
      </div>

      <div className={styles.imageRow}>
        {lightboxImages.map((src, index) => (
          <div
            key={index}
            className={styles.imageItem}
            onClick={() => openLightbox(index)}
            style={{ cursor: "pointer" }}
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              width={250}
              height={250}
              className={styles.squareImage3}
            />
          </div>
        ))}
      </div>

      {isLightboxOpen && (
        <Lightbox
          images={lightboxImages}
          initialIndex={currentImageIndex}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
