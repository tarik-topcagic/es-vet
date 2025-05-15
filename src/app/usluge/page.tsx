"use client";

import React from "react";
import heroImage from "../../../public/hero2.webp";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("../../components/Hero/Hero"));
const ServicesContainer = dynamic(
  () => import("../../components/ServicesContainer/ServicesContainer"),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("../../components/ContactSection/ContactSection")
);

const Home: React.FC = () => {
  return (
    <div>
      <Hero
        title="Naše usluge"
        subtitle="Sve na jednom mjestu za zdravlje vašeg ljubimca"
        buttonText1="Kontaktirajte nas"
        phoneNumber="037 772 – 002"
        mobileNumber="+387 62 – 647 – 943"
        imageUrl={heroImage.src}
      />
      <ServicesContainer />
      <ContactSection />
    </div>
  );
};

export default Home;
