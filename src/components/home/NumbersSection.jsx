import React, { useState, useEffect } from "react";
import { getOffers } from "../../services/offersServices";
import { getAllDevelopers } from "../../services/devService";
import { getAllRecruiters } from "../../services/profileService";

export const NumbersSection = () => {
  const [offers, setOffers] = useState([]);
  const [devs, setDevs] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersData = await getOffers();
        setOffers(offersData);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    const fetchDevs = async () => {
      try {
        const devsData = await getAllDevelopers();
        setDevs(devsData);
      } catch (error) {
        console.error("Error fetching devs:", error);
      }
    };

    const fetchCompany = async () => {
      try {
        const companiesData = await getAllRecruiters();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchOffers();
    fetchDevs();
    fetchCompany();
  }, []);

  let acceptedApplications = 0;
  offers.map((offer) => {
    if (offer.applicants) {
      offer.applicants.map((applicant) => {
        if (applicant.status === "accepted") {
          acceptedApplications++;
        }
      });
    }
  });

  return (
    <div className="flex justify-center items-center w-full mt-8 px-2">
      <div className="w-full max-w-6xl bg-neutral-80 border border-neutral-60 rounded-3xl py-8 px-2 sm:py-12 sm:px-6 md:py-16 md:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-50 mb-2 block">
              +{devs.length * 100}
            </span>
            <span className="text-neutral-20 text-sm md:text-base block">
              Developers
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-50 mb-2 block">
              +{companies.length * 100}
            </span>
            <span className="text-neutral-20 text-sm md:text-base block">
              Companies
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-50 mb-2 block">
              +{offers.length * 100}
            </span>
            <span className="text-neutral-20 text-sm md:text-base block">
              Active Offers
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-50 mb-2 block">
              +{acceptedApplications * 100}
            </span>
            <span className="text-neutral-20 text-sm md:text-base block">
              Total hires
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
