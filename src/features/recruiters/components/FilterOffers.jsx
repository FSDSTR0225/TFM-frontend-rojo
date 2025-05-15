import React, { useState, useMemo } from 'react';
import { OfferCard } from './OfferCard';
import { OfferList } from './OfferList';

export const FilterOffers = ({ offers }) => {
  const [selectedContract, setSelectedContract] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');

  const availableSkills = ["React", "Node.js", "Python", "Docker", "AWS"];

  const filteredOffers = useMemo(() => {
    return offers
      .filter(offer => {
        const matchesContract = selectedContract 
          ? offer.contractType === selectedContract 
          : true;

        const matchesSkills = selectedSkills.length > 0 
          ? selectedSkills.every(skill => offer.skills?.includes(skill)) 
          : true;

        return matchesContract && matchesSkills;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [offers, selectedContract, selectedSkills, sortOrder]);

  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Filtrar ofertas</h2>
        
        {/* Filtro por tipo de contrato */}
        <div className="mb-4">
          <label htmlFor="contract-filter" className="block mb-1">Tipo de contrato:</label>
          <select
            id="contract-filter"
            value={selectedContract}
            onChange={(e) => setSelectedContract(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Todos</option>
            <option value="Full-time">Full-time</option>
            <option value="Remote">Remote</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>

        {/* Filtro por habilidades */}
        <div className="mb-4">
          <p className="mb-1">Habilidades:</p>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map(skill => (
              <label key={skill} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* Orden */}
        <div className="mb-4">
          <label htmlFor="sort-order" className="block mb-1">Orden:</label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="desc">Más recientes</option>
            <option value="asc">Más antiguos</option>
          </select>
        </div>

        {/* Botón de limpiar */}
        <button
          onClick={() => {
            setSelectedContract('');
            setSelectedSkills([]);
            setSortOrder('desc');
          }}
          className="mt-2 text-sm text-gray-400 hover:text-white"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Mostrar ofertas filtradas */}
      <div>
      <OfferList view={true}>
        {filteredOffers.length > 0 ? (
          filteredOffers.map(offer => (
            <OfferCard key={offer._id} offer={offer} />
          ))
        ) : (
          <p>No hay ofertas con estos filtros.</p>
        )}
        </OfferList>
      </div>
    </div>
  );
};

//  {currentOffers?.map((offer)=>{ 
              
//               return (

//               <OfferCard offer={offer} owner={offer.owner} key={offer._id} setIsOpenModalDelete={setIsOpenModalDelete} isOpenModalDelete={isOpenModalDelete}   />

//             )})}