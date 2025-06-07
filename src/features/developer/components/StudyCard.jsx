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
        <div className="text-gray-500 text-sm">Este usuario no ha añadido ningún estudio todavía.</div>
      ) : (
        <ul className="space-y-4">
          {studies
          .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
          .map(stu => (
            <li
              key={stu._id}
              className="relative grid grid-cols-3 gap-4 bg-neutral-80 border border-neutral-60 p-8 mb-4 rounded-md"
            >
              {/* <img src={stu.instituteLogo} alt={stu.instituteName} className="border-primary-60 border-4 w-32 h-32" /> */}
              <h3 className="col-span-2 text-xl uppercase font-bold">{stu.degree}</h3>
              <p className="col-span-2">{stu.instituteName}</p>
              <p className="col-span-2">{stu.description}</p>
              <p className="grid justify-items-end pr-4">
                {new Date(stu.startDate).toLocaleDateString('es-ES', { month: 'numeric', year: 'numeric' })} -{' '}
                {stu.endDate
                  ? new Date(stu.endDate).toLocaleDateString('es-ES', { month: 'numeric', year: 'numeric' })
                  : 'Actualidad'}
              </p>

              {isCurrentUser && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <DotsComponent
                    onEdit={() => openEditModal(stu)}
                    onDelete={() => handleDelete(stu._id)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudyCard;