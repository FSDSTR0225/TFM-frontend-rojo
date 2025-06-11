import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { createExperience, updateExperience, getExperiencesByDeveloper, softDeleteExperience } from '../../../services/experienceService';
import { PiPlusBold } from 'react-icons/pi';
import NewExperienceModal from './newExperienceModal';
import DotsComponent from './DotsComponent';

function ExperienceCard({ profileInfo }) {
  const { profile: currentUser, token } = useContext(AuthContext);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [error, setError] = useState(null);

  const isCurrentUser = currentUser?._id === profileInfo?._id;

  useEffect(() => {
    if (!profileInfo?._id) return;

    setLoading(true);
    getExperiencesByDeveloper(profileInfo._id, token)
      .then(res => {
        if (res.error) {
          setError(res.message);
        } else {
          setExperiences(res.experiences || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error al obtener las experiencias');
        setLoading(false);
      });
  }, [profileInfo?._id, token]);

  const openCreateModal = () => {
    setSelectedExperience(null);
    setIsModalOpen(true);
  };

  const openEditModal = (exp) => {
    setSelectedExperience(exp);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedExperience(null);
    setIsModalOpen(false);
  };

  const handleExperience = async (data, id) => {
    try {
      if (id) {
        await updateExperience(id, data, token);
      } else {
        await createExperience(data, token);
      }

      const res = await getExperiencesByDeveloper(profileInfo._id, token);
      if (!res.error) {
        setExperiences(res.experiences || []);
      }
    } catch (error) {
      console.error('Error guardando experiencia:', error);
    }

    closeModal();
  };

  const handleDelete = async (id) => {
    const confirmed = confirm('¿Seguro que quieres eliminar esta experiencia?');
    if (!confirmed) return;

    const res = await softDeleteExperience(id, token);
    if (!res.error) {
      setExperiences(prev => prev.filter(e => e._id !== id));
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-2">
        {isCurrentUser && (
          <button
            onClick={openCreateModal}
            className="btn bg-primary-60 hover:bg-primary-70 rounded-md hover:shadow-lg text-sm flex items-center gap-1"
          >
            <PiPlusBold className="text-xl" />
            Create Experience
          </button>
        )}
      </div>

      <NewExperienceModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        experience={selectedExperience}
        handleExperience={handleExperience}
      />

      {loading ? (
        <div className="flex justify-center py-4">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : experiences.length === 0 ? (
        <div className="text-gray-500 text-sm">
          Este usuario no ha añadido ninguna experiencia todavía.
        </div>
      ) : (
        <ul className="space-y-4">
          {experiences
            .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
            .map(exp => (
              <li
                key={exp._id}
                className={`relative bg-neutral-80 border border-neutral-60 p-8 mb-4 rounded-md ${
                  exp.companyLogo ? 'flex gap-4' : 'grid grid-cols-3 gap-4'
                }`}
              >
                {isCurrentUser && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <DotsComponent
                      onEdit={() => openEditModal(exp)}
                      onDelete={() => handleDelete(exp._id)}
                    />
                  </div>
                )}

                {exp.companyLogo ? (
                  <>
                    <div className="flex-shrink-0">
                      <img
                        src={exp.companyLogo}
                        alt={exp.company}
                        className="border-primary-60 border-4 w-32 h-32 object-cover"
                      />
                    </div>
                    <div className="flex-1 ml-2">
                      <h3 className="text-xl uppercase font-bold mb-2">
                        {exp.position}
                      </h3>
                      <p className="mb-2">{exp.company}</p>
                      <p>{exp.description}</p>
                      {exp.experienceSkills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {exp.experienceSkills.map((skill, i) => (
                            <span
                              key={i}
                              className="bg-primary-70 text-neutral-0 rounded-full px-2 py-0.5 text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                      </div>
                    <div className="flex-shrink-0 flex flex-col justify-end items-end">
                      <p className="text-right">
                        {new Date(exp.startDate).toLocaleDateString('es-ES', {
                          month: 'numeric',
                          year: 'numeric'
                        })}{' '}
                        -{' '}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString('es-ES', {
                              month: 'numeric',
                              year: 'numeric'
                            })
                          : 'Actualidad'}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="col-span-2 text-xl uppercase font-bold">
                      {exp.position}
                    </h3>
                    <p className="col-span-2">{exp.company}</p>
                    <p className="col-span-2">{exp.description}</p>
                    <p className="grid justify-items-end">
                      {new Date(exp.startDate).toLocaleDateString('es-ES', {
                        month: 'numeric',
                        year: 'numeric'
                      })}{' '}
                      -{' '}
                      {exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString('es-ES', {
                            month: 'numeric',
                            year: 'numeric'
                          })
                        : 'Actualidad'}
                    </p>
                  </>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}


export default ExperienceCard;