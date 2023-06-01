"use client"

import React from 'react';
import Hero from './components/home/hero/hero';
import About from './components/home/about/about';

import Footer from "./components/footer/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Footer />
    </main>
  )
}
