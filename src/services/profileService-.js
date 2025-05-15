const urlBackEnd = 'http://localhost:3000';
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