
import { PiFunnel, PiFunnelX, PiSortAscending, PiSortDescending } from "react-icons/pi";


export const FilterOffers = ({offers, filtersOpen, setFiltersOpen, contractTypeFilter, setContractTypeFilter, skillsFilter, setSkillsFilter, sortOrder, setSortOrder, resetFilters}) => {




  const contractsTypes = [...new Set(offers.flatMap(offer =>offer.contractType.map(type => type.trim())))]

const hardSkills = [
  ...new Set(
    offers.flatMap(offer =>
      offer.skills
        .flatMap(s => s.split(","))
        .map(s => s.trim())
        .filter(Boolean) // Elimina vacíos
    )
  )
];
  
  return (
    <div className='flex items-center gap-4 xl:-mb-8 mt-6'>
    <div className='relative'>
    <label className="btn btn-md swap swap-rotate w-25 bg-neutral-70">
      <input
        type="checkbox"
        checked={filtersOpen}
        onChange={() => setFiltersOpen(prev => !prev)}
      />
      <div className="swap-on flex items-center gap-2">
        <PiFunnelX className="size-5" /> Filters
      </div>
      <div className="swap-off flex items-center gap-2">
        <PiFunnel className="size-5" /> Filters
      </div>
    </label>
    
    {/* selectores del filtro */}
    {filtersOpen && (
      <ul className="absolute top-12  z-50 rounded-box bg-neutral-90 shadow-lg border-2 border-neutral-70 min-w-85">
        <li className="flex flex-col p-4 border-b-2 border-neutral-50">
          <label>
            Type Contract:
            
          </label>
          <select
          className='p-2 mt-2 bg-neutral-90 border-2 border-neutral-70'
              value={contractTypeFilter}
              onChange={(e) => setContractTypeFilter(e.target.value)}
            >
              <option value="" className='bg-neutral-90 p-2'>All</option>
              {contractsTypes.map((contract, index) => (
                <option className='bg-neutral-90 p-2' key={index} value={contract}>
                  {contract}
                </option>
              ))}
            </select>
        </li>
    
        <li className="flex flex-col flex-wrap p-4 border-b-2 border-neutral-50">
          <fieldset className="flex items-center gap-2 flex-wrap">
            <legend className='mb-2'>Skills:</legend>
            {hardSkills.map((skill) => (
              <label className="flex items-center  cursor-pointer " key={skill}>
                <input
                className='btn btn-sm btn-outline btn-secondary-40 rounded-full'
                aria-label={skill}
                  type="checkbox"
                  checked={skillsFilter.includes(skill)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSkillsFilter((prev) =>
                      checked ? [...prev, skill] : prev.filter((s) => s !== skill)
                    );
                  }}
                />
                {/* <span className="bg-neutral-70 border border-neutral-60 px-3 py-1 rounded-full shadow-xl ">{skill}</span> */}
              </label>
            ))}
          </fieldset>
        </li>
    
        <li className="p-4">
          <button
            onClick={resetFilters}
            className="btn btn-outline btn-error w-full"
          >
            Reset Filters
          </button>
        </li>
      </ul>
    )}</div>
    
    
            
    
            
            
    
              <label className="btn btn-md swap swap-rotate w-25 bg-neutral-70">
      <input  
        type="checkbox"
        checked={sortOrder === 'desc'} // ✅ Activa visualmente el swap
        onChange={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
      />
      <div className="swap-on flex inline-center gap-2"><PiSortAscending className='size-5' />Latest</div>
      <div className="swap-off flex inline-center gap-2"><PiSortDescending className='size-5'/>Oldest</div>
    </label>
      </div>      
  )
}
