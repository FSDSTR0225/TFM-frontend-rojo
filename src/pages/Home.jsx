import React from "react";
import { SectionContainer } from "../components/SectionContainer";
import { LastOffers } from "../components/home/LastOffers";
import { ReadySkills } from "../components/home/ReadySkills";
import { TechnologiesSection } from "../components/home/TechnologiesSection";
import { SearchingSection } from "../components/home/SearchingSection";
import { NumbersSection } from "../components/home/NumbersSection";
import { OutstandingTalents } from "../components/home/OutstandingTalents";
import { LastProjects } from "../components/home/LastProjects";

export const Home = () => {
  return (
    <SectionContainer classProps="lg:flex-column gap-8 lg:items-start">
      <SearchingSection />
      <NumbersSection />
      <TechnologiesSection />
      <OutstandingTalents />
      <LastProjects />
      <LastOffers />
      <ReadySkills />
    </SectionContainer>
  );
};
