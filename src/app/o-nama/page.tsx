"use client";

import React from "react";
import heroImage from "../../../public/hero3.webp";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("../../components/Hero/Hero"));
const AboutContainer = dynamic(
  () => import("../../components/AboutContainer/AboutContainer"),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("../../components/ContactSection/ContactSection")
);

const Home: React.FC = () => {
  return (
    <div>
      <Hero
        title="O nama"
        subtitle="Gdje ljubav prema životinjama susreće stručnost"
        buttonText1="Kontaktirajte nas"
        buttonText2="Naše usluge"
        phoneNumber="037 772 – 002"
        mobileNumber="+387 62 – 647 – 943"
        imageUrl={heroImage.src}
      />
      <AboutContainer />
      <ContactSection />
    </div>
  );
};

export default Home;
