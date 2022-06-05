import React from 'react';

import { AboutUS } from '../components/AboutUS';
import { Commitment } from '../components/Commitment';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
// import { Mint } from '../components/Mint';
import { Mint } from '../components/Mint';
import { Navbar } from '../components/Navbar';
import { Roadmap } from '../components/Roadmap';
import { Showcase } from '../components/Showcase';
import { Team } from '../components/Team';

export const Landing = () => {
  return (
    <div className="bg-black">
      <Navbar />
      {/* Hero */}
      <Hero />
      {/* Mint  */}
      <Mint />
      {/* NFTshowcase */}
      <Showcase />
      {/* About US */}
      <AboutUS />
      {/* Roadmap */}
      <Roadmap />
      {/* Commitment */}
      <Commitment />
      {/* FAQ */}
      <FAQ />
      {/* Team */}
      <Team />
      {/* Footer */}
      <Footer />
    </div>
  );
};
