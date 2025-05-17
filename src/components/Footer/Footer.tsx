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
        | Design by <a href="https://github.com/tarik-topcagic" className={styles.nameLink}>Tarik Topčagić</a>
      </div>
    </footer>
  );
};

export default Footer;

