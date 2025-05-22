const API_URL = "http://localhost:3000/offers";

export const getOffers = async () => {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
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

export const getOffersbyOwner = async (ownerId) => {
    try {
        const response = await fetch(`${API_URL}/profile/${ownerId}`)
        if (!response.ok) {
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
        const response = await fetch(`${API_URL}/${_id}`);
        if (!response.ok) {
            throw new Error("Error getting offer")
        }
        const offerData = await response.json()
        return offerData
    } catch (error) {
        console.error("OffersService Error:", error);
        throw error;
    }
}

export const deleteOffer = async (id, token) => {
    try {
        const resp = await fetch(`${API_URL}/${id}/delete`, {
            method: 'PATCH',
            headers: {
                authorization: "Bearer " + token,
                'content-type': 'application/json'
            },
        });
        if (!resp.ok) {
            throw new Error("Error delete offers")
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}

export const getSkillsByQuery = async (query) => {
    try {
        const resp = await fetch(`${API_URL}/technology?q=${query}`);
        if (!resp.ok) {
            throw new Error("Error getting skills")
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}

export const createdOffert = async (offert, token) => {
    try {
        const resp = await fetch(API_URL + '/', {
            method: 'POST',
            headers: {
                authorization: "Bearer " + token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(offert)
        });
        if (!resp.ok) {
            throw new Error("Error created offers")
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }


}
export const updateOffert = async (id, offert, token) => {
    try {
        const resp = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                authorization: "Bearer " + token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(offert)
        });
        if (!resp.ok) {
            throw new Error("Error created offers")
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}
export const getRecruitersStats = async (recId) => {
    try {
        const token = localStorage.getItem('token');
        const resp = await fetch(`${API_URL}/stats/${recId}`, {
            method: 'GET',
            headers: {
                authorization: "Bearer " + token,
                'content-type': 'application/json'
            }
        });
        if (!resp.ok) {
            throw new Error("Error getting stats")
        }
        const data = await resp.json();
        console.log("🚀 ~ getRecruitersStats ~ data:", data)
        
        return data;
    } catch (error) {
        console.error("OffersService Error:", error);
        throw error;
    }
}

export const applyToOffer = async (id, token) =>{
    try {
        const response = await fetch(`${API_URL}/${id}/apply`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
            }
        })

        const data = await response.json()
        if(!response.ok) {
            throw Error(data.msg || 'Error applying to the offer')
        }

        return data
    } catch (error) {
        throw new Error(error.message);
        
    }
}
