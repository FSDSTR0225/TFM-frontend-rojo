import React, { useState, useEffect, useContext } from 'react';
import { NewProjectModal } from '../components/NewProjectModal';
import { PiPlus, PiArrowSquareOut, PiGithubLogo, PiEye } from 'react-icons/pi';
import { Link } from 'react-router';
import { AuthContext } from '../../../context/authContext';
import { createProject, getProjectsByDeveloper } from '../../../services/projectService';

function OwnProjectCard({ profileInfo }) {
  const { token, profile: currentUserProfile } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitProject = async (data) => {
    setLoading(true);
    try {
      const result = await createProject(data, token);
      if (result.error) {
        setError(result.message);
      } else {
        setProjects(prev => [...prev, result.project || result]);
        handleCloseModal();
      }
    } catch {
      setError('Error al crear el proyecto');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg" /></div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div>
      {isCurrentUserProfile && (
        <div className="flex justify-end mb-2">
          <button
            onClick={handleOpenModal}
            className="btn bg-primary-60 hover:bg-primary-70 rounded-md shadow hover:shadow-lg text-sm flex items-center gap-2"
          >
            <PiPlus className="text-xl" /> Create project
          </button>
        </div>
      )}

      {isModalOpen && (
        <NewProjectModal onSubmitProject={handleSubmitProject} onClose={handleCloseModal} />
      )}

      {projects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-neutral-40">No hay proyectos disponibles</p>
          {isCurrentUserProfile && <p className="mt-2">Añade tu primer proyecto</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map(project => (
            <div key={project._id} className="card lg:card-side bg-base-100 shadow-sm">
              <figure>
                {project.gallery?.length > 0
                  ? <img src={project.gallery[0]} alt={project.title} className="h-48 w-full object-cover" />
                  : <div className="bg-neutral-90 h-48 w-64 flex items-center justify-center text-neutral-40">Sin imagen</div>
                }
              </figure>
              <div className="card-body">
                <div className="grid grid-cols-2">
                  <h2 className="card-title">{project.title}</h2>
                  <span className="justify-self-end bg-primary-60 text-neutral-90 rounded-md px-2 py-0.5">
                    {project.category || 'Proyecto'}
                  </span>
                </div>
                <p className="mt-2">{project.description || 'Sin descripción'}</p>
                <p>{project.year || ''}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.projectSkills?.map((s, i) => (
                    <span key={i} className="bg-primary-60 rounded-md px-2 py-0.5 text-sm">{s}</span>
                  ))}
                </div>
                <div className="card-actions justify-end mt-4">
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
        </div>
      )}
    </div>
  );
}

export default OwnProjectCard;

