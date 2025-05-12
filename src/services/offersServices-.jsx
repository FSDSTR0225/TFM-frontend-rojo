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

export const createdOffert = async (offert,token) => {
    try {
        const resp = await fetch(API_URL + '/',{
            method:'POST',
            headers:{
                 authorization: "Bearer " + token,
                'content-type':'application/json'
            },
            body:JSON.stringify(offert)
        });
        if(!resp.ok){
            throw new Error("Error created offers")
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }


}
