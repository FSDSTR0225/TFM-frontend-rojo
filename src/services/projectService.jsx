const urlBackEnd = 'http://localhost:3000';

export const getAllProjects = async () => {
  try {
    const resp = await fetch(urlBackEnd + '/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return { error: true, message: error.message };
  }
};

export const createProject = async (payload, token) => {
  try {
    const resp = await fetch(urlBackEnd + '/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) throw new Error('Error saving the project');

    const project = await resp.json();
    console.log('Respuesta del backend (createProject):', project)
    return project;
  } catch (error) {
    console.error('Failed to create project:', error);
    return { error: true, message: error.message };
  }
};



export const getProjectsByDeveloper = async (developerId, token) => {
  try {
    const resp = await fetch(
      `${urlBackEnd}/projects`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || 'Error en el fetch');
    }

    const data = await resp.json();
    const projectsArray = Array.isArray(data) ? data : (data.projects || []);
    const filtered = projectsArray.filter(p => p.owner?._id === developerId);
    return { projects: filtered };
  } catch (error) {
    console.error('Failed to fetch projects by developer:', error);
    return { error: true, message: error.message };
  }
};
