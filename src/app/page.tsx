"use client"

import HaveCollection from './components/home/have collection/have collection';
import Artist from './components/home/artist/artist';
import DataInfo from "./components/home/dataInfo-section/dataInfo-section";

import About from './components/home/about/about';
import Hero from './components/home/hero/hero';

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
