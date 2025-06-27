const BASE_URL = import.meta.env.VITE_BASE_URL;
const urlBackEnd = `${BASE_URL}`;

// Obtener experiencias por developer
export async function getExperiencesByDeveloper(developerId, token) {
  try {
    const res = await fetch(urlBackEnd + `/experiences/owner/${developerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch experiences by developer:", error);
    return { error: true, message: "Request failed" };
  }
}

export async function softDeleteExperience(id, token) {
  try {
    const res = await fetch(`${urlBackEnd}/experiences/${id}/soft-delete`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to soft delete experience:", error);
    return { error: true, message: "Fallo en la solicitud" };
  }
}

export const createExperience = async (payload, token) => {
  try {
    const resp = await fetch(urlBackEnd + "/experiences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) throw new Error("Error saving the experience");

    const experience = await resp.json();
    console.log("Respuesta del backend (createExperience):", experience);
    return experience;
  } catch (error) {
    console.error("Failed to create experience:", error);
    return { error: true, message: error.message };
  }
};

export const updateExperience = async (id, payload, token) => {
  try {
    const resp = await fetch(`${urlBackEnd}/experiences/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) throw new Error("Error updating the experience");

    const experience = await resp.json();
    console.log("Respuesta del backend (updateExperience):", experience);
    return experience;
  } catch (error) {
    console.error("Failed to update experience:", error);
    return { error: true, message: error.message };
  }
};
