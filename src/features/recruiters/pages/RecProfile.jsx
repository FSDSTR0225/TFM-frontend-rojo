import  { useState, useContext, useEffect } from 'react'
import { OfferCard } from '../components/OfferCard'
import { OfferModal } from '../components/OfferModal'
import { AuthContext } from '../../../context/authContext';
import { useParams } from "react-router";
import { getOffersbyOwner, getRecruitersStats } from '../../../services/offersServices';
import { SectionContainer } from '../../../components/SectionContainer';
import { Pagination } from '../../../components/Pagination';
import { getRecruiterById } from '../../../services/profileService';

import { RecProfileCard } from '../components/RecProfileCard';
import { ModalDelete } from '../components/ModalDelete';
import { ApplyModal } from '../components/ApplyModal';


export const RecProfile = () => {
  const [offers, setOffers] = useState([]);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalCreate, setTsOpenModalCreate] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalApply, setIsOpenModalApply] = useState(false);
  const [recruiter, setRecruiter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [stats, setStats] = useState(null)
  const { profile, token, setProfile } = useContext(AuthContext) || {};
  const [operacion, setOperacion] = useState('crear');

  const { id } = useParams(); // ID del reclutador desde la URL


  const isOwner = profile?._id === id;





  const totalPages = Math.ceil(offers.length / 4);
  const startIndex = (currentPage - 1) * 4;
  const currentOffers = offers.slice(startIndex, startIndex + 4);

  const handlePageChange = (pageNum) => {
    if (pageNum === currentPage) return;
    setCurrentPage(pageNum); // Primero actualizamos la página 
  };

  const updateRecruiterData = async () => {
  try {
    const recruiterData = await getRecruiterById(id);
    setRecruiter(recruiterData);
  } catch (error) {
    console.error("Error fetching recruiter data:", error);
  }
};

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




  useEffect(() => {
    console.log("isOpenModalEdit:", isOpenModalEdit)
    fetchData();
  }, [id, isOwner, isOpenModalEdit]);

  const fetchStats = async () =>{
      try {
        const statsData = await getRecruitersStats(profile._id)
        setStats(statsData)
      } catch (error) {
        console.error("Stats Error:", error);
      }
    }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <SectionContainer classProps={"py-12"} >

      <div className='flex flex-col md:flex-row  gap-4 '>
        <RecProfileCard stats={stats} recruiter={recruiter} token={token} profile={profile} id={id} setProfile={setProfile} onRecruiterUpdate={updateRecruiterData}/>
        <div className="w-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">My Offers</h2>
          </div>
          <div className='flex flex-col p-6 h-full justify-between'>
          {(isOwner && profile?.role?.type === 'recruiter') && (<><button onClick={() => setTsOpenModalCreate(true)} className="bg-secondary-50 text-black px-4 py-2 rounded hover:bg-secondary-70 transition cursor-pointer text-sm self-end">
              + Create new offer
            </button>
              <OfferModal
                isOpen={isOpenModalCreate}
                setIsOpen={setTsOpenModalCreate}
                token={token}
                operacion={operacion}
                reloadPage={fetchData} />
            </>)}
            {offers.length === 0 && 
            <div className="flex  self-center items-end gap-8 py-4 flex-1">
              <div className=" bg-neutral-80 p-4 rounded-lg border border-neutral-70 md:w-md">
                <p className="text-center self-center text-neutral-20">You don't have any job offers yet. Create one now and start receiving applications!</p>
              </div>
            </div>
            }
            <div className=" grid lg:grid-cols-1 gap-8 py-4 flex-1">
              {currentOffers?.map((offer) => {
                return (
                  <OfferCard
                    offer={offer}
                    owner={offer.owner}
                    setIsOpenModalDelete={setIsOpenModalDelete}
                    isOpenModalDelete={isOpenModalDelete}
                    setSelectedOfferId={setSelectedOfferId}
                    isOpenApplyModal={isOpenModalApply}
              setIsOpenApplyModal={setIsOpenModalApply}
                    isOpenModalEdit={isOpenModalEdit}
                    setIsOpenModalEdit={setIsOpenModalEdit}
                    key={offer._id} 
                    classProps={""}
                    />
                    
                )
              })}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              filteredProjects={offers}
            />
            
          </div>

        </div>
        {isOpenModalDelete && <ModalDelete
          isOpen={isOpenModalDelete}
          setIsOpen={setIsOpenModalDelete}
          idOffer={selectedOfferId}
          reloadPage={fetchData} />}

        {isOpenModalEdit && <OfferModal
          idOffer={selectedOfferId}
          isOpen={isOpenModalEdit}
          setIsOpen={setIsOpenModalEdit}
          token={token}
          reloadPage={fetchData} />
        }
        {isOpenModalApply && <ApplyModal
          idOffer={selectedOfferId}
          isOpen={isOpenModalApply}
          setIsOpen={setIsOpenModalApply}
          token={token}
          reloadPage={fetchData} />
        }
      </div>

    </SectionContainer>
  );
};
