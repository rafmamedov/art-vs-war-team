import Hero from "./components/home/hero-section/hero-section";
import About from "@/app/components/home/about-section/about-section";
import Funds from "@home/funds-section/funds-section";
import DataInfo from "@home/dataInfo-section/dataInfo-section";
import HaveCollection from "@/app/components/home/collection-section/collection-section";
import Artist from "@home/artist-section/artist-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Funds />
      <DataInfo />
      <HaveCollection />
      <Artist />
    </main>
  );
}
