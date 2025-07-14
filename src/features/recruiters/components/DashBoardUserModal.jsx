import { useNavigate } from "react-router";
import { capitalize } from "../../../utils/utils";
import { CandidateSkills } from "./candidateSkills";
import { PiChat, PiEnvelope, PiFileArrowDown, PiMapPinArea, PiReadCvLogo } from "react-icons/pi";
import { NameUsers } from "../../../components/NameUsers";
import { AvatarImage } from "../../../components/AvatarImage";
import { GoChevronDown } from "react-icons/go";



export const DashBoardUserModal = ({ skillsOffer, colors, fadedColors, textColors, changeStatusCandidate, offerId, openChat, handleDownloadCV, handleDownloadCoverLetter, candidate, handleCloseApplicantsModal  }) => {
const navigate = useNavigate();


  const name = capitalize(candidate?.user?.name || '');
                  const surname = capitalize(candidate?.user?.surname || '');
                  const completeName = `${name} ${surname}`.trim() || 'Unknown Profile';
                  const isResume = candidate?.user?.role?.developer?.resume;
                  const isCoverLetter = (candidate?.coverLetter?.length ?? 0) >= 5;


  return (
    <div className=' modal modal-open fixed inset-0 flex justify-center items-center z-50'>
      <div className=' modal-box  w-sm  bg-neutral-80 border border-neutral-70 rounded-lg p-6 relative flex flex-col '>
        <button className="self-end cursor-pointer"  onClick={handleCloseApplicantsModal} >X</button>
        <div className='flex flex-col items-center gap-4 w-full'>
            <div key={candidate._id} className=" ">
                        <div
                          
                          className='flex flex-col gap-6'
                        >
                          {/* Izquierda: avatar + info */}
                          <div className='flex items-center gap-2 '>
                            <div className='flex flex-col items-center gap-2  '>
                              <div className='flex gap-4 self-start cursor-pointer' onClick={() => navigate(`/profile/${candidate?.user?._id}`)}>
                                <div>
                                <AvatarImage user={candidate?.user} width={20} />
                                </div>
                                  <div>
                                <NameUsers
                                  user={candidate?.user}
                                  align='items-start'
                                  classProps={"line-clamp-1 text-lg"}
                                >
                                  {candidate?.user?.role?.developer?.location && (
                                    <>
                                    <p className="text-sm">
                                      {candidate?.user?.role?.developer?.professionalPosition}
                                    </p>
                                    <p className='flex items-center gap-1 text-sm text-neutral-20'>
                                      <PiMapPinArea className='size-4' />
                                      {candidate?.user?.role?.developer?.location}
                                    </p>
                                    
                                    </>
                                  )}
                                </NameUsers>
                                </div>
                              </div>
                            
                            </div>
                            {/* Tecnologías */}
                          </div>
                                  <div className=" items-center  mt-2 text-sm">
                                  <p className="text-md mb-1">Skills:</p>
                             <CandidateSkills skills={candidate?.user?.role?.developer?.skills} skillsOffer={skillsOffer}/>
                           </div>
        
                                <div className='flex self-center items-center w-full gap-4'>
                                                    <div className='relative flex w-full flex-col gap-4'>
                                                      <select
                    value={candidate.status}
                    onChange={(e) => changeStatusCandidate(e.target.value, candidate._id)}
                    className={`px-3 py-1 pr-7 rounded-md text-md capitalize appearance-none
                      ${fadedColors[candidate.status] || "bg-black/20"} 
                      ${textColors[candidate.status] || "text-white"}
                    `}
                  >
                    {Object.keys(colors).map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                                                      <div className='pointer-events-none absolute right-2 top-1/5 transform -translate-y-1/2'>
                                                        <GoChevronDown />
                                                      </div>
                                                       
                                                          <div className="flex items-center gap-4 justify-center self-center">
                                
                                                      <button 
                                                        onClick={() =>
                          handleDownloadCV(
                            candidate.user.role.developer.resume,
                            `${completeName}_CV.pdf`
                          )
                        }
                                                        className={`btn  bg-neutral-90 hover:bg-neutral-60 ${!isResume && 'btn-disabled'} `}
                                                      >
                                                        <PiReadCvLogo size={20} />
                                                      </button>
                                                      <button
                                                        onClick={() => handleDownloadCoverLetter(offerId, candidate._id)}
                                                        className={`btn bg-neutral-90 hover:bg-neutral-60 ${!isCoverLetter && 'btn-disabled'} `}
                                                      >
                                                        <PiFileArrowDown size={20} />
                                                      </button>
                                                          
                                
                                                        <a className="btn bg-neutral-90 hover:bg-neutral-60" href={`mailto: ${candidate?.user?.email}`}><PiEnvelope size={20} /></a>
                                                      <button
                                                        onClick={() => openChat(candidate.user)}
                                                        className='btn bg-linear-135 from-[#37C848] from-10%  to-[#0077ff80] to-90% '
                                                      >
                                                        <PiChat size={20} />
                                                      </button>
                                                          </div>
                                                          
                                                      
                                                    </div>
                                                  </div>
                                                </div>
                                  
                                                </div>
                                         
                                            
                                          </div>
      </div>
    </div>
  );
};
