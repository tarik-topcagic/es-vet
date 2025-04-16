"use client";

import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        © 2025{" "}
        <a href="#top" className={styles.scrollTopLink}>
          es-vet.ba
        </a>{" "}
        | Design by Tarik Topčagić
      </div>
    </footer>
  );
};

export default Footer;

