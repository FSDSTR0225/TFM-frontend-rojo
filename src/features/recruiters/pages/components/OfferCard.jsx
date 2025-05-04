
export const OfferCard = () => {
  return (
     <li key={offer._id} className='card'>
                    <div className='card-body'>
                      <h2>{offer.position}</h2>
                      <div className='flex items-center gap-3'><TfiLocationPin />{offer.location}</div>
                      <p>{offer.description}</p> 
                        
                    </div>
                  </li>
  )
}
