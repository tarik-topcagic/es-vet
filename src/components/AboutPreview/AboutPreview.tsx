"use client";

import Image from "next/image";
import React, { useRef } from "react";
import styles from "./AboutPreview.module.css";
import Link from "next/link";
import { useOnScreen } from "../hooks/useOnScreen";

export default function AboutPreview() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(contentRef, "0px", 0.1);

  return (
    <section className={styles.aboutPreviewContainer}>
      <div
        ref={contentRef}
        className={`${styles.textColumn} ${isVisible ? styles.animate : ""}`}
      >
        <h2 className={styles.aboutTitle}>O nama</h2>
        <p className={styles.aboutText}>
          E. S. Vet d.o.o. je veterinarska stanica koja je potpuno posvećena
          dobrobiti Vaših ljubimaca. Nudimo preventivnu njegu, opštu hirurgiju,
          zubne usluge, dijagnostičko snimanje, laboratorijska ispitivanja na
          licu mesta, identifikaciju mikro čipova, farmaceutske proizvode...
        </p>
        <Link href="/o-nama#about-section" className="button secondaryButton">
          Saznaj više
        </Link>
      </div>

      <div className={styles.imageColumn}>
        <Image
          src="/vet.webp"
          alt="Veterinar"
          className={styles.vetImage}
          fill
          loading="lazy"
        />
      </div>
    </section>
  );
}
