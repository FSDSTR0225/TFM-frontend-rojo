const BASE_URL = import.meta.env.VITE_BASE_URL;
const urlBackEnd = `${BASE_URL}`;

export const getAllProjects = async () => {
  try {
    const resp = await fetch(urlBackEnd + "/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();
    //console.log("data: ", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return { error: true, message: error.message };
  }
};

export const createProject = async (payload, token) => {
  try {
    const resp = await fetch(urlBackEnd + "/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) throw new Error("Error saving the project");

    const project = await resp.json();
    // console.log("Respuesta del backend (createProject):", project);
    return project;
  } catch (error) {
    console.error("Failed to create project:", error);
    return { error: true, message: error.message };
  }
};

export const getProjectById = async (_id, token) => {
  try {
    const resp = await fetch(`${urlBackEnd}/projects/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return { error: true, message: error.message };
  }
};

export const getProjectsByDeveloper = async (developerId) => {
  try {
    const resp = await fetch(
      `${urlBackEnd}/projects/developer/${developerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || "Error in fetch");
    }

    const data = await resp.json();
    return { projects: Array.isArray(data) ? data : [] };
  } catch (error) {
    console.error("Failed to fetch projects by developer:", error);
    return { error: true, message: error.message };
  }
};

export async function softDeleteProject(id, token) {
  try {
    const res = await fetch(`${urlBackEnd}/projects/${id}/soft-delete`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to soft delete project:", error);
    return { error: true, message: "Fallo en la solicitud" };
  }
}

export const updateProject = async (id, data, token) => {
  try {
    const res = await fetch(`${urlBackEnd}/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const toggleProjectLike = async (projectId, token) => {
  try {
    const resp = await fetch(`${urlBackEnd}/projects/${projectId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.message || "Failed to toggle like");
    }

    const data = await resp.json();
    // data debería tener liked, likesCount o incluso el proyecto completo actualizado
    return data;
  } catch (error) {
    console.error("Failed to toggle like:", error);
    throw error;
  }
};

export const getProjectLikeStatus = async (projectId, token) => {
  try {
    const resp = await fetch(
      `${urlBackEnd}/projects/${projectId}/like-status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.message || "Failed to fetch like status");
    }

    const data = await resp.json();
    // data debe incluir al menos { liked: true/false }
    return data;
  } catch (error) {
    console.error("Failed to get like status:", error);
    throw error;
  }
};

//Función para obtener los views de cada proyecto

const VIEW_COOLDOWN_MS = 60 * 60 * 1000; // 1 hora

export const incrementProjectView = async (projectId) => {
  try {
    // Revisar timestamp guardado en localStorage
    const lastViewTimestamp = localStorage.getItem(`lastView_${projectId}`);
    const now = Date.now();

    if (
      lastViewTimestamp &&
      now - Number(lastViewTimestamp) < VIEW_COOLDOWN_MS
    ) {
      // Ya se incrementó view recientemente, no hacer nada
      return null;
    }

    // Si no hay registro o ya pasó el cooldown, hacemos la petición
    const response = await fetch(`${urlBackEnd}/projects/${projectId}/view`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Error incrementando views");

    // Guardar timestamp de esta vista para el cooldown
    localStorage.setItem(`lastView_${projectId}`, now.toString());

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
