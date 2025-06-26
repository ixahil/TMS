import React, { Suspense } from "react";
import { HeroSection } from "./_components/hero-section";
import { FeaturedTours } from "./_components/featured-tours";
import { TopDestinations } from "./_components/top-destination";
import { WhyChooseUs } from "./_components/why-choose-us";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Suspense fallback={<div className="h-96 animate-pulse bg-muted" />}>
        <FeaturedTours />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-muted" />}>
        <TopDestinations />
      </Suspense>
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
