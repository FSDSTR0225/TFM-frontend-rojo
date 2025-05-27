import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { getStudiesByDeveloper } from '../../../services/studyService';
import { PiPlus } from 'react-icons/pi';
// import NewStudyModal from '../components/newStudyModal';

function StudyCard({ profileInfo }) {
  const { profile: currentUser, token } = useContext(AuthContext);
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      })
      .catch(() => {
        setError('Error al obtener los studies');
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
            Añadir study
          </button>
        )}
      </div>

      {isModalOpen && (
        <NewStudyModal onClose={handleCloseModal} />
      )}

      {loading ? (
        <div className="flex justify-center py-4">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : studies.length === 0 ? (
        <div className="text-gray-500 text-sm">Este usuario no ha añadido ningun study todavía.</div>
      ) : (
        <ul className="space-y-4">
          {studies.map(stu => (
            <li key={stu._id} className="grid grid-cols-3 gap-4 bg-neutral-80 border border-neutral-60 p-8 mb-4 rounded-md">
              <h3 className="col-span-2 text-xl uppercase font-bold">{stu.degree}</h3>
              <p className="col-span-2">{stu.instituteName}</p>
              <p className="col-span-2">{stu.description}</p>
              <p className="grid justify-items-end pr-4">
                {new Date(stu.startDate).toLocaleDateString()} -{' '}
                {stu.endDate ? new Date(stu.endDate).toLocaleDateString() : 'Actualidad'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudyCard;





















// function StudyCard({ profileInfo }) {
//     if (!profileInfo) return <p>Error al cargar los estudios</p>;
//     return (
//         <div>
//             <div className="flex justify-end mb-2">
//                 <Link 
//                     to={profileInfo.role.developer.github} 
//                     className="btn bg-primary-60 hover:bg-primary-70 rounded-md hover:shadow-lg text-sm"
//                     aria-label="Create study">
//                     Create study
//                 </Link>
//             </div>
//             <div className="grid grid-cols-3 gap-4 bg-neutral-80 border border-neutral-60 p-8 mb-4 rounded-md">
//                 <h3 className="col-span-2 text-xl uppercase font-bold">BSc Computer Science</h3>
//                 <span className="col-span-2">Universidad Politécnica de Madrid</span>
//                 <span className="grid justify-items-end pr-4">2018</span>
//             </div>
//         </div>
//     )
// };