"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./AboutContainer.module.css";
import Lightbox from "../Lightbox/Lightbox";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { LayoutGroup, motion } from "framer-motion";

export default function AboutContainer() {
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

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const rowsRef = useRef<HTMLDivElement[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [animateGallery, setAnimateGallery] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    rowsRef.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateGallery(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = (finalIndex: number) => {
    setSlideIndex(finalIndex);
    setIsLightboxOpen(false);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % lightboxImages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [slideIndex, lightboxImages.length]);

  const prevSlide = () => {
    setSlideIndex((i) => (i === 0 ? lightboxImages.length - 1 : i - 1));
  };
  const nextSlide = () => {
    setSlideIndex((i) => (i === lightboxImages.length - 1 ? 0 : i + 1));
  };

  return (
    <section className={styles.aboutContainer}>
      <div
        id="about-section"
        className={styles.row}
        ref={(el) => {
          if (el) rowsRef.current[0] = el;
        }}
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
            src="/dog.jpg"
            alt="Dog"
            width={250}
            height={250}
            className={styles.squareImage}
          />
        </div>
      </div>

      <div
        className={`${styles.row} ${styles.evenBlock}`}
        ref={(el) => {
          if (el) rowsRef.current[1] = el;
        }}
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
        className={styles.row}
        ref={(el) => {
          if (el) rowsRef.current[2] = el;
        }}
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
          animateGallery ? styles.animateGallery : ""
        }`}
      >
        <h3 className={styles.galleryTitle}>Galerija</h3>

        <div className={styles.slideshow}>
          <button onClick={prevSlide} className={styles.navButton}>
            <IoIosArrowBack />
          </button>
          <div
            onClick={() => openLightbox(slideIndex)}
            className={styles.slideImage}
          >
            <Image
              src={lightboxImages[slideIndex]}
              alt={`Slika ${slideIndex + 1}`}
              width={250}
              height={250}
              className={styles.squareImage3}
            />
          </div>
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
