import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";

import ProjectCardImageProv from "../../../assets/card-1.png";
import ProjectCardImageProv2 from "../../../assets/card-2.png";
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
  const [activeTab, setActiveTab] = useState("All"); // La categoría activa por defecto es "All"
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Simulamos datos desde la base de datos (más tarde puedes hacer fetch desde una API)
    const fetchProjects = async () => {
      const data = [
        { 
          id: 1,
          userName: "Beli Ochando", 
          title: "Landing Page", 
          category: "UX/UI", 
          avatar: Avatar1,
          image: ProjectCardImageProv2,
          projectLink: "/project/1",
          badgeText: "New", // Texto del badge
        },
        { 
          id: 2, 
          userName: "Toni Arce",
          title: "App de Recetas", 
          category: "Frontend", 
          avatar: Avatar2,
          image: ProjectCardImageProv,
          projectLink: "/project/2",
          badgeText: "New", // Texto del badge
        },
        { 
          id: 3, 
          userName: "Carlos Daymond",
          title: "Clasificador de Imágenes", 
          category: "DevOps", 
          avatar: Avatar2,
          image: ProjectCardImageProv2,
          projectLink: "/project/3",
        },
        { 
          id: 4,
          userName: "Jeremie Klose", 
          title: "Dashboard Admin", 
          category: "Full Stack", 
          avatar: Avatar2,
          image: ProjectCardImageProv,
          projectLink: "/project/4",
        },
      ];
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-3">Developer Porfolios</h1>
      <p className="text-md font-normal mb-4">Discover talented developers for your next project</p>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-6 px-4 py-0.5 bg-[#262626] rounded-md">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1.5 rounded-md font-medium text-sm transition-colors duration-200 cursor-pointer
              ${activeTab === category
                ? "bg-[#171717] text-white"
                : "bg-transparent text-[#A1A1AA] hover:bg-green-600 hover:text-white  focus:text-white"
              }`}
            
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            userName={project.userName}
            title={project.title}
            category={project.category}
            avatar={project.avatar}
            image={project.image}
            projectLink={project.projectLink}
            badgeText={project.badgeText}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
