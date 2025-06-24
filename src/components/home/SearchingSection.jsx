import { useState, useRef, useEffect } from "react";
import { PiSortAscending, PiSortDescending } from "react-icons/pi";

import { SearchBar } from "./SearchBar";
import { SearchOfferCard } from "./SearchOfferCard";
import { SearchDevCard } from "./SearchDevCard";
import ProjectCard from "../../features/developer/components/ProjectCard";

import { useSortedResults } from "../../hooks/useSortedResults";
import { useSearchFilters } from "../../hooks/useSearchFilters";

export const SearchingSection = () => {
  const [results, setResults] = useState([]);
  const [type, setType] = useState("projects");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const resultsRef = useRef(null);

  const onResults = (data, selectedType) => {
    setResults(data);
    setType(selectedType);
    setDropdownOpen(true);
  };

  const {
    dateFilters,
    offerTypeFilters,
    dateFilterSelected,
    offerTypeFilterSelected,
    toggleDateFilter,
    toggleOfferTypeFilter,
    filteredResults,
  } = useSearchFilters(results, type);

  const sortedResults = useSortedResults(filteredResults, sortOrder);

  useEffect(() => {
    function handleClickOutside(event) {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getGridCols = () => {
    switch (type) {
      case "projects":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
      case "devs":
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4";
      case "offers":
        return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <div className="w-full py-16">
      <div className="flex flex-col">
        <div className="flex flex-col items-center text-center my-6">
          <h1 className="text-6xl bg-gradient-to-r from-primary-50 to-secondary-50 text-transparent bg-clip-text leading-normal inline-block font-bold mb-2">
            Connect Talent with Opportunity
          </h1>
          <span className="text-neutral-10 text-xl font-light">
            The website where developers show their skills and recruiters find
            the perfect match
          </span>
        </div>

        <div className="relative">
          <SearchBar onResults={onResults} />

          {dropdownOpen && (
            <div
              ref={resultsRef}
              className="absolute p-6 z-50 left-1/2 transform -translate-x-1/2 mt-2 w-full max-w-screen-xl bg-[#101010] border border-neutral-80 rounded-xl shadow-[0_50px_100px_rgba(0,0,0,0.8)] max-h-[70vh] overflow-y-auto hide-scrollbar"
            >
              {/* CONTENEDOR PRINCIPAL DE FILAS Y COLUMNAS PARA ALL RESULTS, TAGS Y SORT */}
              <div
                className="
                flex flex-col gap-4 mb-4

                sm:grid sm:grid-cols-[1fr_auto] sm:grid-rows-[auto_auto] sm:items-center sm:gap-x-4

                md:grid-cols-[1fr_2fr_auto] md:grid-rows-[auto_auto] md:items-center

                xl:flex xl:flex-row xl:items-center xl:justify-between
              "
              >
                {/* ALL RESULTS - siempre visible */}
                <h3 className="text-md font-medium text-left flex-shrink-0 sm:col-span-2 md:col-auto">
                  All results found: {sortedResults.length}
                </h3>

                {/* TAGS */}
                {(type === "offers" || type === "projects") && (
                  <div
                    className="
                    hidden sm:flex sm:flex-wrap sm:gap-2 sm:col-start-1 sm:col-end-2 sm:row-start-2
                    md:flex
                    md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-3
                    xl:justify-center xl:flex-nowrap
                    max-w-full
                    max-sm:max-w-none
                    sm:max-h-[96px] sm:overflow-y-auto sm:scrollbar-thin sm:scrollbar-thumb-neutral-600
                    sm:scrollbar-track-transparent
                  "
                    style={{ flexWrap: "wrap", rowGap: "0.25rem" }} // for two rows in sm if needed
                  >
                    {/* dateFilters */}
                    {dateFilters.map((filter) => {
                      const isSelected = dateFilterSelected === filter.value;
                      const baseBorder =
                        type === "projects"
                          ? "border-primary-60"
                          : "border-secondary-50";
                      const baseText =
                        type === "projects"
                          ? "text-primary-60"
                          : "text-secondary-50";
                      const bgSelected =
                        type === "projects"
                          ? "bg-primary-60"
                          : "bg-secondary-50";
                      const hoverBgClass =
                        type === "projects"
                          ? "hover:bg-primary-60"
                          : "hover:bg-secondary-50";

                      return (
                        <button
                          key={filter.value}
                          onClick={() => toggleDateFilter(filter.value)}
                          className={`
                          px-2 py-1 rounded-full border cursor-pointer select-none text-xs
                          ${
                            isSelected
                              ? `${bgSelected} text-white ${baseBorder}`
                              : `bg-transparent ${baseText} ${baseBorder} ${hoverBgClass} hover:text-white`
                          }
                        `}
                        >
                          {filter.label}
                        </button>
                      );
                    })}

                    {/* Separador entre dateFilters y offerTypeFilters solo si type === offers */}
                    {type === "offers" && (
                      <div className="w-full border-t border-gray-300 my-1 sm:my-0 sm:border-l sm:border-t-0 sm:mx-2 h-0 sm:h-auto" />
                    )}

                    {/* offerTypeFilters */}
                    {type === "offers" &&
                      offerTypeFilters.map((filter) => {
                        const isSelected = offerTypeFilterSelected === filter;
                        const baseBorder = "border-secondary-50";
                        const baseText = "text-secondary-50";
                        const bgSelected = "bg-secondary-50";
                        const hoverBgClass = "hover:bg-secondary-50";

                        return (
                          <button
                            key={filter}
                            onClick={() => toggleOfferTypeFilter(filter)}
                            className={`
                            px-2 py-1 rounded-full border cursor-pointer select-none text-xs
                            ${
                              isSelected
                                ? `${bgSelected} text-white ${baseBorder}`
                                : `bg-transparent ${baseText} ${baseBorder} ${hoverBgClass} hover:text-white`
                            }
                          `}
                          >
                            {filter}
                          </button>
                        );
                      })}
                  </div>
                )}

                {/* BOTÓN ORDENAR */}
                <label
                  className="
                  btn btn-md swap swap-rotate bg-neutral-60 hover:bg-neutral-50 text-white cursor-pointer flex-shrink-0

                  sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:self-center sm:justify-self-end sm:ml-4

                  md:row-start-1 md:row-end-3 md:col-start-3 md:col-end-4

                  xl:self-auto xl:justify-self-auto
                "
                >
                  <input
                    type="checkbox"
                    onChange={() =>
                      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                    }
                    checked={sortOrder === "asc"}
                  />
                  <div className="swap-on flex items-center gap-2">
                    <PiSortAscending className="size-5" />
                    <span>Oldest</span>
                  </div>
                  <div className="swap-off flex items-center gap-2">
                    <PiSortDescending className="size-5" />
                    <span>Latest</span>
                  </div>
                </label>
              </div>

              {sortedResults.length === 0 ? (
                <p className="text-center text-gray-500">No results</p>
              ) : (
                <div className={`grid gap-6 ${getGridCols()}`}>
                  {sortedResults.map((item) => {
                    if (type === "projects") {
                      return (
                        <div
                          key={item._id}
                          className="w-full aspect-[394/256] text-sm"
                        >
                          <ProjectCard
                            developerId={item.owner?._id}
                            name={item.owner?.name}
                            surname={item.owner?.surname}
                            avatar={item.owner?.avatar}
                            title={item.title}
                            category={item.category}
                            gallery={item.gallery}
                            projectid={item._id}
                            badgeText={item.badgeText}
                            smallTitle={true}
                          />
                        </div>
                      );
                    }
                    if (type === "devs") {
                      return (
                        <div key={item._id} className="w-full">
                          <SearchDevCard
                            key={item._id}
                            developerId={item._id}
                            name={item.name}
                            surname={item.surname}
                            avatar={item.avatar}
                            profession={
                              item.role?.developer?.professionalPosition
                            }
                            experienceYears={
                              item.role?.developer?.experienceYears
                            }
                            location={item.role?.developer?.location}
                          />
                        </div>
                      );
                    }
                    if (type === "offers") {
                      return (
                        <div key={item._id} className="w-full">
                          <SearchOfferCard offer={item} />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
