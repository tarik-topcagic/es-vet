"use client";

import React from "react";
import heroImage from "../../public/hero1.webp";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("../components/Hero/Hero"));
const ServicesPreview = dynamic(
  () => import("../components/ServicesPreview/ServicesPreview")
);
const AboutPreview = dynamic(
  () => import("../components/AboutPreview/AboutPreview")
);
const SloganPreview = dynamic(
  () => import("../components/SloganPreview/SloganPreview")
);
const ReviewsContainer = dynamic(
  () => import("../components/ReviewsContainer/ReviewsContainer")
);
const ContactSection = dynamic(
  () => import("../components/ContactSection/ContactSection")
);

const Home: React.FC = () => {
  return (
    <div>
      <Hero
        title="Vrhunska briga o vašim kućnim ljubimcima"
        subtitle="Profesionalna veterinarska njega koju vaš ljubimac zaslužuje"
        buttonText1="Kontaktirajte nas"
        buttonText2="Naše usluge"
        phoneNumber="037 772 – 002"
        mobileNumber="+387 62 – 647 – 943"
        imageUrl={heroImage.src}
      />
      <ServicesPreview />
      <AboutPreview />
      <SloganPreview />
      <ReviewsContainer />
      <ContactSection />
    </div>
  );
};

export default Home;
