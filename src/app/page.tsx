import About from "@/app/components/home/about-section/about-section";
import Funds from "@home/funds-section/funds-section";
import DataInfo from "@home/dataInfo-section/dataInfo-section";
import HaveCollection from "@home/have collection/have collection";
import Artist from "@/app/components/home/artist/artist-section";

export default function Home() {
  return (
    <main>
      <About />
      <Funds />
      <DataInfo />
      <HaveCollection />
      <Artist />
    </main>
  );
}
