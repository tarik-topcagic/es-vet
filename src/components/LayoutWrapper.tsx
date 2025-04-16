"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar/Navbar";
import StickyContactNavbar from "./StickyContactNavbar/StickyContactNavbar";
import Footer from "./Footer/Footer";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const getBgColor = () => {
    switch (pathname) {
      case "/":
        return "home";
      case "/usluge":
        return "services";
      case "/o-nama":
        return "about";
      case "/kontakt":
        return "contact";
      default:
        return "home";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 750 && mobileMenuOpen) {
        if (window.scrollY > 160) {
          setShowSticky(true);
        } else {
          setShowSticky(false);
        }
        return;
      }

      const navbar = navbarRef.current;
      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        if (rect.bottom <= 0) {
          setShowSticky(true);
        } else {
          setShowSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, mobileMenuOpen]);

  return (
    <>
      <div ref={navbarRef}>
        <Navbar bgColor={getBgColor()} setMobileMenuOpen={setMobileMenuOpen} />
      </div>
      <StickyContactNavbar show={showSticky} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
