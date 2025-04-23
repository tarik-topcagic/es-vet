"use client";

import React from "react";
import Hero from "../../components/Hero/Hero";
import heroImage from "../../../public/hero2.png";
import ServicesContainer from "@/components/ServicesContainer/ServicesContainer";
import ContactSection from "@/components/ContactSection/ContactSection";

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
