import React from 'react';
import { SectionContainer } from "../SectionContainer";
import { LastOffers } from "./LastOffers";
import { ReadySkills } from "./ReadySkills";

export const Home = () => {

  return (
    <SectionContainer classProps="lg:flex-column gap-4 lg:items-start">
        <LastOffers />
        <ReadySkills />
    </SectionContainer>
  );
};
