import React, { useState, useEffect } from "react";
import { useCounter } from "../../hooks/useCounter";
import { getOffers } from "../../services/offersServices";
import { getAllDevelopers } from "../../services/devService";
import { getAllRecruiters } from "../../services/profileService";

export const NumbersSection = () => {
  const [offers, setOffers] = useState([]);
  const [devs, setDevs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState(0);

  const devsCount = useCounter(devs.length * 100);
  const companiesCount = useCounter(companies.length * 100);
  const offersCount = useCounter(offers.length * 100);
  const hiresCount = useCounter(acceptedApplications * 100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offersData, devsData, companiesData] = await Promise.all([
          getOffers(),
          getAllDevelopers(),
          getAllRecruiters(),
        ]);

        setOffers(offersData);
        setDevs(devsData);
        setCompanies(companiesData);

        let accepted = 0;
        offersData.forEach((offer) => {
          offer.applicants?.forEach((applicant) => {
            if (applicant.status === "accepted") {
              accepted++;
            }
          });
        });
        setAcceptedApplications(accepted);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center w-full mt-8 px-2">
      <div className="w-full max-w-6xl bg-neutral-80 border border-neutral-60 rounded-3xl py-8 px-2 sm:py-12 sm:px-6 md:py-16 md:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-50 mb-2 block">
              +{devsCount}
            </span>
            <span className="text-neutral-20 text-sm md:text-base block">
              Developers
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-50 mb-2 block">
              +{companiesCount}
            </span>
            <span className="text-neutral-20 text-sm md:text-base block">
              Companies
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-50 mb-2 block">
              +{offersCount}
            </span>
            <span className="text-neutral-20 text-sm md:text-base block">
              Active Offers
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-50 mb-2 block">
              +{hiresCount}
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
