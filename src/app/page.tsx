"use client"

import React from 'react';
import Hero from './components/home/hero/hero';
import About from './components/home/about/about';

import Footer from "./components/footer/footer";
import HaveCollection from './components/home/have collection/have collection';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <HaveCollection />
      <Footer />
    </main>
  )
}
