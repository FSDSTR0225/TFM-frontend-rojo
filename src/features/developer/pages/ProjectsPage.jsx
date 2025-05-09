// ProjectsPage.js
import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import Pagination from '../../../components/Pagination'

import ProjectCardImageProv from "../../../assets/image-1.jpg";
import ProjectCardImageProv2 from "../../../assets/image-2.jpg";
import ProjectCardImageProv3 from "../../../assets/image-3.jpg";
import ProjectCardImageProv4 from "../../../assets/image-4.jpg";
import Avatar1 from "../../../assets/avatar-1.png";
import Avatar2 from "../../../assets/avatar-2.png";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "DevOps",
  "UX/UI",
];

export const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const projectsPerPage = 9;

  useEffect(() => {
    const fetchProjects = async () => {
      const data = [
        { id: 1, name: "Beli", surname: "Ochando", title: "Landing Page", category: "UX/UI", avatar: Avatar1, image: ProjectCardImageProv2, projectLink: "/project/1", badgeText: "New" },
        { id: 2, name: "Toni", surname: "Arce", title: "App de Recetas", category: "Frontend", avatar: Avatar2, image: ProjectCardImageProv, projectLink: "/project/2", badgeText: "New" },
        { id: 3, name: "Carlos", surname:"Daymond", title: "Clasificador de Imágenes", category: "DevOps", avatar: Avatar2, image: ProjectCardImageProv3, projectLink: "/project/3" },
        { id: 4, name: "Jeremie", surname:"Klose", title: "Dashboard Admin", category: "Full Stack", avatar: Avatar2, image: ProjectCardImageProv4, projectLink: "/project/4" },
        { id: 5, name: "Luisa", surname:"Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, image: ProjectCardImageProv, projectLink: "/project/5" },
        { id: 6, name: "Luisa", surname:"Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, image: ProjectCardImageProv, projectLink: "/project/6" },
        { id: 7, name: "Luisa", surname:"Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, image: ProjectCardImageProv, projectLink: "/project/7" },
        { id: 8, name: "Luisa", surname:"Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, image: ProjectCardImageProv, projectLink: "/project/8" },
        { id: 9, name: "Luisa", surname:"Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, image: ProjectCardImageProv, projectLink: "/project/9" },
        { id: 10, name: "Luisa", surname:"Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, image: ProjectCardImageProv, projectLink: "/project/10" },
      ];
      setProjects(data);
    };

    fetchProjects();
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
      <h1 className="text-3xl font-bold mb-2 mt-10 text-neutral-0">Developer Projects</h1>
      <p className="text-md font-normal mb-4 text-neutral-30">Discover talented developers for your next project</p>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-6 px-4 py-0.5 bg-neutral-60 rounded-md">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1.5 rounded-md font-medium text-sm transition-colors duration-200 cursor-pointer
              ${activeTab === category
                ? "bg-neutral-90 text-neutral-0"
                : "bg-transparent text-neutral-20 hover:bg-primary-60 hover:text-neutral-0  focus:text-neutral-0"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {currentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  surname={project.surname}
                  avatar={project.avatar}
                  title={project.title}
                  category={activeTab === "All" ? project.category : null} // Solo pasamos la categoría cuando estamos en "All"
                  image={project.image}
                  projectLink={project.projectLink}
                  badgeText={project.badgeText}
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

export default ProjectsPage;










/*Función para conectar projects a backend:

// ProjectsPage.js
import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import Pagination from '../../../components/Pagination'
import { getAllProjects } from "../../../services/projectService";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "DevOps",
  "UX/UI",
];

export const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const projectsPerPage = 9;

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); // Mostrar spinner
      const response = await getAllProjects();
  
      if (response?.error) {
        console.error("Error fetching projects:", response.message);
        setProjects([]); // Deja vacío si hubo error
      } else {
        setProjects(response); // Carga los proyectos
      }
  
      setLoading(false); // Ocultar spinner
    };
  
    fetchProjects();
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
      <h1 className="text-3xl font-bold mb-2">Developer Projects</h1>
      <p className="text-md font-normal mb-4 text-[#606a79]">Discover talented developers for your next project</p>

      <div className="flex justify-center gap-2 mb-6 px-4 py-0.5 bg-[#262626] rounded-md">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1.5 rounded-md font-medium text-sm transition-colors duration-200 cursor-pointer
              ${activeTab === category
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
            <p className="text-center mt-4 text-sm text-[#606a79]">
              No projects available in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {currentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  name={project.owner?.name}
                  surname={project.owner?.surname}
                  avatar={project.owner?.avatar}
                  title={project.title}
                  category={activeTab === "All" ? project.category : null} // Solo pasamos la categoría cuando estamos en "All"
                  image={project.image}
                  projectLink={project.projectLink}
                  badgeText={project.badgeText}
                />
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

export default ProjectsPage; */