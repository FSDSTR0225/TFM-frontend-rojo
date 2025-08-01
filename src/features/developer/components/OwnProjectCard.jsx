import React, { useState, useEffect, useContext } from "react";
import { NewProjectModal } from "../components/NewProjectModal";
import DotsComponent from "./DotsComponent";
import {
  PiPlusBold,
  PiArrowSquareOut,
  PiGithubLogo,
  PiEye,
} from "react-icons/pi";
import { Link } from "react-router";
import { AuthContext } from "../../../context/authContext";
import { Pagination } from "../../../components/Pagination";
import {
  createProject,
  getProjectsByDeveloper,
  softDeleteProject,
  updateProject,
} from "../../../services/projectService";
import { useNavigate } from "react-router";

function OwnProjectCard({ profileInfo }) {
  const { token, profile: currentUserProfile } = useContext(AuthContext);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3);
  const navigate = useNavigate();

  const isCurrentUserProfile = profileInfo?._id === currentUserProfile?._id;
  const developerId = profileInfo?._id;

  useEffect(() => {
    if (!developerId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getProjectsByDeveloper(developerId, token)
      .then((res) => {
        if (res.error) {
          setError(res.message);
          setProjects([]);
        } else if (Array.isArray(res.projects)) {
          setProjects(res.projects);
        } else {
          setProjects(res);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar los proyectos");
      })
      .finally(() => setLoading(false));
  }, [developerId, token]);

  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleOpenNewModal = () => setIsNewModalOpen(true);
  const handleCloseNewModal = () => setIsNewModalOpen(false);

  const handleOpenEditModal = (project) => {
    setProjectToEdit(project);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setProjectToEdit(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const res = await softDeleteProject(id, token);
    if (!res.error) {
      setProjects((prev) => prev.filter((e) => e._id !== id));
    }
  };

  const handleSubmitNewProject = async (data) => {
    setLoading(true);
    try {
      const result = await createProject(data, token);
      if (result.error) {
        setError(result.message);
      } else {
        setProjects((prev) => [...prev, result.project || result]);
        handleCloseNewModal();
      }
    } catch {
      setError("Error creating project");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEditProject = async (data) => {
    setLoading(true);
    try {
      const result = await updateProject(projectToEdit._id, data, token);
      if (result.error) {
        setError(result.message);
      } else {
        setProjects((prev) =>
          prev.map((p) =>
            p._id === projectToEdit._id ? result.updatedProject : p
          )
        );
        handleCloseEditModal();
      }
    } catch {
      setError("Error updating project");
    } finally {
      setLoading(false);
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    const yearA = Number(a.year) || 0;
    const yearB = Number(b.year) || 0;
    return yearB - yearA;
  });

  // Cálculos para la paginación
  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = sortedProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="flex justify-center p-8">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="w-full">
      {isCurrentUserProfile && (
        <div className="flex justify-end mb-2">
          <button
            onClick={handleOpenNewModal}
            className="btn bg-primary-60 hover:bg-primary-70 rounded-md shadow hover:shadow-lg text-sm flex items-center gap-2"
          >
            <PiPlusBold className="text-xl" /> Create project
          </button>
        </div>
      )}

      {(isNewModalOpen || (isEditModalOpen && projectToEdit)) && (
        <NewProjectModal
          project={isEditModalOpen ? projectToEdit : null}
          onSubmitProject={
            isEditModalOpen ? handleSubmitEditProject : handleSubmitNewProject
          }
          onClose={isEditModalOpen ? handleCloseEditModal : handleCloseNewModal}
        />
      )}

      {sortedProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-neutral-70 rounded-full flex items-center justify-center">
            <PiEye className="text-3xl text-neutral-30" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-20 mb-3">
            There are no projects yet
          </h3>
          <p className="text-neutral-40 max-w-md">
            {profileInfo?.name || "This developer"} hasn't shared any projects
            yet.
          </p>
          <p className="text-neutral-40 max-w-md">
            Check back soon to see them!
          </p>
        </div>
      ) : (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-6">
            {currentProjects.map((project) => (
              <div
                key={project._id + Math.random()}
                onClick={() => handleViewProject(project._id)}
                className="bg-neutral-80 border border-neutral-60 shadow-sm rounded-lg overflow-hidden h-[520px] lg:h-[280px] flex flex-col cursor-pointer hover:shadow-md transition-shadow"
              >
                {/* Layout para móviles */}
                <div className="lg:hidden flex-1 flex flex-col h-full">
                  {/* Imagen en móviles - altura fija */}
                  <div className="w-full h-40 overflow-hidden relative flex-shrink-0">
                    {project.gallery?.length > 0 ? (
                      <img
                        src={project.gallery[0]}
                        alt={project.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="bg-neutral-90 h-full w-full flex items-center justify-center text-neutral-40">
                        <span className="text-center px-4 text-sm truncate">
                          {project.title}
                        </span>
                      </div>
                    )}
                    {/* Botón de opciones en móviles */}
                    {isCurrentUserProfile && (
                      <div
                        className="absolute top-3 right-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DotsComponent
                          onEdit={(e) => handleOpenEditModal(project, e)}
                          onDelete={(e) => handleDelete(project._id, e)}
                        />
                      </div>
                    )}
                  </div>

                  {/* Contenido en móviles - altura calculada */}
                  <div className="flex flex-col flex-1 min-h-0">
                    {/* Header */}
                    <div className="p-4 pb-2 flex-shrink-0">
                      <div className="mb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-lg font-semibold truncate">
                            {project.title}
                          </h2>
                        </div>

                        {/* Categoría y views en móviles */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="bg-primary-60/20 text-primary-50 rounded-md px-2 py-0.5 text-xs truncate max-w-32">
                            {project.category || "No category"}
                          </span>
                          <div className="flex items-center gap-1 text-neutral-40 text-sm flex-shrink-0">
                            <PiEye className="text-primary-80" size={16} />
                            <span>{Math.floor((project.views || 0) / 2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contenido - con scroll interno si es necesario */}
                    <div className="flex-1 px-4 min-h-0 overflow-hidden">
                      <p className="text-sm mb-2 line-clamp-2 mr-8">
                        {project.description || "No description"}
                      </p>

                      <p className="font-medium mb-3 text-sm">
                        {project.year || ""}
                      </p>

                      {/* Skills en móviles - limitado a 2 líneas */}
                      {project.projectSkills?.length > 0 && (
                        <div className="flex flex-wrap gap-1 max-h-16 overflow-hidden">
                          {project.projectSkills.slice(0, 4).map((skill, i) => (
                            <span
                              key={i}
                              className="bg-primary-70 text-neutral-0 rounded-full px-2 py-0.5 text-xs truncate max-w-20"
                            >
                              {skill}
                            </span>
                          ))}
                          {project.projectSkills.length > 4 && (
                            <span className="text-xs text-neutral-40 self-center">
                              +{project.projectSkills.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Botones en móviles */}
                    <div className="p-4 pt-2 mt-auto flex-shrink-0">
                      <div className="flex gap-2">
                        {project.githubProjectLink && (
                          <a
                            href={project.githubProjectLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 btn btn-sm bg-neutral-90 hover:bg-neutral-60 border border-neutral-60 rounded-md flex items-center justify-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <PiGithubLogo className="text-lg" /> Github
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 btn btn-sm bg-transparent border-2 border-primary-50 text-primary-50 hover:bg-neutral-0 hover:text-neutral-90 hover:border-neutral-0 rounded-md hover:shadow-lg flex items-center justify-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <PiArrowSquareOut className="text-lg" /> Live
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layout para tablets y desktop */}
                <div className="hidden lg:flex flex-1 h-full">
                  {/* Imagen en desktop - ancho fijo */}
                  <div className="flex-shrink-0 w-72">
                    {project.gallery?.length > 0 ? (
                      <img
                        src={project.gallery[0]}
                        alt={project.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="bg-neutral-90 w-full h-full flex items-center justify-center text-neutral-40">
                        <span className="text-center px-4 truncate">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Contenido en desktop */}
                  <div className="flex flex-col flex-1 min-w-0">
                    {/* Header */}
                    <div className="p-4 pb-2 flex-shrink-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0 mr-4">
                          <h2 className="text-lg font-semibold truncate">
                            {project.title}
                          </h2>
                        </div>
                        {isCurrentUserProfile && (
                          <div
                            className="flex-shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DotsComponent
                              onEdit={(e) => handleOpenEditModal(project, e)}
                              onDelete={(e) => handleDelete(project._id, e)}
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-primary-60/20 text-primary-50 rounded-md px-2 py-0.5 text-xs truncate max-w-40">
                          {project.category || "No category"}
                        </span>
                        <div className="flex items-center gap-1 text-neutral-40 text-sm flex-shrink-0">
                          <PiEye className="text-primary-80" size={16} />
                          <span>{Math.floor((project.views || 0) / 2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 px-4 min-h-0 overflow-hidden">
                      <p className="text-sm mb-2 line-clamp-3 mr-8">
                        {project.description || "No description"}
                      </p>

                      <p className="font-medium mb-3 text-sm">
                        {project.year || ""}
                      </p>

                      {/* Skills - limitado a 1 línea en desktop */}
                      {project.projectSkills?.length > 0 && (
                        <div className="flex items-center gap-1 h-8 overflow-hidden">
                          {project.projectSkills.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className="bg-primary-70 text-neutral-0 rounded-full px-2 py-0.5 text-xs flex-shrink-0"
                            >
                              {skill}
                            </span>
                          ))}
                          {project.projectSkills.length > 3 && (
                            <span className="text-xs text-neutral-40 flex-shrink-0">
                              +{project.projectSkills.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Botones */}
                    <div className="p-4 pt-2 mt-auto flex-shrink-0">
                      <div className="flex gap-2 justify-end">
                        {project.githubProjectLink && (
                          <a
                            href={project.githubProjectLink}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm bg-neutral-90 hover:bg-neutral-60 border border-neutral-60 rounded-md flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <PiGithubLogo className="text-lg" /> Github
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm bg-primary-60 hover:bg-primary-70 text-neutral-90 rounded-md flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <PiArrowSquareOut className="text-lg" /> Live
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            filteredProjects={sortedProjects}
          />
        </div>
      )}
    </div>
  );
}

export default OwnProjectCard;
