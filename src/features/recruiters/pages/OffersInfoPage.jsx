import { useState } from "react";
import {
  getOffers,
  getOffersAppliedByDeveloper,
  getOffersByDeveloper,
} from "../../../services/offersServices";
import { useEffect } from "react";
import { OfferCard } from "../components/OfferCard";
import { SectionContainer } from "../../../components/SectionContainer";
import { OfferList } from "../components/OfferList";
import { Pagination } from "../../../components/Pagination";
import { ModalDelete } from "../components/ModalDelete";
import { OfferModal } from "../components/OfferModal";
import { FilterOffers } from "../components/FilterOffers";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { ApplyModal } from "../components/ApplyModal";

export const OffersInfoPage = () => {
  const [offers, setOffers] = useState([]);
  const [offersAplied, setOffersApplied] = useState([]);
  const [offersByDev, setOffersByDev] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenApplyModal, setIsOpenApplyModal] = useState(false);

  //const [operacion, setOperacion] = useState('crear');
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [contractTypeFilter, setContractTypeFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  const { profile } = useContext(AuthContext);

  const isDeveloper = profile?.role.type === "developer";

  const resetFilters = () => {
    setContractTypeFilter("");
    setSkillsFilter([]);
  };

  const getFilteredOffers = () => {
    let filtered = [...offers];

    if (contractTypeFilter) {
      filtered = filtered.filter(
        (offer) => offer && offer.contractType.includes(contractTypeFilter)
      );
    }

    if (skillsFilter.length > 0) {
      filtered = filtered.filter((offer) =>
        skillsFilter.every((skill) => offer.skills.includes(skill))
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    return filtered;
  };

  const getFilteredAppliedOffers = () => {
    if (!offersAplied || !Array.isArray(offersAplied)) {
      return [];
    }

    let filtered = [...offersAplied];

    if (contractTypeFilter) {
      filtered = filtered.filter(
        (offer) => offer && offer.contractType.includes(contractTypeFilter)
      );
    }

    if (skillsFilter.length > 0) {
      filtered = filtered.filter((offer) =>
        skillsFilter.every((skill) => offer.skills.includes(skill))
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  };

  const getFilteredOffersByDev = () => {
    if (!offersAplied || !Array.isArray(offersAplied)) {
      return [];
    }

    let filtered = [...offersByDev];

    if (contractTypeFilter) {
      filtered = filtered.filter(
        (offer) => offer && offer.contractType.includes(contractTypeFilter)
      );
    }

    if (skillsFilter.length > 0) {
      filtered = filtered.filter((offer) =>
        skillsFilter.every((skill) => offer.skills.includes(skill))
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  };

  const filteredOffers = getFilteredOffers();
  const filteredAppliedOffers = getFilteredAppliedOffers();
  const filteredOffersByDev = getFilteredOffersByDev();
  console.log("Filtered offers:", filteredOffers);

  const totalPages = Math.ceil(filteredOffers.length / 6);
  const totalPagesApplied = Math.ceil(filteredAppliedOffers.length / 6);
  const totalPagesByDev = Math.ceil(filteredOffersByDev.length / 6);

  const startIndex = (currentPage - 1) * 6;

  const token = localStorage.getItem("token");
  const currentOffers = filteredOffers.slice(startIndex, startIndex + 6);
  const currentAppliedOffers = filteredAppliedOffers.slice(
    startIndex,
    startIndex + 6
  );
  const currentOffersByDev = filteredOffersByDev.slice(
    startIndex,
    startIndex + 6
  );
  const handlePageChange = (pageNum) => {
    if (pageNum === currentPage) return;
    setCurrentPage(pageNum); // Primero actualizamos la página
  };

  const fetchOffersForDeveloper = async () => {
    try {
      const applied = await getOffersAppliedByDeveloper(profile._id, token);
      const created = await getOffersByDeveloper(token);
      setOffersApplied(applied);
      setOffersByDev(created);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchOffers = async () => {
    try {
      const offers = await getOffers();
      setOffers(offers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isDeveloper) {
      console.log("Fetching offers for developer:", profile._id);
      fetchOffersForDeveloper();
    } else {
      console.log("Fetching general offers");
      fetchOffers();
    }
  }, [isDeveloper, token]);

  useEffect(() => {
    setCurrentPage(1);
  }, [contractTypeFilter, skillsFilter, sortOrder]);

  if (loading) {
    return (
      <SectionContainer classProps="flex flex-col space-y-6">
        {/* Título y descripción skeleton */}
        <div className="space-y-4 p-4">
          <div className="h-8 bg-base-200 rounded-lg skeleton"></div>
          <div className="h-4 bg-base-200 rounded-lg skeleton w-5/6"></div>
          <div className="h-4 bg-base-200 rounded-lg skeleton w-4/6"></div>
        </div>
        {/* Lista de tarjetas skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg space-y-3 animate-pulse"
            >
              <div className="h-4 bg-base-200 rounded-lg skeleton w-3/4"></div>
              <div className="h-3 bg-base-200 rounded-lg skeleton w-full"></div>
              <div className="h-3 bg-base-200 rounded-lg skeleton w-5/6"></div>
              <div className="h-8 bg-base-200 rounded-lg skeleton w-1/2"></div>
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }
  if (error) return <p>Error al cargar las ofertas: {error}</p>;

  const handleApplySuccess = (updatedOffer) => {
    console.log("Offer applied successfully:", updatedOffer);
    setOffersByDev((prevOffers) => {
      console.log("🚀 ~ handleApplySuccess ~ prevOffers:", prevOffers);
      return prevOffers.map((offer) =>
        offer._id === updatedOffer._id ? updatedOffer : offer
      );
    });
  };

  return (
    <SectionContainer>
      <div className="mt-4 md:mt-10">
        <h2 className="text-3xl font-bold mb-2">
          Your Next Tech Career Starts Here
        </h2>
        <p className="text-neutral-30 text-md font-normal">
          Discover job opportunities for developers, designers, and engineers in
          fast-growing tech fields.
        </p>
      </div>

      <div>
        {isDeveloper && (
          <div className="tabs tabs-border mt-4">
            <input
              type="radio"
              name="my_tabs_2"
              className="tab"
              aria-label="Job offers"
              defaultChecked
            />
            <div className="tab-content  ">
              <FilterOffers
                offers={offersByDev}
                filtersOpen={filtersOpen}
                setFiltersOpen={setFiltersOpen}
                contractTypeFilter={contractTypeFilter}
                setContractTypeFilter={setContractTypeFilter}
                skillsFilter={skillsFilter}
                setSkillsFilter={setSkillsFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                resetFilters={resetFilters}
              />

              <OfferList view={true}>
                {currentOffersByDev?.map((offer) => {
                  return (
                    <OfferCard
                      offer={offer}
                      owner={offer.owner}
                      setIsOpenModalDelete={setIsOpenModalDelete}
                      isOpenModalDelete={isOpenModalDelete}
                      isOpenApplyModal={isOpenApplyModal}
                      setIsOpenApplyModal={setIsOpenApplyModal}
                      setSelectedOfferId={setSelectedOfferId}
                      isOpenModalEdit={isOpenModalEdit}
                      setIsOpenModalEdit={setIsOpenModalEdit}
                      key={offer._id}
                    />
                  );
                })}
              </OfferList>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPagesByDev}
                handlePageChange={handlePageChange}
                filteredProjects={filteredOffersByDev}
              />
            </div>

            <input
              type="radio"
              name="my_tabs_2"
              className="tab "
              aria-label="Applied Offers"
            />
            <div className="tab-content">
              {" "}
              <FilterOffers
                offers={offersAplied}
                filtersOpen={filtersOpen}
                setFiltersOpen={setFiltersOpen}
                contractTypeFilter={contractTypeFilter}
                setContractTypeFilter={setContractTypeFilter}
                skillsFilter={skillsFilter}
                setSkillsFilter={setSkillsFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                resetFilters={resetFilters}
              />
              <OfferList view={true}>
                {currentAppliedOffers?.map((offer) => {
                  return (
                    <OfferCard
                      offer={offer}
                      owner={offer.owner}
                      setIsOpenModalDelete={setIsOpenModalDelete}
                      isOpenModalDelete={isOpenModalDelete}
                      setSelectedOfferId={setSelectedOfferId}
                      isOpenModalEdit={isOpenModalEdit}
                      setIsOpenModalEdit={setIsOpenModalEdit}
                      key={offer._id}
                    />
                  );
                })}
              </OfferList>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPagesApplied}
                handlePageChange={handlePageChange}
                filteredProjects={filteredAppliedOffers}
              />
            </div>
          </div>
        )}
      </div>

      {!isDeveloper && (
        <>
          <FilterOffers
            offers={offers}
            filtersOpen={filtersOpen}
            setFiltersOpen={setFiltersOpen}
            contractTypeFilter={contractTypeFilter}
            setContractTypeFilter={setContractTypeFilter}
            skillsFilter={skillsFilter}
            setSkillsFilter={setSkillsFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            resetFilters={resetFilters}
          />
          <OfferList view={true}>
            {currentOffers?.map((offer) => {
              return (
                <OfferCard
                  offer={offer}
                  owner={offer.owner}
                  setIsOpenModalDelete={setIsOpenModalDelete}
                  isOpenModalDelete={isOpenModalDelete}
                  setSelectedOfferId={setSelectedOfferId}
                  isOpenModalEdit={isOpenModalEdit}
                  setIsOpenModalEdit={setIsOpenModalEdit}
                  key={offer._id}
                />
              );
            })}
          </OfferList>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            filteredProjects={offers}
          />{" "}
        </>
      )}
      {isOpenModalDelete && (
        <ModalDelete
          isOpen={isOpenModalDelete}
          setIsOpen={setIsOpenModalDelete}
          reloadPage={fetchOffers}
        />
      )}
      {isOpenModalEdit && (
        <OfferModal
          idOffer={selectedOfferId}
          isOpen={isOpenModalEdit}
          setIsOpen={setIsOpenModalEdit}
          token={token}
          reloadPage={fetchOffers}
        />
      )}
      {isOpenApplyModal && (
        <ApplyModal
          idOffer={selectedOfferId}
          isOpen={isOpenApplyModal}
          setIsOpen={setIsOpenApplyModal}
          token={token}
          onApplySuccess={handleApplySuccess}
        />
      )}
    </SectionContainer>
  );
};
