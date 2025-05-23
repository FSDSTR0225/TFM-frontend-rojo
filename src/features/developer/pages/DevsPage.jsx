import React, { useState, useEffect } from "react";
import DevsCard from "../components/DevsCard";  // Asegúrate de que DevsCard esté correctamente importado
import { getAllDevelopers } from "../../../services/devService";
import { Pagination } from '../../../components/Pagination';

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "DevOps",
  "UX/UI",
];

export const DevsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const projectsPerPage = 12;

  useEffect(() => {
  const fetchDevelopers = async () => {
    setLoading(true);
    const response = await getAllDevelopers();

    if (response?.error) {
      console.error("Error fetching developers:", response.message);
      setProjects([]);
    } else {
      setProjects(response);
    }

    setLoading(false);
  };

  fetchDevelopers();
}, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum === currentPage) return;
    setCurrentPage(pageNum); // Primero actualizamos la página
    setLoading(true);        // Luego activamos el loading
    setTimeout(() => {
      setLoading(false);     // Después de un pequeño retraso, desactivamos el loading
    }, 500);
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 mt-10 text-neutral-0">Meet Our Developers</h1>
      <p className="text-md font-normal mb-4 text-neutral-30">Discover the diverse talents and skills of our expert developers</p>

      {/* Tabs */}
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

      {loading ? (
        <div className="w-full flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <div>
          {filteredProjects.length === 0 ? (
            <p className="text-center mt-4 text-sm text-neutral-30">
              No projects available in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {currentProjects.map((developer) => (
              <DevsCard
                  key={developer._id}
                  id={developer._id}
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
        </div>
      )}

      {/* Pasar los props necesarios al componente Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        filteredProjects={filteredProjects}
      />
    </div>
  );
};

export default DevsPage;
