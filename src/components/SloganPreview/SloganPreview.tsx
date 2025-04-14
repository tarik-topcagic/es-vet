"use client";

import Image from "next/image";
import React from "react";
import styles from "./SloganPreview.module.css";

export default function SloganPreview() {
  return (
    <section className={styles.sloganPreviewContainer}>
      <div className={styles.imageColumn}>
        <Image
          src="/owneranddog.png"
          alt="Owner and Dog"
          className={styles.sloganImage}
          fill
          priority
        />
      </div>

      <div className={styles.textColumn}>
        <div className={styles.sloganWrapper}>
          <div className={styles.lemonShape}></div>
          <h2 className={styles.sloganText}>
            Zdravi ljubimci, sretni vlasnici! 🐾
          </h2>
        </div>
      </div>
    </section>
  );
}
