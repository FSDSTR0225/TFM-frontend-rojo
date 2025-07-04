import React, { useState, useEffect, useRef } from "react";
import DevsCard from "../components/DevsCard";
import { getAllDevelopers } from "../../../services/devService";
import { getAllProjects } from "../../../services/projectService";
import { Pagination } from '../../../components/Pagination';
import { PiFunnel, PiFunnelX, PiSortDescending, PiSortAscending } from "react-icons/pi";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "DevOps",
  "UX/UI",
];

const normalizeSkills = (skills) => {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills.map((s) => s.trim()).filter(Boolean);
  if (typeof skills === "string")
    return skills.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
};

const experienceOptions = [
  { label: "All", value: "" },
  { label: "0-1 years", value: "0-1" },
  { label: "2-4 years", value: "2-4" },
  { label: "5+ years", value: "5+" },
];

export const DevsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [developers, setDevelopers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [skillsFilter, setSkillsFilter] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [experienceDropdownOpen, setExperienceDropdownOpen] = useState(false);

  const [cardsPerPage, setCardsPerPage] = useState(12);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [devResponse, projectResponse] = await Promise.all([
        getAllDevelopers(),
        getAllProjects(),
      ]);

      if (devResponse?.error || projectResponse?.error) {
        console.error("Error fetching developers or projects");
        setDevelopers([]);
        setLoading(false);
        return;
      }

      const projectsByDev = {};

      projectResponse.forEach((project) => {
        const devId = project.owner?._id;
        if (!devId) return;

        if (!projectsByDev[devId]) {
          projectsByDev[devId] = [];
        }
        projectsByDev[devId].push(project.category);
      });
      const enrichedDevs = devResponse.map((dev) => {
        const devId = dev._id;
        const devCategories = projectsByDev[devId] || [];
        const uniqueCategories = [...new Set(devCategories)];
        const categories = uniqueCategories.length > 0 ? uniqueCategories : ["Other"];
        return { ...dev, categories };
      });
      setDevelopers(enrichedDevs);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, skillsFilter, experienceFilter]);

  useEffect(() => {
  const updateCardsPerPage = () => {
    const width = window.innerWidth;

    if (width >= 768) {
      setCardsPerPage(12); // 3 o 4 columnas
    } else if (width >= 640) {
      setCardsPerPage(10); // 2 columnas
    } else {
      setCardsPerPage(10); // 1 columna
    }
  };

  updateCardsPerPage(); // Initial call
  window.addEventListener("resize", updateCardsPerPage);
  return () => window.removeEventListener("resize", updateCardsPerPage);
}, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExperienceDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const allSkills = [
    ...new Set(
      developers.flatMap((dev) =>
        normalizeSkills(dev.role?.developer?.skills)
      )
    ),
  ].sort();

  let filteredDevs =
    activeTab === "All"
      ? developers
      : developers.filter((dev) => dev.categories.includes(activeTab));

  if (skillsFilter.length > 0) {
    filteredDevs = filteredDevs.filter((dev) => {
      const devSkills = normalizeSkills(dev.role?.developer?.skills);
      return skillsFilter.every((skill) => devSkills.includes(skill));
    });
  }

  if (experienceFilter) {
    filteredDevs = filteredDevs.filter((dev) => {
      const exp = dev.role?.developer?.experienceYears;
      if (!exp) return false;

      const years = parseInt(exp, 10);
      
      if (isNaN(years)) return false;
      if (experienceFilter === "0-1") return years <= 1;
      if (experienceFilter === "2-4") return years >= 2 && years <= 4;
      if (experienceFilter === "5+") return years >= 5;

      return true;
    });
  }

  filteredDevs.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.ceil(filteredDevs.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentDevs = filteredDevs.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const handlePageChange = (pageNum) => {
    if (pageNum === currentPage) return;
    setCurrentPage(pageNum);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const resetFilters = () => {
    setSkillsFilter([]);
    setExperienceFilter("");
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 mt-10 text-neutral-0">Meet Our Developers</h1>
      <p className="text-md font-normal mb-4 text-neutral-30">
        Discover the diverse talents and skills of our expert developers
      </p>

      {/* Filtros y orden */}
      <div className="flex items-center gap-4 mb-4 mt-6">
        {/* Botón filtros */}
        <div className="relative">
          <label className="btn btn-md swap swap-rotate w-25 bg-neutral-60 border-neutral-60 hover:bg-neutral-50">
            <input
              type="checkbox"
              checked={filtersOpen}
              onChange={() => setFiltersOpen((prev) => !prev)}
            />
            <div className="swap-on flex items-center gap-2">
              <PiFunnelX className="size-5" /> Filters
            </div>
            <div className="swap-off flex items-center gap-2">
              <PiFunnel className="size-5" /> Filters
            </div>
          </label>

          {filtersOpen && (
            <ul
              className="absolute top-12 z-50 rounded-box bg-neutral-80 shadow-2xl shadow-black border-2 border-neutral-70 min-w-85"
              onMouseLeave={(e) => {
                const toElement = e.relatedTarget || e.nativeEvent.relatedTarget;
                // Si toElement no existe o no está dentro del dropdown, cierra
                if (!toElement || !e.currentTarget.contains(toElement)) {
                  setFiltersOpen(false);
                }
              }}
            >
              {/* Skills Filter */}
              <li className="flex flex-col flex-wrap p-2 bg-neutral-80 border-b-2 border-neutral-50">
              <fieldset className="mb-4 flex items-center gap-2 flex-wrap overflow-auto max-h-50">
                <legend className="mb-2 font-semibold text-primary-50">Skills</legend>
                <div className="flex flex-wrap gap-2">
                  {allSkills.length === 0 && (
                    <p className="text-neutral-400">No skills available</p>
                  )}
                  {allSkills.map((skill) => (
                    <label
                      key={skill}
                      className={`flex items-center cursor-pointer btn btn-sm rounded-full ${
                        skillsFilter.includes(skill)
                          ? "bg-primary-70"
                          : "bg-neutral-55 border-none hover:bg-primary-60"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={skillsFilter.includes(skill)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSkillsFilter((prev) =>
                            checked
                              ? [...prev, skill]
                              : prev.filter((s) => s !== skill)
                          );
                        }}
                        className="hidden"
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Experience Dropdown */}
              <fieldset>
                <legend className="mb-2 font-semibold text-primary-50">Experience Years</legend>
                <div className="relative inline-block w-48" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() =>
                      setExperienceDropdownOpen((open) => !open)
                    }
                    className="w-full bg-neutral-55 border border-neutral-50 text-white py-2 px-3 rounded-md flex justify-between items-center"
                  >
                    <span>
                      {
                        experienceOptions.find(
                          (opt) => opt.value === experienceFilter
                        )?.label || "All"
                      }
                    </span>
                    <svg
                      className={`fill-current h-4 w-4 transition-transform duration-200 ${
                        experienceDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.516 7.548a.625.625 0 01.884-.012l3.108 2.99 3.106-2.99a.625.625 0 11.873.89l-3.6 3.47a.625.625 0 01-.87 0l-3.601-3.47a.625.625 0 01-.001-.89z" />
                    </svg>
                  </button>
                  {experienceDropdownOpen && (
                    <ul className="absolute z-50 mt-1 w-full bg-neutral-60 rounded-md shadow-lg max-h-60 overflow-auto text-white">
                      {experienceOptions.map((option) => (
                        <li
                          key={option.value}
                          className={`cursor-pointer py-2 pl-3 pr-9 hover:bg-primary-60 ${
                            experienceFilter === option.value
                              ? "bg-primary-700"
                              : ""
                          }`}
                          onClick={() => {
                            setExperienceFilter(option.value);
                            setExperienceDropdownOpen(false);
                          }}
                        >
                          <span
                            className={`block truncate ${
                              experienceFilter === option.value
                                ? "font-semibold"
                                : "font-normal"
                            }`}
                          >
                            {option.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </fieldset>

              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                className="mt-4 btn btn-outline btn-error w-full"
              >
                Reset Filters
              </button>
              </li>
            </ul>
          )}
        </div>

        {/* Botón de orden */}
        <label className="btn btn-md swap swap-rotate bg-neutral-60 hover:bg-neutral-50 text-white">
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

      {/* Categorías */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 px-4 py-0.5 bg-[#262626] rounded-md">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1.5 rounded-md font-medium text-sm transition-colors duration-200 cursor-pointer ${
              activeTab === category
                ? "bg-[#171717] text-white"
                : "bg-transparent text-[#A1A1AA] hover:bg-[#32B441] hover:text-white"
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Resultado o loading */}
      {loading ? (
        <div className="w-full flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : filteredDevs.length === 0 ? (
        <p className="text-center mt-4 text-sm text-neutral-30">
          No developers available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentDevs.map((developer) => (
            <DevsCard
            developer={developer}
              key={developer._id}
              developerId={developer._id}
              name={developer.name}
              surname={developer.surname}
              avatar={developer.avatar}
              profession={developer.role?.developer?.professionalPosition}
              experienceYears={developer.role?.developer?.experienceYears}
              location={developer.role?.developer?.location}
              skills={developer.role?.developer?.skills}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        filteredProjects={filteredDevs}
      />
    </div>
  );
};

export default DevsPage;
