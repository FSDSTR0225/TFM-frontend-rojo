

import { FiExternalLink } from 'react-icons/fi'
import { MdOutlineMailOutline } from 'react-icons/md'
import { MainRecButton } from '../../../components/MainRecButton';
import { AvatarImage } from '../../../components/AvatarImage';
import { NameUsers } from '../../../components/NameUsers';
import { ChatContext } from '../../../layout/chat/context/ChatContext';
import { useContext } from 'react';

export const RecContactCard = ({owner}) => {
  const {openChat} = useContext(ChatContext);



  return (
    <aside className='card bg-neutral-80 shadow-xl border border-neutral-70 flex-col xs:text-lg lg:min-w-80 items-center'>
            <div className='card-body sm:flex-row  lg:flex-col  gap-4 md:gap-8 lg:gap-4 items-center'>
               <div className='flex flex-col sm:flex-row lg:flex-col gap-4 items-center'>
                <AvatarImage user={owner} width={20} />
                  <NameUsers user={owner}>{owner?.role.type}</NameUsers>
               </div>
                  <div>
                {owner?.role?.recruiter?.companyName || owner?.role?.recruiter?.company && 
                  <p>{owner?.role?.recruiter?.companyName || owner?.role?.recruiter?.company}</p>
                  
             }
                {owner?.role?.recruiter?.website &&(<a
                  href='goole.com'
                  className='flex items-center gap-2'
                >
                  <FiExternalLink />
                  {owner?.role?.recruiter?.website}
                </a>)}
                {owner?.role?.recruiter?.contact[0]?.email &&(<a
                  href='goole.com'
                  className='flex items-center gap-2'
                >
                  <MdOutlineMailOutline />
                  {owner?.role?.recruiter?.contact[0].email}
                </a>)}
              </div>
             
              
              <MainRecButton onClick={() => openChat(owner)} classProps=" sm:flex w-25 mt-4 text-secondary-40 bg-transparent hover:bg-transparent hover:text-neutral-0 hover:border-neutral-0">Contact</MainRecButton>
            </div>
            
          </aside>
  )
}
