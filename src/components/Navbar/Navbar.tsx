"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  bgColor: string;
  setMobileMenuOpen?: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ bgColor, setMobileMenuOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (setMobileMenuOpen) {
      setMobileMenuOpen(newState);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 750 && isMenuOpen) {
        setIsMenuOpen(false);
        if (setMobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, setMobileMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      if (setMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <nav className={`${styles.navbar} ${styles[bgColor]}`}>
      <Link href="/" className={styles.logo}>
        <Image src="/logo.png" alt="ES-Vet Logo" width={100} height={30} />
      </Link>

      <ul className={`${styles.menu} ${isMenuOpen ? styles.active : ""}`}>
        <li>
          <Link href="/" className={styles.menuItem}>
            Početna
          </Link>
        </li>
        <li>
          <Link href="/usluge" className={styles.menuItem}>
            Usluge
          </Link>
        </li>
        <li>
          <Link href="/o-nama" className={styles.menuItem}>
            O nama
          </Link>
        </li>
        <li>
          <Link href="/kontakt" className={styles.menuItem}>
            Kontakt
          </Link>
        </li>
      </ul>

      <div
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </nav>
  );
};

export default Navbar;
