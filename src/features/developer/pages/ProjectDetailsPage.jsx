import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getProjectById,
  incrementProjectView,
  toggleProjectLike,
  getProjectLikeStatus,
} from "../../../services/projectService";
import { ProjectInfoCard } from "../components/ProjectInfoCard";
import { GitHubFileTree } from "../components/GitHubFileTree";
import { GitHubLanguagesTag } from "../components/GitHubLanguagesTag";
import { CodeBlock } from "../../../styles/ReactParser";
import { LikeButtonRounded } from "../../../components/LikeButtonRounded";
import { AuthContext } from "../../../context/authContext";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

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
  const { profile, socket, setNotifications } = useContext(AuthContext);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const token = localStorage.getItem("token") || "";

  // Estados del botón de like
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [loadingLike, setLoadingLike] = useState(true);

  useEffect(() => {
    const incrementViewWithCooldown = async () => {
      if (typeof window === "undefined" || !window.localStorage) return;

      const cooldownTime = 1000 * 60 * 60; // 1 hora en ms
      const lastViewKey = `project_${id}_last_view`;
      const lastView = localStorage.getItem(lastViewKey);
      const now = Date.now();

      if (!lastView || now - parseInt(lastView, 10) > cooldownTime) {
        try {
          await incrementProjectView(id);
          localStorage.setItem(lastViewKey, now.toString());

          // Actualizar localmente el contador de views para reflejar el cambio instantáneamente:
          setProject((prev) =>
            prev ? { ...prev, views: (prev.views || 0) + 1 } : prev
          );
        } catch (error) {
          console.error("Error incrementando views:", error);
        }
      }
    };

    const fetchProjectAndLikeStatus = async () => {
      try {
        const data = await getProjectById(id);
        if (data && !data.error) {
          setProject(data);
          setCurrentIndex(0);
        }
        const likeStatus = await getProjectLikeStatus(id, token);
        setLiked(likeStatus.liked);
      } catch (error) {
        console.error("Error fetching project or like status:", error);
      } finally {
        setLoadingLike(false);
      }
    };

    fetchProjectAndLikeStatus();
    incrementViewWithCooldown();
  }, [id, token]);

  // Función para manejar el click del like
  const handleLikeClick = async () => {
    if (animating || loadingLike) return;
    setAnimating(true);
    setLoadingLike(true);
    try {
      const data = await toggleProjectLike(id, token);
      setLiked(data.liked);
      setProject((prevProject) => ({
        ...prevProject,
        liked: data.liked,
        likes: data.likes,
      }));

      if (
        data.liked &&
        selectedOwner._id &&
        selectedOwner._id !== profile._id
      ) {
        const notif = {
          senderId: profile._id,
          senderName: profile.name,
          receiverId: selectedOwner._id,
          receiverName: selectedOwner.name,
          type: 2,
          createdAt: Date.now(),
        };
        socket.emit("sendNotification", notif);
        
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAnimating(false);
      setLoadingLike(false);
    }
  };

  if (!project) return null;

  const gallery = project.gallery || [];
  const length = gallery.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const mobileOrder = [
    "Gallery",
    "ProjectInfoCard",
    "Description",
    "GitHubFileTree",
    "CodeSections",
    "LikeButton",
  ];

  const githubRepoInfo = project.githubProjectLink
    ? parseRepoUrl(project.githubProjectLink)
    : null;

  return (
    <div className="w-full flex flex-col items-center gap-6">
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

        {isDesktop ? (
          <div
            className="grid grid-cols-[5fr_2fr] gap-4"
            style={{ alignItems: "start" }}
          >
            <div className="flex flex-col gap-6">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <div className="relative w-full h-full">
                  {gallery.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`slide-${index}`}
                      className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-700 ease-in-out ${
                        index === currentIndex
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0"
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

            <div className="flex flex-col">
              <ProjectInfoCard
                project={project}
                setSelectedOwner={setSelectedOwner}
              />

              {profile && (
                <div className="flex justify-center items-center rounded-full p-6">
                  <LikeButtonRounded
                    liked={liked}
                    animating={animating}
                    loadingLike={loadingLike}
                    onClick={handleLikeClick}
                  />
                </div>
              )}

              {githubRepoInfo && (
                <>
                  <h1 className="text-white text-2xl font-semibold p-4">
                    GitHub
                  </h1>
                  <div key="githubFileTree" className="-mt-6">
                    <GitHubFileTree repoUrl={project.githubProjectLink} />
                  </div>
                  <div
                    key="githubLanguages"
                    className="relative bg-neutral-80 flex flex-col rounded-lg shadow-md overflow-hidden border border-neutral-70 p-6 text-inherit no-underline w-full-mt-6"
                  >
                    <GitHubLanguagesTag repoUrl={project.githubProjectLink} />
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
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
                              index === currentIndex
                                ? "opacity-100 z-10"
                                : "opacity-0 z-0"
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
                  return (
                    <ProjectInfoCard
                      key="infoCard"
                      project={project}
                      setSelectedOwner={setSelectedOwner}
                    />
                  );

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
                  return project.codeSections &&
                    project.codeSections.length > 0 ? (
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
                  return profile ? (
                    <div className="flex justify-center items-center rounded-full p-6">
                      <LikeButtonRounded
                        liked={liked}
                        animating={animating}
                        loadingLike={loadingLike}
                        onClick={handleLikeClick}
                      />
                    </div>
                  ) : null;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
