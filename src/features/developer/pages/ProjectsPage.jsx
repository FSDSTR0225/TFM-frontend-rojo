import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { Pagination } from "../../../components/Pagination";
import { getAllProjects } from "../../../services/projectService";
import { PiFunnel, PiFunnelX, PiSortAscending, PiSortDescending } from "react-icons/pi";

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

export const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  const projectsPerPage = 12;

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const response = await getAllProjects();

      if (response?.error) {
        console.error("Error fetching projects:", response.message);
        setProjects([]);
      } else {
        setProjects(response);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, skillsFilter]);

  const allSkills = [
    ...new Set(projects.flatMap((project) => normalizeSkills(project.projectSkills))),
  ].sort();

  let filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  if (skillsFilter.length > 0) {
    filteredProjects = filteredProjects.filter((project) => {
      const projectSkills = normalizeSkills(project.projectSkills);
      return skillsFilter.every((skill) => projectSkills.includes(skill));
    });
  }

  filteredProjects.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum === currentPage) return;
    setCurrentPage(pageNum);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 mt-10 text-neutral-0">
        Explore Projects
      </h1>
      <p className="text-md font-normal mb-4 text-neutral-30">
        Discover talented developers for your next project
      </p>

      {/* Filtros y Orden */}
      <div className="flex items-center gap-4 xl:mb-4 mt-6">
        {/* Toggle filtros */}
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
              <li className="flex flex-col flex-wrap p-2 bg-neutral-80 border-b-2 border-neutral-50">
                <fieldset className="flex items-center gap-2 flex-wrap overflow-auto max-h-60">
                  <legend className="mb-2 font-semibold text-primary-50">Skills</legend>
                  {allSkills.length === 0 && <p>No skills available</p>}
                  {allSkills.map((skill) => (
                    <label
                      key={skill}
                      className={`flex items-center cursor-pointer btn btn-sm rounded-full mr-2
                        ${
                          skillsFilter.includes(skill)
                            ? "bg-primary-70"
                            : "bg-neutral-55 border-none hover:bg-primary-60"
                        }
                      `}
                    >
                      <input
                        aria-label={skill}
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
                </fieldset>
              </li>
              <li className="p-2">
                <button
                  onClick={() => setSkillsFilter([])}
                  className="btn btn-outline btn-error w-full"
                >
                  Reset Filters
                </button>
              </li>
            </ul>
          )}
        </div>

        {/* Ordenamiento */}
        <label className="btn btn-md swap swap-rotate bg-neutral-60 hover:bg-neutral-50 text-white">
          <input
            type="checkbox"
            onChange={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
            checked={sortOrder === "asc"}
          />
          <div className="swap-on flex items-center gap-2"><PiSortAscending className="size-5" /><span>Oldest</span></div>
          <div className="swap-off flex items-center gap-2"><PiSortDescending className="size-5" /><span>Latest</span></div>
        </label>
      </div>

      {/* Categorías */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 px-4 py-0.5 bg-[#262626] rounded-md">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1.5 rounded-md font-medium text-sm transition-colors duration-200 cursor-pointer
              ${
                activeTab === category
                  ? "bg-[#171717] text-white"
                  : "bg-transparent text-[#A1A1AA] hover:bg-[#32B441] hover:text-white focus:text-white"
              }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Resultados */}
      {loading ? (
        <div className="w-full flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <div>
          {filteredProjects.length === 0 ? (
            <p className="text-center mt-4 text-sm text-[#606a79]">
              No projects available in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((project) => (
                <div key={project._id} className="w-full aspect-[394/256]">
                  <ProjectCard
                    developerId={project.owner?._id}
                    name={project.owner?.name}
                    surname={project.owner?.surname}
                    avatar={project.owner?.avatar}
                    title={project.title}
                    category={activeTab === "All" ? project.category : null}
                    gallery={project.gallery}
                    projectid={project._id}
                    badgeText={project.badgeText}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        filteredProjects={filteredProjects}
      />
    </div>
  );
};

export default ProjectsPage;
