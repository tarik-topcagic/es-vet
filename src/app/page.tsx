'use client';

import React from 'react';
import Hero from '../components/Hero/Hero';
import heroImage from '../../public/hero1.png';
import ServicesPreview from '@/components/ServicesPreview/ServicesPreview';
import AboutPreview from '@/components/AboutPreview/AboutPreview';
import SloganPreview from '@/components/SloganPreview/SloganPreview';
import ReviewsContainer from '@/components/ReviewsContainer/ReviewsContainer';
import ContactSection from '@/components/ContactSection/ContactSection';

const Home: React.FC = () => {
  return (
    <div>
      <Hero
        title="Vrhunska briga o vašim kućnim ljubimcima"
        subtitle="Profesionalna veterinarska njega koju vaš ljubimac zaslužuje"
        buttonText1="Kontaktirajte nas"
        buttonText2="Naše usluge"
        phoneNumber="(037) 772-002"
        mobileNumber="+(387) 062-647-943"
        imageUrl={heroImage.src} 
      />
      <ServicesPreview/>
      <AboutPreview/>
      <SloganPreview/>
      <ReviewsContainer/>
      <ContactSection/>
    </div>
  );
};

export default Home;

