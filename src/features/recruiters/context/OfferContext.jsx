import { createContext, useState, useEffect } from "react";
import { createdOffert } from '../../../services/offersServices'

//Incompleto........
export const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {

    }, [])

    const addOffer = (newOffer) => {
        createdOffert();
    };

    return <OfferContext.Provider value={offers}></OfferContext.Provider>

}