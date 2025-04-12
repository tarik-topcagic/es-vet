'use client';

import React from 'react';
import Hero from '../../components/Hero/Hero';
import heroImage from '../../../public/hero3.png';

const Home: React.FC = () => {
  return (
    <div>
      <Hero
        title="O nama"
        subtitle="Gdje ljubav prema životinjama susreće stručnost"
        buttonText1="Kontaktirajte nas"
        buttonText2="Naše usluge"
        phoneNumber="(037) 772-002"
        mobileNumber="+(387) 062-647-943"
        imageUrl={heroImage.src} 
      />
    </div>
  );
};

export default Home;