import React from 'react';
import { SectionContainer } from "../SectionContainer";
import { LastOffers } from "./LastOffers";
import { ReadySkills } from "./ReadySkills";
import { TechnologiesSection } from "./TechnologiesSection";
import { SearchingSection } from "./SearchingSection";
import { NumbersSection } from "./NumbersSection";
import { OutstandingTalentsSection } from "../../pages/Home";

export const Home = () => {

  return (
    <SectionContainer classProps="lg:flex-column gap-4 lg:items-start">
        <SearchingSection />
        <NumbersSection />
        <TechnologiesSection />
        <OutstandingTalentsSection />
        <LastOffers />
        <ReadySkills />
    </SectionContainer>
  );
};
