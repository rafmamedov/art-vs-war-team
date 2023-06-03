"use client"

import HaveCollection from './components/home/have collection/have collection';
import Artist from './components/home/artist/artist';
import DataInfo from "./components/home/dataInfo-section/dataInfo-section";

export default function Home() {
  return (
    <main>
      <HaveCollection />
      <Artist />
      <DataInfo />
    </main>
  );
}
