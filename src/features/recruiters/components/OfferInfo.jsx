
import { EditButton } from '../../../components/EditButton';
import { TfiLocationPin } from 'react-icons/tfi';

export const OfferInfo = ({offer}) => {

  return (
    <article  className=' card bg-base-200 shadow-xl border border-base-100 flex-col  w-full '>
            <div className='card-body gap-6'>
              <EditButton classProps={"self-end"} />
              <h2 className='text-xl md:text-2xl  font-bold m'>{offer.position}</h2>
              <p>{offer.role}</p>
              <div className='flex items-center gap-4 m-4'>
                <TfiLocationPin />
                {offer.location}
                <span className='badge badge-soft badge-info'>{offer.contractType}</span>
              </div>
              <p className=''>{offer.description}</p>
              <h3>Necessary Skills:</h3>
              <div className='flex gap-5 flex-wrap'>
                {offer.skills.map((skill, index) => {
                  return <span key={index} className='badge badge-soft badge-accent"'>{skill}</span>;
                })}
              </div>
              {offer.language && (
                <>
                  <p>Language: {offer.language}</p>
                </>
              )}
              {offer.salary && (
                <>
                  <p>Salary: {offer.salary}</p>
                </>
              )}
              <button className='btn btn-outline bg-green-600 hover:bg-green-700 text-base-300'>
                Apply Now
              </button>
            </div>
          </article>
  )
}
