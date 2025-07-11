import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { createExperience, updateExperience, getExperiencesByDeveloper, softDeleteExperience } from '../../../services/experienceService';
import { PiPlusBold, PiEye } from 'react-icons/pi';
import NewExperienceModal from './newExperienceModal';
import DotsComponent from './DotsComponent';
import { Pagination } from "../../../components/Pagination";

function ExperienceCard({ profileInfo }) {
  const { profile: currentUser, token } = useContext(AuthContext);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [experiencesPerPage] = useState(4);

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
    const confirmed = confirm('Are you sure you want to delete this experience?');
    if (!confirmed) return;

    const res = await softDeleteExperience(id, token);
    if (!res.error) {
      setExperiences(prev => prev.filter(e => e._id !== id));
    }
  };

  const sortedExperiences = [...experiences].sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  // Cálculos para la paginación
  const totalPages = Math.ceil(sortedExperiences.length / experiencesPerPage);
  const indexOfLastExperience = currentPage * experiencesPerPage;
  const indexOfFirstExperience = indexOfLastExperience - experiencesPerPage;
  const currentExperiences = sortedExperiences.slice(indexOfFirstExperience, indexOfLastExperience);
  
  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-neutral-70 rounded-full flex items-center justify-center">
            <PiEye className="text-3xl text-neutral-30" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-20 mb-3">
            There are no experiences yet
          </h3>
          <p className="text-neutral-40 max-w-md">
            {profileInfo?.name || 'This developer'} hasn't shared any experience yet.
          </p>
          <p className="text-neutral-40 max-w-md">Check back soon to see them!</p>
        </div>
      ) : (
        <div className="w-full">
          <ul className="space-y-4">
            {currentExperiences.map(exp => (
              <li
                key={exp._id}
                className={`
                  relative 
                  bg-neutral-80 border border-neutral-60 p-6 sm:p-8 mb-4 rounded-md min-h-[200px]
                  ${exp.companyLogo ? 'flex flex-col sm:flex-row gap-4' : 'grid grid-cols-1 sm:grid-cols-3 gap-4'}
                `}
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
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <img
                        src={exp.companyLogo}
                        alt={exp.company}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1 ml-0 sm:ml-2 text-center sm:text-left flex flex-col justify-center">
                      <h3 className="text-lg sm:text-xl uppercase font-bold mb-1 sm:mb-2">
                        {exp.position}
                      </h3>
                      <p className="mb-1 sm:mb-2">{exp.company}</p>
                      <p className="mb-2 sm:mb-4">{exp.description}</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col justify-end items-center sm:items-end mt-4 sm:mt-0">
                      <p className="text-sm sm:text-base text-center sm:text-right whitespace-nowrap">
                        {new Date(exp.startDate).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric'
                        })}{' '}
                        -{' '}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric'
                            })
                          : 'Actualidad'}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="col-span-1 sm:col-span-2 text-lg sm:text-xl uppercase font-bold text-center sm:text-left mb-1 sm:mb-0 mt-6 sm:mt-0">
                      {exp.position}
                    </h3>
                    <p className="col-span-1 sm:col-span-2 text-center sm:text-left mb-1 sm:mb-0">{exp.company}</p>
                    <p className="col-span-1 sm:col-span-2 text-center sm:text-left mb-2 sm:mb-0">{exp.description}</p>
                    <p className="grid justify-items-center sm:justify-items-end text-sm sm:text-base whitespace-nowrap">
                      {new Date(exp.startDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}{' '}
                      -{' '}
                      {exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                          })
                        : 'Actualidad'}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
          
          {/* Paginación */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            filteredProjects={sortedExperiences}
          />
        </div>
      )}
    </div>
  );
}

export default ExperienceCard;