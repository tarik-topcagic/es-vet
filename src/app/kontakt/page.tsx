"use client";

import React from "react";
import heroImage from "../../../public/hero4.webp";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("../../components/Hero/Hero"));
const ContactContainer = dynamic(
  () => import("../../components/ContactContainer/ContactContainer")
);

const Home: React.FC = () => {
  return (
    <div>
      <Hero
        title="Kontakt"
        subtitle="Tu smo za vas i vašeg ljubimca"
        buttonText2="Naše usluge"
        phoneNumber="037 772 – 002"
        mobileNumber="+387 62 – 647 – 943"
        imageUrl={heroImage.src}
      />
      <ContactContainer />
    </div>
  );
};

export default Home;
