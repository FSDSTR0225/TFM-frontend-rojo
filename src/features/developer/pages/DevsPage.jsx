import React, { useState, useEffect } from "react";
import DevsCard from "../components/DevsCard";  // Asegúrate de que DevsCard esté correctamente importado
import { Pagination } from '../../../components/Pagination';

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

export const DevsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const projectsPerPage = 12;

  useEffect(() => {
    const fetchProjects = async () => {
      const data = [
        { id: 1, name: "Beli", surname: "Ochando", title: "Landing Page", category: "UX/UI", avatar: Avatar1, profession: "UI/UX Designer", experienceYears: 3, location: "Barcelona, Spain", skills: ["Figma", "Sketch", "Adobe XD"], badgeText: "new" },
        { id: 2, name: "Toni", surname: "Arce", title: "App de Recetas", category: "Frontend", avatar: Avatar2, profession: "Frontend Developer", experienceYears: 4, location: "Madrid, Spain", skills: ["React", "JavaScript", "CSS"], badgeText: "new" },
        { id: 3, name: "Carlos", surname: "Daymond", title: "Clasificador de Imágenes", category: "DevOps", avatar: Avatar2, profession: "DevOps Engineer", experienceYears: 5, location: "London, UK", skills: ["Docker", "Kubernetes", "AWS"], badgeText: "new" },
        { id: 4, name: "Jeremie", surname: "Klose", title: "Dashboard Admin", category: "Full Stack", avatar: Avatar2, profession: "Full Stack Developer", experienceYears: 6, location: "Paris, France", skills: ["Node.js", "React", "MongoDB"], },
        { id: 5, name: "Luisa", surname: "Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, profession: "Mobile Developer", experienceYears: 3, location: "Buenos Aires, Argentina", skills: ["React Native", "Java", "Swift"], },
        { id: 6, name: "Luisa", surname: "Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, profession: "Mobile Developer", experienceYears: 3, location: "Buenos Aires, Argentina", skills: ["React Native", "Java", "Swift"], },
        { id: 7, name: "Luisa", surname: "Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, profession: "Mobile Developer", experienceYears: 3, location: "Buenos Aires, Argentina", skills: ["React Native", "Java", "Swift"], },
        { id: 8, name: "Luisa", surname: "Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, profession: "Mobile Developer", experienceYears: 3, location: "Buenos Aires, Argentina", skills: ["React Native", "Java", "Swift"],  },
        { id: 9, name: "Luisa", surname: "Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, profession: "Mobile Developer", experienceYears: 3, location: "Buenos Aires, Argentina", skills: ["React Native", "Java", "Swift"], },
        { id: 10, name: "Luisa", surname: "Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, profession: "Mobile Developer", experienceYears: 3, location: "Buenos Aires, Argentina", skills: ["React Native", "Java", "Swift"],  },
        { id: 11, name: "Luisa", surname: "Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, profession: "Mobile Developer", experienceYears: 3, location: "Buenos Aires, Argentina", skills: ["React Native", "Java", "Swift"], },
        { id: 12, name: "Luisa", surname: "Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, profession: "Mobile Developer", experienceYears: 3, location: "Buenos Aires, Argentina", skills: ["React Native", "Java", "Swift"],  },
        { id: 13, name: "Luisa", surname: "Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, profession: "Mobile Developer", experienceYears: 3, location: "Buenos Aires, Argentina", skills: ["React Native", "Java", "Swift"], },
        { id: 14, name: "Luisa", surname: "Pérez", title: "App de Viajes", category: "Mobile", avatar: Avatar1, profession: "Mobile Developer", experienceYears: 3, location: "Buenos Aires, Argentina", skills: ["React Native", "Java", "Swift"],  }
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
      <h1 className="text-3xl font-bold mb-2 mt-10 text-neutral-0">Meet Our Developers</h1>
      <p className="text-md font-normal mb-4 text-neutral-30">Discover the diverse talents and skills of our expert developers</p>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentProjects.map((developer) => (
                <DevsCard
                key={developer.id}
                id={developer.id}
                name={developer.name}
                surname={developer.surname}
                title={developer.title}
                category={developer.category}
                avatar={developer.avatar}
                profession={developer.profession}
                experienceYears={developer.experienceYears}
                location={developer.location}
                skills={developer.skills}
                badgeText={developer.badgeText}
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
