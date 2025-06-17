import React, { useState, useEffect, useContext } from 'react';
import { NewProjectModal } from '../components/NewProjectModal';
import DotsComponent from './DotsComponent';
import { EditProjectModal } from '../components/EditProjectModal';
import { PiPlusBold, PiArrowSquareOut, PiGithubLogo, PiEye } from 'react-icons/pi';
import { Link } from 'react-router';
import { AuthContext } from '../../../context/authContext';
import { Pagination } from "../../../components/Pagination";
import { createProject, getProjectsByDeveloper, softDeleteProject, updateProject  } from '../../../services/projectService';

function OwnProjectCard({ profileInfo }) {
  const { token, profile: currentUserProfile } = useContext(AuthContext);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(4);

  const isCurrentUserProfile = profileInfo?._id === currentUserProfile?._id;
  const developerId = profileInfo?._id;

  useEffect(() => {
    if (!developerId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getProjectsByDeveloper(developerId, token)
      .then(res => {
        if (res.error) {
          setError(res.message);
          setProjects([]);
        } else if (Array.isArray(res.projects)) {
          setProjects(res.projects);
        } else {
          setProjects(res);
        }
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar los proyectos');
      })
      .finally(() => setLoading(false));
  }, [developerId, token]);

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
  if (!confirm("¿Seguro que quieres eliminar este proyecto?")) return;

  const res = await softDeleteProject(id, token);
  if (!res.error) {
    setProjects(prev => prev.filter(e => e._id !== id));
  }
  };

  const handleSubmitNewProject = async (data) => {
    setLoading(true);
    try {
      const result = await createProject(data, token);
      if (result.error) {
        setError(result.message);
      } else {
        setProjects(prev => [...prev, result.project || result]);
        handleCloseNewModal();
      }
    } catch {
      setError('Error al crear el proyecto');
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
        setProjects(prev => prev.map(p => p._id === projectToEdit._id ? result.updatedProject : p));
        handleCloseEditModal();
      }
    } catch {
      setError('Error al actualizar el proyecto');
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
  const currentProjects = sortedProjects.slice(indexOfFirstProject, indexOfLastProject);
  
  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg" /></div>;
  if (error) return <div className="alert alert-error">{error}</div>;

   return (
    <div>
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

      {isNewModalOpen && (
        <NewProjectModal onSubmitProject={handleSubmitNewProject} onClose={handleCloseNewModal} />
      )}

      {isEditModalOpen && projectToEdit && (
        <EditProjectModal project={projectToEdit} onSubmitProject={handleSubmitEditProject} onClose={handleCloseEditModal} />
      )}

      {sortedProjects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg bg-neutral-80">No hay proyectos disponibles</p>
          {isCurrentUserProfile && <p className="mt-2">Añade tu primer proyecto</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {currentProjects.map(project => (
            <div key={project._id + Math.random()} className="relative card lg:card-side bg-neutral-80 border border-neutral-60 shadow-sm h-68 md:h-76 flex flex-col lg:flex-row">
              <figure className="flex-shrink-0 w-full lg:w-80 h-40 lg:h-full overflow-hidden">
                {project.gallery?.length > 0
                  ? <img src={project.gallery[0]} alt={project.title} className="object-cover w-full h-full" />
                  : <div className="bg-neutral-90 h-48 w-full flex items-center justify-center text-neutral-40">
                      {project.title}
                    </div>
                }
              </figure>
              <div className="card-body flex flex-col flex-grow overflow-hidden">
                <div className="grid grid-cols-2">
                  <div className="flex items-center gap-2">
                    <h2 className="card-title truncate">{project.title}</h2>
                    <div className="flex items-center gap-1 text-neutral-400">
                      <PiEye className="text-primary-80" size={18} />
                      <span>{Math.floor((project.views || 0) / 2)}</span>
                    </div>
                  </div>
                  {isCurrentUserProfile && (
                    <div className="justify-self-end top-4 right-4 flex gap-2">
                      <DotsComponent
                        onEdit={() => handleOpenEditModal(project)}
                        onDelete={() => handleDelete(project._id)}
                      />
                    </div>
                  )}
                </div>
                <span className="bg-primary-60/20 text-primary-50 rounded-md px-2 py-0.5 w-fit h-fit truncate">
                  {project.category || 'No se especifica el tipo de proyecto'}
                </span>
                <p className="mt-2 text-sm overflow-hidden line-clamp-3">
                  {project.description || 'Sin descripción'}
                </p>
                <p>{project.year || ''}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.projectSkills?.map((s, i) => (
                    <span key={i} className="bg-primary-70 text-neutral-0 rounded-full px-2 py-0.5 text-sm truncate">{s}</span>
                  ))}
                </div>
                <div className="card-actions justify-end pt-8 ">
                  {project.githubProjectLink && (
                    <a href={project.githubProjectLink} target="_blank" rel="noreferrer" className="btn bg-neutral-90 hover:bg-neutral-60 border border-neutral-60 rounded-md flex items-center gap-1">
                      <PiGithubLogo className="text-xl" /> Github
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn bg-transparent border-2 border-primary-50 text-primary-50 hover:bg-neutral-0 hover:text-neutral-90 hover:border-neutral-0 rounded-md hover:shadow-lg flex items-center gap-1">
                      <PiEye className="text-xl" /> View
                    </a>
                  )}
                  <Link to={`/projects/${project._id}`} className="btn bg-primary-60 hover:bg-primary-70 text-neutral-90 rounded-md flex items-center gap-1">
                    <PiArrowSquareOut className="text-xl" /> Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
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