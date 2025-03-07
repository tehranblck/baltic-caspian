'use client';

import Hero from './components/Hero';
import BestSellers from './components/BestSellers';
import About from './components/About';
import HomeGallery from './components/HomeGallery';
import Projects from './components/Projects';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <BestSellers />
      </motion.div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <About />
      </motion.div>

      {/* Gallery Section */}


      {/* Projects Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Projects />
      </motion.div>
    </div>
  );
}
