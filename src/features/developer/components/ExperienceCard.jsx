import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { getExperiencesByDeveloper } from '../../../services/experienceService';
import { PiPlus } from 'react-icons/pi';
import NewExperienceModal from '../components/newExperienceModal';

function ExperienceCard({ profileInfo }) {
  const { profile: currentUser, token } = useContext(AuthContext);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      })
      .catch(() => {
        setError('Error al obtener las experiencias');
      })
      .finally(() => setLoading(false));
  }, [profileInfo?._id, token]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-end mb-2">
        
        {isCurrentUser && (
          <button
            onClick={handleOpenModal}
            className="btn bg-primary-60 hover:bg-primary-70 rounded-md hover:shadow-lg text-sm"
          >
            <PiPlus className="text-xl" />
            Añadir experiencia
          </button>
        )}
      </div>

      {isModalOpen && (
        <NewExperienceModal onClose={handleCloseModal} />
      )}

      {loading ? (
        <div className="flex justify-center py-4">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : experiences.length === 0 ? (
        <div className="text-gray-500 text-sm">Este usuario no ha añadido ninguna experiencia todavía.</div>
      ) : (
        <ul className="space-y-4">
          {experiences.map(exp => (
            <li key={exp._id} className="grid grid-cols-3 gap-4 bg-neutral-80 border border-neutral-60 p-8 mb-4 rounded-md">
              <h3 className="col-span-2 text-xl uppercase font-bold">{exp.position}</h3>
              <p className="col-span-2">{exp.company}</p>
              <p className="grid justify-items-end pr-4">
                {new Date(exp.startDate).toLocaleDateString()} -{' '}
                {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Actualidad'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExperienceCard;
