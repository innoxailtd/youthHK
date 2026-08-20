import { AboutIntro } from "@/components/home/about-intro";
import { HeroBanner } from "@/components/home/hero-banner";
import { HomeUpdates } from "@/components/home/home-updates";
import { PhotoGallery } from "@/components/home/photo-gallery";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <HomeUpdates />
      <AboutIntro />
      <PhotoGallery />
    </>
  );
}
