"use client";

import styles from "./StickyContactNavbar.module.css";
import { Phone, Smartphone, Mail } from "lucide-react";

interface StickyContactNavbarProps {
  show: boolean;
}

const StickyContactNavbar: React.FC<StickyContactNavbarProps> = ({ show }) => {
  return (
    <nav className={`${styles.stickyNavbar} ${!show ? styles.hidden : ""}`}>
      <div className={`${styles.contactBlock} ${styles.phone}`}>
        <a href="tel:037772002" className={styles.link}>
          <Phone className={styles.icon} size={20} />
          <span className={styles.text}>Telefon</span>
        </a>
      </div>

      <div className={`${styles.contactBlock} ${styles.mobile}`}>
        <a href="tel:+38762647943" className={styles.link}>
          <Smartphone className={styles.icon} size={20} />
          <span className={styles.text}>Mobitel</span>
        </a>
      </div>

      <div className={`${styles.contactBlock} ${styles.email}`}>
        <a href="mailto:esvet.vk@gmail.com" className={styles.link}>
          <Mail className={styles.icon} size={20} />
          <span className={styles.text}>E-mail</span>
        </a>
      </div>
    </nav>
  );
};

export default StickyContactNavbar;
