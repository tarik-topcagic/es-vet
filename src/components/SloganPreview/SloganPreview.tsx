"use client";

import Image from "next/image";
import React, { useRef } from "react";
import styles from "./SloganPreview.module.css";
import { useOnScreen } from "../hooks/useOnScreen";

export default function SloganPreview() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(contentRef, "0px", 0.1);

  return (
    <section className={styles.sloganPreviewContainer}>
      <div className={styles.imageColumn}>
        <Image
          src="/owneranddog.webp"
          alt="Owner and Dog"
          className={styles.sloganImage}
          fill
          loading="lazy"
        />
      </div>

      <div
        ref={contentRef}
        className={`${styles.textColumn} ${isVisible ? styles.animate : ""}`}
      >
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
