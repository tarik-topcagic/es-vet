"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./AboutContainer.module.css";
import Lightbox from "../Lightbox/Lightbox";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { LayoutGroup, motion } from "framer-motion";
import { useOnScreen } from "../hooks/useOnScreen";
import { useSlider } from "../hooks/useSlider";

export default function AboutContainer() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#about-section') {
      const element = document.getElementById('about-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const lightboxImages = [
    "/company-interior.jpg",
    "/work-room.jpg",
    "/cat.jpg",
    "/work-room2.jpg",
    "/dog-at-vet.jpg",
    "/work-room3.jpg",
    "/goat.jpg",
    "/bath.jpg",
  ];

  const {
    currentIndex: slideIndex,
    isFading: galleryFading,
    goNext: nextSlide,
    goPrev: prevSlide,
    goTo: goToSlide,
  } = useSlider({
    length: lightboxImages.length,
    interval: 3000,
    fadeDuration: 0,
  });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };
  const closeLightbox = (finalIndex: number) => {
    goToSlide(finalIndex);
    setIsLightboxOpen(false);
  };

  const row0Ref = useRef<HTMLDivElement | null>(null);
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const row0Visible = useOnScreen(row0Ref, "0px", 0.1);
  const row1Visible = useOnScreen(row1Ref, "0px", 0.1);
  const row2Visible = useOnScreen(row2Ref, "0px", 0.1);
  const galleryVisible = useOnScreen(galleryRef, "0px", 0.1);

  return (
    <section className={styles.aboutContainer}>
      <div
        id="about-section"
        ref={row0Ref}
        className={`${styles.row} ${row0Visible ? styles.visible : ""}`}
      >
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
            src="/dog.webp"
            alt="Dog"
            width={250}
            height={250}
            className={styles.squareImage}
          />
        </div>
      </div>

      <div
        ref={row1Ref}
        className={`${styles.row} ${styles.evenBlock} ${
          row1Visible ? styles.visible : ""
        }`}
      >
        <div className={styles.imgColumn}>
          <Image
            src="/operation-table.jpg"
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

      <div
        ref={row2Ref}
        className={`${styles.row} ${row2Visible ? styles.visible : ""}`}
      >
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

      <div
        ref={galleryRef}
        className={`${styles.imagesContainer} ${
          galleryVisible ? styles.animateGallery : ""
        }`}
      >
        <h3 className={styles.galleryTitle}>Galerija</h3>
        <div
          onClick={() => openLightbox(slideIndex)}
          className={`${styles.slideImage} ${
            galleryFading ? styles.fadeOut : styles.fadeIn
          }`}
        >
          <Image
            src={lightboxImages[slideIndex]}
            alt={`Slika ${slideIndex + 1}`}
            width={250}
            height={250}
            className={styles.squareImage3}
          />
        </div>
        <div className={styles.slideshow}>
          <button onClick={prevSlide} className={styles.navButton}>
            <IoIosArrowBack />
          </button>
          <button onClick={nextSlide} className={styles.navButton}>
            <IoIosArrowForward />
          </button>
        </div>
        <LayoutGroup>
          <motion.div
            className={styles.imageRow}
            layout
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {lightboxImages.map((src, index) => (
              <motion.div
                key={index}
                className={styles.imageItem}
                layout
                onClick={() => openLightbox(index)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={src}
                  alt={`Slika ${index + 1}`}
                  width={250}
                  height={250}
                  className={styles.squareImage3}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>
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
