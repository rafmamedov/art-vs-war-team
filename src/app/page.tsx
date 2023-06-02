"use client"

import React from 'react';

import DataInfo from "./components/home/dataInfo-section/dataInfo-section";
import HaveCollection from './components/home/have collection/have collection';
import Artist from './components/home/artist/artist';

export default function Home() {
  return (
    <main>
      <HaveCollection />
      <Artist />
      <DataInfo />
    </main>
  );
}
