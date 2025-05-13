import React, { useContext, useEffect, useState } from 'react'
import { OfferCard } from '../components/OfferCard'
import { OfferModal } from '../components/OfferModal'
import { AuthContext } from '../../../context/authContext';
import { useNavigate } from "react-router";
import { getOffersbyOwner } from '../../../services/offersServices';
import { SectionContainer } from '../../../components/SectionContainer';
import { Pagination } from '../../../components/Pagination';

export const RecProfile = () => {
  const [offers, setOffers] = useState([])


  const { profile, token } = useContext(AuthContext);
  const navigate = useNavigate();

const [currentPage, setCurrentPage] = useState(1);


  const totalPages = Math.ceil(offers.length / 4);
  const startIndex = (currentPage - 1) * 4;
  const currentOffers= offers.slice(startIndex, startIndex + 4);

  const handlePageChange = (pageNum) => {
    if (pageNum === currentPage) return;
    setCurrentPage(pageNum); // Primero actualizamos la página     // Luego activamos el loading
    setTimeout(() => {    // Después de un pequeño retraso, desactivamos el loading
    }, 500);
  };


  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  useEffect(()=>{
      const fetchOffers = async () => {
        try {
          const offerData = await getOffersbyOwner(profile._id)
          setOffers(offerData)
        } catch (error) {
          return (error.message)
        }
      }
      fetchOffers()
    },[])


  return (
    <SectionContainer >
      {!profile ? (
        <p className="text-white text-center mt-10">Cargando perfil...</p>
      ):(
        <div className='flex flex-col md:flex-row md:justify-between gap-8 items-start'>
        <div className="card bg-base-200 shadow-xl border border-base-100 flex-col text-sm md:text-lg min-w-50">
        {/* Card perfil */}
        <div className="card-body bg-base-200">
          <div className="flex  flex-col items-center">
            <div className="w-20 h-20 bg-gray-600 rounded-full mb-4" />
            <h2 className="text-lg font-semibold">{profile.name} {profile.surname}</h2>
            <p className="text-sm text-gray-400 mb-4">{profile.role.type}</p>
          </div>
          <ul className="text-sm text-gray-300 space-y-1 mb-4">
            <li>+ Nombre Empresa</li>
            <li>+ Ubicación empresa</li>
            <li>+ Email recruiter</li>
            <li>+ Phone</li>
            <li>+ Url empresa</li>
          </ul>
          <div>
            <h3 className="text-white font-semibold mb-1">Sobre la empresa</h3>
            <p className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis sapien sed quam dignissim efficitur...
            </p>
          </div>
        </div>

        {/* Sección ofertas */}

      </div>
      <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Mis ofertas de empleo</h2>
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer text-sm">
              + Create new offer
            </button>
            <dialog id="my_modal_1" className="modal">
              <OfferModal token={token} />
            </dialog>
          </div>
        <div>
        <div className=" grid lg:grid-cols-2 gap-8 py-10">
                        {offers?.map((offer)=>{ 
                          
                          return (
            
                          <OfferCard offer={offer} owner={offer.owner} key={offer._id}  />
            
                        )})}
                        
                        
            
          </div>
          <Pagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              handlePageChange={handlePageChange}
                              filteredProjects={currentOffers}
                            />
          </div>
          
        </div>
        </div>
              
      )
      }
    </SectionContainer>
  );
};
