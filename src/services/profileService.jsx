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

export const updateProfile = async (devProfile,token) => {
    try {
        const resp = await fetch(urlBackEnd + '/profile',{
            method:'PUT',
            headers:{
                 authorization: "Bearer " + token,
                'content-type':'application/json'
            },
            body:JSON.stringify(devProfile)
        });
        if(!resp.ok){
            throw new Error("Error editing the devProfile")
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }};