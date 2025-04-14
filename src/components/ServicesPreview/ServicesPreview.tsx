"use client";

import React from "react";
import Image from "next/image";
import styles from "./ServicesPreview.module.css";
import Link from "next/link";

export default function ServicesPreview() {
  return (
    <div className={styles.servicesPreviewContainer}>
      <div className={styles.headerRow}>
        <h2 className={styles.sectionTitle}>Naše usluge</h2>
      </div>

      <div className={styles.servicesGrid}>
        {/* 1. blok */}
        <div className={styles.serviceBlock}>
          <div className={styles.serviceContent}>
            <div className={styles.iconCircle}>
              <Image
                src="/shield.png"
                alt="Preventivna njega ikona"
                width={60}
                height={60}
                className={styles.serviceIcon}
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
                src="/tooth.png"
                alt="Zubna usluga ikona"
                width={60}
                height={60}
                className={styles.serviceIcon}
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
                src="/scalpel.png"
                alt="Operacija ikona"
                width={60}
                height={60}
                className={styles.serviceIcon}
              />
            </div>
            <div className={styles.textContainer}>
              <h3 className={styles.serviceTitle}>Operacija</h3>
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
                src="/microscope.png"
                alt="Laboratorijsko ispitivanje ikona"
                width={60}
                height={60}
                className={styles.serviceIcon}
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
        <button className="button secondaryButton">
          <Link href="/usluge#firstService" className="secondaryButtonLink">
            Saznaj više
          </Link>
        </button>
      </div>
    </div>
  );
}
