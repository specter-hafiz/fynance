import Benefits from "@/components/sections/Benefits";
import Features from "@/components/sections/Features";
import GetStarted from "@/components/sections/GetStarted";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import React from "react";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Benefits />
      <Stats />
      <Testimonials />
      <GetStarted />
    </>
  );
};

export default Home;
