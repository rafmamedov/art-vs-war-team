"use client"

import HaveCollection from './components/home/have collection/have collection';
import Artist from './components/home/artist/artist';
import DataInfo from "./components/home/dataInfo-section/dataInfo-section";
import Hero from './components/home/hero/hero';
import About from './components/home/about/about';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <DataInfo />
      <HaveCollection />
      <Artist />
    </main>
  );
}
