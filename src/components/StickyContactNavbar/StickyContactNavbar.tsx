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
        <Phone className={styles.icon} size={20} />
        <span className={styles.text}>(037) 772 – 002</span>
      </div>
      <div className={`${styles.contactBlock} ${styles.mobile}`}>
        <Smartphone className={styles.icon} size={20} />
        <span className={styles.text}>+(387) 62 – 647 – 943</span>
      </div>
      <div className={`${styles.contactBlock} ${styles.email}`}>
        <Mail className={styles.icon} size={20} />
        <span className={styles.text}>esvet.vk@gmail.com</span>
      </div>
    </nav>
  );
};

export default StickyContactNavbar;
