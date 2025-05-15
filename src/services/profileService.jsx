const urlBackEnd = 'http://localhost:3000';

export const getProfileDev = async (_id) => {
    try {
        const response = await fetch(urlBackEnd + `/devs/${_id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log("Data: "+ data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getRecruiterById = async (_id) =>{
    try {
        const response = await fetch(`${urlBackEnd}/recruiters/${_id}`)
        if(!response.ok){
            throw new Error("Error getting user")
        }
        const recruiterData = await response.json()
        console.log("🚀 ~ getRecruiterById ~ recruiterData:", recruiterData)
        
        return recruiterData
    } catch (error) {
        console.error("profileService Error:", error);
        throw error;
    }
        
}