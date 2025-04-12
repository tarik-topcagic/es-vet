'use client';

import React from 'react';
import Hero from '../../components/Hero/Hero';
import heroImage from '../../../public/hero4.jpg';

const Home: React.FC = () => {
  return (
    <div>
      <Hero
        title="Kontakt"
        subtitle="Tu smo za vas i vašeg ljubimca"
        buttonText2="Naše usluge"
        phoneNumber="(037) 772-002"
        mobileNumber="+(387) 062-647-943"
        imageUrl={heroImage.src} 
      />
    </div>
  );
};

export default Home;