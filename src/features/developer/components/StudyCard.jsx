import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { getStudiesByDeveloper, softDeleteStudy, createStudy, updateStudy } from '../../../services/studyService';
import { PiPlusBold } from 'react-icons/pi';
import StudyModal from '../components/studyModal';
import DotsComponent from '../components/DotsComponent';

function StudyCard({ profileInfo }) {
  const { profile: currentUser, token } = useContext(AuthContext);
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [error, setError] = useState(null);

  const isCurrentUser = currentUser?._id === profileInfo?._id;

  useEffect(() => {
    if (!profileInfo?._id) return;

    setLoading(true);
    getStudiesByDeveloper(profileInfo._id, token)
      .then(res => {
        if (res.error) {
          setError(res.message);
        } else {
          setStudies(res.studies || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error al obtener los estudios');
        setLoading(false);
      });
  }, [profileInfo?._id, token]);

  const openCreateModal = () => {
    setSelectedStudy(null);
    setIsModalOpen(true);
  };

  const openEditModal = (study) => {
    setSelectedStudy(study);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudy(null);
    setIsModalOpen(false);
  };

  const handleStudy = async (data, id) => {
    try {
      if (id) {
        await updateStudy(id, data, token);
      } else {
        await createStudy(data, token);
      }

      const res = await getStudiesByDeveloper(profileInfo._id, token);
      if (!res.error) {
        setStudies(res.studies || []);
      }
    } catch (error) {
      console.error('Error guardando estudio:', error);
    }

    closeModal();
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este estudio?')) return;

    const res = await softDeleteStudy(id, token);
    if (!res.error) {
      setStudies(prev => prev.filter(e => e._id !== id));
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
            Create Study
          </button>
        )}
      </div>

      <StudyModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        study={selectedStudy}
        handleStudy={handleStudy}
      />

      {loading ? (
        <div className="flex justify-center py-4">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : studies.length === 0 ? (
        <div className="text-neutral-50 text-sm"><span>No studies yet.</span></div>
      ) : (
        <ul className="space-y-4">
          {studies
          .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
          .map(stu => (
            <li
              key={stu._id}
              className={`
                relative
                bg-neutral-80 border border-neutral-60 p-6 sm:p-8 mb-4 rounded-md
                ${stu.instituteLogo ? 'flex flex-col sm:flex-row gap-4' : 'grid grid-cols-1 sm:grid-cols-3 gap-4'}
              `}
            >
              {isCurrentUser && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <DotsComponent
                    onEdit={() => openEditModal(stu)}
                    onDelete={() => handleDelete(stu._id)}
                  />
                </div>
              )}

              {stu.instituteLogo ? (
                <>
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={stu.instituteLogo}
                      alt={stu.instituteName}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 ml-0 sm:ml-2 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl uppercase font-bold mb-1 sm:mb-2">
                      {stu.degree}
                    </h3>
                    <p className="mb-1 sm:mb-2">{stu.instituteName}</p>
                    <p className="mb-2 sm:mb-4">{stu.description}</p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col justify-end items-center sm:items-end mt-4 sm:mt-0">
                    <p className="text-sm sm:text-base text-center sm:text-right">
                      {new Date(stu.startDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })} {' '}
                        -{' '}
                      {stu.endDate
                        ? new Date(stu.endDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
                        : 'Actualidad'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="col-span-1 sm:col-span-2 text-lg sm:text-xl uppercase font-bold">
                    {stu.degree}
                  </h3>
                  <p className="col-span-1 sm:col-span-2">{stu.instituteName}</p>
                  <p className="col-span-1 sm:col-span-2">{stu.description}</p>
                  <p className="grid justify-items-center sm:justify-items-end text-sm sm:text-base">
                    {new Date(stu.startDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })} al  
                    {stu.endDate
                      ? new Date(stu.endDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
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

export default StudyCard;