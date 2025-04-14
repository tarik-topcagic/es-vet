'use client';

import React from 'react';
import Hero from '../../components/Hero/Hero';
import heroImage from '../../../public/hero2.png';
import ServicesContainer from '@/components/ServicesContainer/ServicesContainer';

const Home: React.FC = () => {
  return (
    <div>
      <Hero
        title="Naše usluge"
        subtitle="Sve na jednom mjestu za zdravlje vašeg ljubimca"
        buttonText1="Kontaktirajte nas"
        phoneNumber="(037) 772-002"
        mobileNumber="+(387) 062-647-943"
        imageUrl={heroImage.src} 
      />
      <ServicesContainer/>
    </div>
  );
};

export default Home;