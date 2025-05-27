import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProjectById } from "../../../services/projectService";
import { ProjectInfoCard } from "../components/ProjectInfoCard";
import { GitHubFileTree } from "../components/GitHubFileTree";
import { GitHubLanguagesTag } from "../components/GitHubLanguagesTag"; // <-- Importa aquí
import { CodeBlock } from "../../../styles/ReactParser";
import { LikeButtonRounded } from "../../../components/LikeButtonRounded";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

// Función para validar y parsear la URL del repo GitHub
function parseRepoUrl(repoUrl) {
  try {
    const url = new URL(repoUrl);
    const [, owner, repo] = url.pathname.split("/");
    if (!owner || !repo) return null;
    return { owner, repo: repo.replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

export const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const width = useWindowWidth();
  const isDesktop = width >= 1200;

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

  // Orden para móvil
  const mobileOrder = [
    "Gallery",
    "ProjectInfoCard",
    "Description",
    "GitHubFileTree",
    "CodeSections",
    "LikeButton",
  ];

  // Validación URL GitHub para mostrar o no componentes GitHub
  const githubRepoInfo = project.githubProjectLink
    ? parseRepoUrl(project.githubProjectLink)
    : null;

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Cabecera */}
      <div className="relative w-full h-[256px] overflow-hidden">
        {gallery[0] && (
          <img
            src={gallery[0]}
            alt="Project header"
            className="absolute w-full h-full object-cover blur-2xl brightness-50 scale-110"
          />
        )}
      </div>

      <div className="relative w-full p-4 mx-auto max-w-full md:max-w-screen-xl">
        <h1 className="top-0 left-0 text-white text-4xl font-semibold -mt-55 relative z-20 mb-6">
          {project.title}
        </h1>

        {/* Desktop: dos columnas independientes */}
        {isDesktop ? (
          <div
            className="grid grid-cols-[5fr_2fr] gap-4"
            style={{ alignItems: "start" }}
          >
            {/* Columna Izquierda */}
            <div className="flex flex-col gap-6">
              {/* Galería */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
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
                  <button
                    onClick={prevSlide}
                    className="btn btn-circle btn-sm absolute left-4 top-1/2 z-20"
                  >
                    ❮
                  </button>
                  <button
                    onClick={nextSlide}
                    className="btn btn-circle btn-sm absolute right-4 top-1/2 z-20"
                  >
                    ❯
                  </button>
                </div>
              </div>

              {/* Description */}
              {project.description && (
                <div className="relative bg-neutral-80 flex flex-col rounded-lg shadow-md overflow-hidden border border-neutral-70 p-6 text-inherit no-underline w-full">
                  <h2 className="text-white text-2xl font-semibold mb-4">
                    Description
                  </h2>
                  <p className="text-neutral-10 whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              )}

              {/* Code Sections */}
              {project.codeSections && project.codeSections.length > 0 && (
                <section className="relative bg-neutral-80 flex flex-col rounded-lg shadow-md overflow-hidden border border-neutral-70 p-6 text-inherit no-underline w-full">
                  <h2 className="text-white text-2xl font-semibold mb-6">
                    Code Sections
                  </h2>
                  {project.codeSections.map((code, index) => (
                    <CodeBlock key={index} code={code} />
                  ))}
                </section>
              )}
            </div>

            {/* Columna Derecha */}
            <div className="flex flex-col">
              <ProjectInfoCard project={project} />

              <div className="flex justify-center items-center rounded-full p-6">
                <LikeButtonRounded />
              </div>

              {/* Mostrar GitHub solo si URL válida */}
              {githubRepoInfo && (
                <>
                  <h1 className="text-white text-2xl font-semibold p-4">GitHub</h1>
                  <div key="githubFileTree" className="-mt-6">
                    <GitHubFileTree repoUrl={project.githubProjectLink} />
                  </div>
                  <div key="githubFileTree" className="relative bg-neutral-80 flex flex-col rounded-lg shadow-md overflow-hidden border border-neutral-70 p-6 text-inherit no-underline w-full-mt-6">
                    <GitHubLanguagesTag repoUrl={project.githubProjectLink} />
                  </div>
                  
                </>
              )}
            </div>
          </div>
        ) : (
          // Móvil: UNA sola columna con las secciones en el orden que defines
          <div className="flex flex-col gap-6">
            {mobileOrder.map((section) => {
              switch (section) {
                case "Gallery":
                  return (
                    <div
                      key="gallery"
                      className="relative w-full aspect-video rounded-lg overflow-hidden"
                    >
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
                        <button
                          onClick={prevSlide}
                          className="btn btn-circle btn-sm absolute left-4 top-1/2 z-20"
                        >
                          ❮
                        </button>
                        <button
                          onClick={nextSlide}
                          className="btn btn-circle btn-sm absolute right-4 top-1/2 z-20"
                        >
                          ❯
                        </button>
                      </div>
                    </div>
                  );

                case "ProjectInfoCard":
                  return <ProjectInfoCard key="infoCard" project={project} />;

                case "Description":
                  return project.description ? (
                    <div
                      key="description"
                      className="relative bg-neutral-80 flex flex-col rounded-lg shadow-md overflow-hidden border border-neutral-70 p-6 text-inherit no-underline w-full"
                    >
                      <h2 className="text-white text-2xl font-semibold mb-4">
                        Description
                      </h2>
                      <p className="text-neutral-10 whitespace-pre-line">
                        {project.description}
                      </p>
                    </div>
                  ) : null;

                case "GitHubFileTree":
                  return githubRepoInfo ? (
                    <div key="githubFileTree" className="-mt-6">
                      <GitHubFileTree repoUrl={project.githubProjectLink} />
                      <GitHubLanguagesTag repoUrl={project.githubProjectLink} />
                    </div>
                  ) : null;

                case "CodeSections":
                  return project.codeSections && project.codeSections.length > 0 ? (
                    <section
                      key="codeSections"
                      className="relative bg-neutral-80 flex flex-col rounded-lg shadow-md overflow-hidden border border-neutral-70 p-6 text-inherit no-underline w-full -mt-6"
                    >
                      <h2 className="text-white text-2xl font-semibold mb-6">
                        Code Sections
                      </h2>
                      {project.codeSections.map((code, index) => (
                        <CodeBlock key={index} code={code} />
                      ))}
                    </section>
                  ) : null;

                case "LikeButton":
                  return (
                    <div
                      key="likeButton"
                      className="flex justify-center items-center rounded-full"
                    >
                      <LikeButtonRounded />
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
