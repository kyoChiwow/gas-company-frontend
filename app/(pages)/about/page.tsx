"use client";

import AboutHero from "@/components/modules/about/AboutHero";
import Journey from "@/components/modules/about/AboutJourney";
import Certifications from "@/components/modules/about/Certifications";
import TeamSection from "@/components/modules/about/TeamSection";
import WhyChooseUs from "@/components/modules/about/WhyChooseUs";

export default function About() {
  return (
    <main className="space-y-24 py-10">
      <AboutHero />
      <Journey />
      <WhyChooseUs />
      <Certifications />
      <TeamSection />
    </main>
  );
}
