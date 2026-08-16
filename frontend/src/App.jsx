import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhenToUse from './components/WhenToUse';
import BestSelling from './components/BestSelling';
import StatsSection from './components/StatsSection';
import Testimonials from './components/Testimonials';
import ContactUs from './components/ContactUs';
import Subscribe from './components/Subscribe';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <WhenToUse />
        <BestSelling />
        <StatsSection />
        <Testimonials />
        <ContactUs />
        <Subscribe />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
