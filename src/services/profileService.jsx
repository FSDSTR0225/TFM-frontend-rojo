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
