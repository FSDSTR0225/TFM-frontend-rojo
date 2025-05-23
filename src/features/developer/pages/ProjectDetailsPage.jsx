import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProjectById } from "../../../services/projectService";

export const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null); // guardamos el proyecto completo
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProjectById(id);
      if (data && !data.error) {
        setProject(data);
        setCurrentIndex(0);
      }
    };
    fetchProject();
  }, [id]);

  if (!project) return null;
  const gallery = project.gallery || [];
  const length = gallery.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  return (
    <div className="w-screen overflow-x-hidden">
      {/* Cabecera con imagen de fondo y título */}
      <div className="relative w-full h-[256px] overflow-hidden">
        {gallery[0] && (
          <img
            src={gallery[0]}
            alt="Project header"
            className="absolute w-full h-full object-cover blur-2xl brightness-50 scale-110"
          />
        )}
        <div className="relative z-10 w-full h-full flex items-center justify-center text-white text-4xl font-semibold -mt-4">
          {project.title}
        </div>
      </div>

      {/* Carousel */}
      {length > 0 && (
        <div className="w-full max-w-5xl mx-auto -mt-20 relative z-20 aspect-video rounded-lg overflow-hidden">
          <div className="relative w-full h-full">
            {gallery.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`slide-${index}`}
                className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}

            {/* Botones */}
            <button
              onClick={prevSlide}
              className="btn btn-circle btn-sm absolute left-4 top-1/2 z-20 active:scale-90 transition-transform duration-150 focus:outline-none"
              aria-label="Previous Slide"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="btn btn-circle btn-sm absolute right-4 top-1/2 z-20 active:scale-90 transition-transform duration-150 focus:outline-none"
              aria-label="Next Slide"
            >
              ❯
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
