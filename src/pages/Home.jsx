import React from 'react';
import Hero from '../components/Hero';
import WhenToUse from '../components/WhenToUse';
import BestSelling from '../components/BestSelling';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';
import ContactUs from '../components/ContactUs';
import Subscribe from '../components/Subscribe';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      <WhenToUse />
      <BestSelling />
      <StatsSection />
      <Testimonials />
      <ContactUs />
      <Subscribe />
      <FAQ />
    </>
  );
}
