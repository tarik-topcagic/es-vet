"use client";

import React, { useRef } from "react";
import Image from "next/image";
import styles from "./ServicesPreview.module.css";
import Link from "next/link";
import { useOnScreen } from "../hooks/useOnScreen";

export default function ServicesPreview() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref, "0px", 0);

  return (
    <div
      ref={ref}
      className={`${styles.servicesPreviewContainer} ${
        isVisible ? styles.animatePreview : ""
      }`}
    >
      <div className={styles.headerRow}>
        <h2 className={styles.sectionTitle}>Naše usluge</h2>
      </div>

      <div className={styles.servicesGrid}>
        {/* 1. blok */}
        <div className={styles.serviceBlock}>
          <div className={styles.serviceContent}>
            <div className={styles.iconCircle}>
              <Image
                src="/shield.webp"
                alt="Preventivna njega ikona"
                width={60}
                height={60}
                className={styles.serviceIcon}
                loading="lazy"
              />
            </div>
            <div className={styles.textContainer}>
              <h3 className={styles.serviceTitle}>Preventivna njega</h3>
              <p className={styles.serviceText}>
                Pružamo redovne preglede, vakcinacije i savjete za zdravlje
                vašeg ljubimca.
              </p>
            </div>
          </div>
        </div>

        {/* 2. blok */}
        <div className={styles.serviceBlock}>
          <div className={styles.serviceContent}>
            <div className={styles.iconCircle}>
              <Image
                src="/tooth.webp"
                alt="Zubna usluga ikona"
                width={60}
                height={60}
                className={styles.serviceIcon}
                loading="lazy"
              />
            </div>
            <div className={styles.textContainer}>
              <h3 className={styles.serviceTitle}>Zubna usluga</h3>
              <p className={styles.serviceText}>
                Nudimo čišćenje zuba i liječenje desni za očuvanje oralnog
                zdravlja ljubimca.
              </p>
            </div>
          </div>
        </div>

        {/* 3. blok */}
        <div className={styles.serviceBlock}>
          <div className={styles.serviceContent}>
            <div className={styles.iconCircle}>
              <Image
                src="/scalpel.webp"
                alt="Operacija ikona"
                width={60}
                height={60}
                className={styles.serviceIcon}
                loading="lazy"
              />
            </div>
            <div className={styles.textContainer}>
              <h3 className={styles.serviceTitle}>Hirurgija</h3>
              <p className={styles.serviceText}>
                Izvodimo sigurne hirurške zahvate, uključujući sterilizaciju i
                kastraciju.
              </p>
            </div>
          </div>
        </div>

        {/* 4. blok */}
        <div className={styles.serviceBlock}>
          <div className={styles.serviceContent}>
            <div className={styles.iconCircle}>
              <Image
                src="/microscope.webp"
                alt="Laboratorijsko ispitivanje ikona"
                width={60}
                height={60}
                className={styles.serviceIcon}
                loading="lazy"
              />
            </div>
            <div className={styles.textContainer}>
              <h3 className={styles.serviceTitle}>
                Laboratorijsko ispitivanje
              </h3>
              <p className={styles.serviceText}>
                Obavljamo analize krvi, urina i tkiva za preciznu dijagnostiku.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonRow}>
        <Link href="/usluge#firstService" className="button secondaryButton">
          Saznaj više
        </Link>
      </div>
    </div>
  );
}
