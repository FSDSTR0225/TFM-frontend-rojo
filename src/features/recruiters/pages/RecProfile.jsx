import React, { useState,useContext, useEffect } from 'react'
import { OfferCard } from '../components/OfferCard'
import { OfferModal } from '../components/OfferModal'
import { AuthContext } from '../../../context/authContext';
import {  useParams } from "react-router";
import { getOffersbyOwner } from '../../../services/offersServices';
import { SectionContainer } from '../../../components/SectionContainer';
import { Pagination } from '../../../components/Pagination';
import { getRecruiterById } from '../../../services/profileService';

import { RecProfileCard } from '../components/RecProfileCard';
import { ModalDelete } from '../components/ModalDelete';

export const RecProfile = () => {
  const [offers, setOffers] = useState([]);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [recruiter, setRecruiter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { profile, token } = useContext(AuthContext) || {};
  
  const { id } = useParams(); // ID del reclutador desde la URL
  

  const isOwner = profile?._id === id;



  const totalPages = Math.ceil(offers.length / 4);
  const startIndex = (currentPage - 1) * 4;
  const currentOffers= offers.slice(startIndex, startIndex + 4);

  const handlePageChange = (pageNum) => {
    if (pageNum === currentPage) return;
    setCurrentPage(pageNum); // Primero actualizamos la página 
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos del reclutador
        const recruiterData = await getRecruiterById(id);
        setRecruiter(recruiterData);
  
        // Obtener ofertas según si el usuario es el dueño
        const offersData = await getOffersbyOwner(id) 
          
  
        setOffers(offersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [id, isOwner]);


  return (
    <SectionContainer >
    
        <div className='flex flex-col md:flex-row md:justify-between gap-8 items-start'>
        <RecProfileCard recruiter={recruiter} />
        
      <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Mis ofertas de empleo</h2>
            { (isOwner && profile?.role?.type === 'recruiter') &&(<><button onClick={() => document.getElementById('my_modal_1').showModal()} className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer text-sm">
              + Create new offer
            </button>
            <dialog id="my_modal_1" className="modal">
              <OfferModal token={token} />
            </dialog>
            </>)}
          </div>
        <div>
        <div className=" grid lg:grid-cols-2 gap-8 py-10">
                        {currentOffers?.map((offer)=>{ 
                          
                          return (
            
                          <OfferCard offer={offer} owner={offer.owner} setIsOpenModalDelete={setIsOpenModalDelete} isOpenModalDelete={isOpenModalDelete} key={offer._id}  />
            
                        )})}
                        
                        
            
          </div>
          <Pagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              handlePageChange={handlePageChange}
                              filteredProjects={offers}
                            />
          </div>
          
        </div> 
         {isOpenModalDelete &&<ModalDelete isOpen={isOpenModalDelete} setIsOpen={setIsOpenModalDelete} />}
        
        </div>
              
    </SectionContainer>
  );
};
