import React, { useEffect, useState } from "react";
import ProjectCard from "../../features/developer/components/ProjectCard";
import { getAllProjects } from "../../services/projectService";
import { PiCaretRight } from "react-icons/pi";
import { Link } from "react-router";

export const LastProjects = () => {
  const [bestProjects, setBestProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProjects = async () => {
      setLoading(true);
      const response = await getAllProjects();

      if (!response || response.error) {
        console.error(
          "Error fetching projects:",
          response?.message || "Unknown error"
        );
        setBestProjects([]);
        setLoading(false);
        return;
      }

      // Filtrar proyectos con imágenes y ordenar por fecha descendente
      const filtered = response
        .filter((p) => Array.isArray(p.gallery) && p.gallery.length > 0)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setBestProjects(filtered);
      setLoading(false);
    };

    fetchTopProjects();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[150px]">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (bestProjects.length === 0) {
    return (
      <p className="text-center text-sm text-neutral-400">
        No top projects found.
      </p>
    );
  }

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-neutral-0">
          Last Projects
        </h1>
      </div>
      <div className="grid grid-cols-2">
        <span className="text-md font-normal mb-4 text-neutral-30">
          Explore the latest projects from our talented developers
        </span>
        <Link
          to={"/projects"}
          className="justify-self-end bg-transparent text-primary-60 rounded-md flex items-center gap-1 text-sm"
        >
          View all
          <PiCaretRight className="text-md" />
        </Link>
      </div>

      <div
        className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        gap-6
      "
      >
        {bestProjects
          .slice(0, 4) // máximo 4 proyectos para md y mobile
          .map((project, index) => {
            // En lg+ mostramos solo 3 proyectos
            // Ocultamos el 4to proyecto en lg y mayores
            const isHiddenOnLg = index === 3 ? "lg:hidden" : "";

            return (
              <div
                key={project._id}
                className={`w-full aspect-[394/256] ${isHiddenOnLg}`}
              >
                <ProjectCard
                  developerId={project.owner?._id}
                  name={project.owner?.name}
                  surname={project.owner?.surname}
                  avatar={project.owner?.avatar}
                  title={project.title}
                  category={project.category}
                  gallery={project.gallery}
                  projectid={project._id}
                  badgeText={project.badgeText}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
