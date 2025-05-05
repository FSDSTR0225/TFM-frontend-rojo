const API_URL = "http://localhost:3000/offers";

export const getOffers = async () =>{
    try {
        const response = await fetch(API_URL)
        if(!response.ok){
            throw new Error("Error getting offers")
        }
        const offersData = await response.json()
        console.log("🚀 ~ getOffers ~ offersData:", offersData)
        return offersData
    } catch (error) {
        console.error("OffersService Error:", error);
        throw error;
    }
        
}

export const getOffersById = async (_id) => {
try {
    const response = await fetch(API_URL + '/' + _id)
    if(!response.ok){
        throw new Error("Error getting offer")
    }
    const offerData = await response.json()
    console.log("🚀 ~ getOffersById ~ offerData:", offerData)
    return offerData
} catch (error) {
    console.error("OffersService Error:", error);
        throw error;
}
}