const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/offers`;
export const getOffers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error getting offers");
    }
    const offersData = await response.json();
   
    return offersData;
  } catch (error) {
    console.error("OffersService Error:", error);
    throw error;
  }
};

export const getOffersbyOwner = async (ownerId) => {
  try {
    const response = await fetch(`${API_URL}/profile/${ownerId}`);
    if (!response.ok) {
      throw new Error("Error getting offers");
    }
    const offersData = await response.json();
  
    return offersData;
  } catch (error) {
    console.error("OffersService Error:", error);
    throw error;
  }
};

export const getOffersById = async (_id) => {
  try {
    const response = await fetch(`${API_URL}/${_id}`);
    if (!response.ok) {
      throw new Error("Error getting offer");
    }
    const offerData = await response.json();
    return offerData;
  } catch (error) {
    console.error("OffersService Error:", error);
    throw error;
  }
};

export const deleteOffer = async (id, token) => {
  try {
    const resp = await fetch(`${API_URL}/${id}/delete`, {
      method: "PATCH",
      headers: {
        authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    });
    if (!resp.ok) {
      throw new Error("Error delete offers");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error: ", error.message);
    throw error;
  }
};

export const getSkillsByQuery = async (query) => {
  try {
    const resp = await fetch(`${API_URL}/technology?q=${query}`);
    if (!resp.ok) {
      throw new Error("Error getting skills");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const getAllSkills = async () => {
  try {
    const response = await fetch(`${API_URL}/allskills`);
    if (!response.ok) throw new Error("Error al cargar habilidades");
    return await response.json();
  } catch (error) {
    console.error("Error en getAllSkills:", error);
    return []; // Devuelve array vacío si hay error
  }
};

export const createdOffert = async (offert, token) => {
  try {
    const resp = await fetch(API_URL + "/", {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "content-type": "application/json",
      },
      body: JSON.stringify(offert),
    });
    if (!resp.ok) {
      throw new Error("Error created offers");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
export const updateOffert = async (id, offert, token) => {
  try {
    const resp = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + token,
        "content-type": "application/json",
      },
      body: JSON.stringify(offert),
    });
    if (!resp.ok) {
      throw new Error("Error created offers");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
export const getRecruitersStats = async (recId) => {
  try {
    const token = localStorage.getItem("token");
    const resp = await fetch(`${API_URL}/stats/${recId}`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    });
    if (!resp.ok) {
      throw new Error("Error getting stats");
    }
    const data = await resp.json();
    console.log("🚀 ~ getRecruitersStats ~ data:", data);

    return data;
  } catch (error) {
    console.error("OffersService Error:", error);
    throw error;
  }
};

export const applyToOffer = async (id, applicationData, token) => {
  try {
    const response = await fetch(`${API_URL}/${id}/apply`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(applicationData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw Error(data.msg || "Error applying to the offer");
    }

    console.log("🚀 ~ applyToOffer ~ data:", data);

    return {
      msg: data.msg || "Application successful",
      offer: data.offer, // Debe incluir la oferta actualizada con el nuevo applicants array
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCandidatesByOfferId = async (offerId, token) => {
  try {
    const response = await fetch(`${API_URL}/${offerId}/candidates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const updateCandidateStatus = async (
  offerId,
  candidateId,
  status,
  token
) => {
  try {
    const response = await fetch(
      `${API_URL}/${offerId}/candidates/${candidateId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify({ status }),
      }
    );
    if (!response.ok) {
      throw new Error("Error updating candidate status");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("OffersService Error:", error);
    throw error;
  }
};

export const getOffersAppliedByDeveloper = async (developerId, token) => {
  try {
    const response = await fetch(`${API_URL}/applied/${developerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw new Error("Error getting offers");
    }
    const offersData = await response.json();
    console.log("🚀 ~ getOffers ~ offersData:", offersData);
    return offersData.offers || [];
  } catch (error) {
    console.error("OffersService Error:", error);
    throw error;
  }
};

export const getOffersByDeveloper = async (token) => {
  try {
    const response = await fetch(`${API_URL}/bydev`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      const errorData = await response.text(); // Para ver el error específico
      console.error("Error response:", errorData);
      throw new Error(
        `Error getting offers: ${response.status} ${response.statusText}`
      );
    }
    const offersData = await response.json();
    console.log("🚀 ~ getOffers ~ offersData:", offersData);
    return offersData.offers || [];
  } catch (error) {
    console.error("OffersService Error:", error);
    throw error;
  }
};
export const getOffersAppliedByDev = async (devId, token) => {
  try {
    const response = await fetch(`${API_URL}/applied/${devId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener las ofertas aplicadas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("OffersService Error:", error);
    throw error;
  }
};

export const getCoverLetter = async (offerId, userId) => {
  try {
    const response = await fetch(
      `${API_URL}/cover-letter/${offerId}/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error downloading PDF");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    let filename = "cover-letter.pdf";
    const disposition = response.headers.get("Content-Disposition");

    // DEBUG: Log para verificar qué está recibiendo el frontend
    console.log("🔍 Cover Letter Debug:");
    console.log("Headers disponibles:", [...response.headers.entries()]);
    console.log("Content-Disposition header:", disposition);

    if (disposition && disposition.includes("filename=")) {
      // Mejorar la regex para capturar correctamente el filename
      const filenameMatch = disposition.match(/filename="([^"]+)"/); // Para filename="nombre.pdf"
      const filenameStarMatch = disposition.match(/filename=([^;]+)/); // Para filename=nombre.pdf (sin comillas)

      console.log("filenameMatch:", filenameMatch);
      console.log("filenameStarMatch:", filenameStarMatch);

      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
        console.log("✅ Filename extraído (con comillas):", filename);
      } else if (filenameStarMatch && filenameStarMatch[1]) {
        filename = filenameStarMatch[1].replace(/"/g, ""); // Remover comillas si las hay
        console.log("✅ Filename extraído (sin comillas):", filename);
      }
    } else {
      console.log(
        "❌ No se encontró Content-Disposition o filename en el header"
      );
    }

    console.log("📁 Filename final para descarga:", filename);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("OffersService Error:", error);
    throw error;
  }
};
