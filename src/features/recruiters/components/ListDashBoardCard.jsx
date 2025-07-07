import { PiChat, PiEnvelope, PiFileArrowDown, PiMapPinArea, PiReadCvLogo } from "react-icons/pi"
import { AvatarImage } from "../../../components/AvatarImage"
import { NameUsers } from "../../../components/NameUsers"
import { CandidateSkills } from "./candidateSkills"

import { GoChevronDown } from "react-icons/go"
import { capitalize } from "../../../utils/utils"



export const ListDashBoardCard = ({lists, activeTab, skillsOffer, colors, fadedColors, textColors, changeStatusCandidate, offerId, openChat, handlerDownloadCV, handlerDownloadCoverLetter }) => {

  


  return (
    <div className="flex flex-col gap-4">
        <div className='flex flex-col gap-4'>
           {lists[activeTab]?.length > 0 ? (
        lists[activeTab].map((candidato) => {
          const name = capitalize(candidato?.user?.name || '');
          const surname = capitalize(candidato?.user?.surname || '');
          const completeName = `${name} ${surname}`.trim() || 'Unknown Profile';
          const isResume = candidato?.user?.role?.developer?.resume;
          const isCoverLetter = (candidato?.coverLetter?.length ?? 0) >= 5;
          return (
    <div key={candidato._id} className="bg-neutral-80 p-4 gap-2 rounded-lg shadow-sm border border-neutral-60 flex flex-col">
                <div
                  
                  className='flex items-center justify-between '
                >
                  {/* Izquierda: avatar + info */}
                  <div className='flex flex-col items-center gap-2 '>
                    <div className='flex flex-col items-center gap-2 '>
                      <div className='flex gap-2 self-start '>
                        <div>
                        <AvatarImage user={candidato?.user} width={10} />
                        </div>
                          <div>
                        <NameUsers
                          user={candidato?.user}
                          align='items-start'
                          classProps={"line-clamp-1 text-sm"}
                        >
                          {candidato?.user?.role?.developer?.location && (
                            <>
                            <p>
                              {candidato?.user?.role?.developer?.professionalPosition}
                            </p>
                            <p className='flex items-center gap-1 text-mds text-neutral-20'>
                              <PiMapPinArea className='size-4' />
                              {candidato?.user?.role?.developer?.location}
                            </p>
                            
                            </>
                          )}
                        </NameUsers>
                        </div>
                      </div>
                      {/* <p className=' self-start flex items-center gap-1 text-xs'>
                        <PiEnvelope />
                        {candidato?.user?.email}
                      </p> */}
                    </div>
                    {/* Tecnologías */}
                  </div>
                          <div className="hidden min-w-20 sm:flex flex-wrap gap-2 mt-2 text-xs">
                     <CandidateSkills skills={candidato?.user?.role?.developer?.skills} skillsOffer={skillsOffer}/>
                   </div>

                        <div className='flex items-center gap-4'>
                                            <div className='relative flex flex-col gap-2'>
                                              <select
                                                value={candidato.status}
                                                onChange={(e) => changeStatusCandidate(e.target.value, candidato._id)}
                                                className={`px-3 py-1 pr-7 rounded-md text-xs md:text-sm capitalize appearance-none
                                                ${fadedColors[candidato.status] || "bg-black/20"} ${
                                                  textColors[candidato.status] || "text-white"
                                                }`}
                                              >
                                                {Object.keys(colors).map((status) => (
                                                  <option
                                                    key={status}
                                                    value={status}
                                                  >
                                                    {status}
                                                  </option>
                                                ))}
                                              </select>
                                              <div className='pointer-events-none absolute right-2 top-1/8 md:top-1/5 lg:top-1/8 transform -translate-y-1/2'>
                                                <GoChevronDown />
                                              </div>
                                                  <div className="flex flex-col md:flex-row  intems-center  gap-1 gap-x-2">
                                                  <div className="flex gap-2">
                        
                                              <button 
                                                onClick={() =>
                  handlerDownloadCV(
                    candidato.user.role.developer.resume,
                    `${completeName}_CV.pdf`
                  )
                }
                                                className={`btn btn-md  bg-neutral-90 hover:bg-neutral-60 ${!isResume && 'btn-disabled'} `}
                                              >
                                                <PiReadCvLogo size={20} />
                                              </button>
                                              <button
                                                onClick={() => handlerDownloadCoverLetter(offerId, candidato._id)}
                                                className={`btn btn-md  bg-neutral-90 hover:bg-neutral-60 ${!isCoverLetter && 'btn-disabled'} `}
                                              >
                                                <PiFileArrowDown size={20} />
                                              </button>
                                                  </div>
                                                  <div className="flex gap-2">
                        
                                                <a className="btn btn-md bg-neutral-90 hover:bg-neutral-60" href={`mailto: ${candidato?.user?.email}`}><PiEnvelope size={20} /></a>
                                              <button
                                                onClick={() => openChat(candidato.user)}
                                                className='btn btn-md bg-linear-135 from-[#37C848] from-10%  to-[#0077ff80] to-90% '
                                              >
                                                <PiChat size={20} />
                                              </button>
                                                  </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                                   <div className="flex flex-wrap sm:hidden gap-2 mt-2 text-xs">
                                             <CandidateSkills skills={candidato?.user?.role?.developer?.skills} skillsOffer={skillsOffer}/>
                                           </div>
                                        </div>
                                      )})
                                    ) : (
                                      <p className='text-neutral-50'>No hay candidatos en "{activeTab}".</p>
                                    )}
                                    
                                  </div>
                                </div>
  )
}
