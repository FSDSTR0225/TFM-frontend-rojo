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