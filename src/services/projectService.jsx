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
    console.log('data: ', data);
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

export const getProjectById = async (_id) => {
  try {
    const resp = await fetch(`${urlBackEnd}/projects/${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch project:', error);
    return { error: true, message: error.message };
  }
};

export const getProjectsByDeveloper = async (developerId) => {
  try {
    const resp = await fetch(
      `${urlBackEnd}/projects/developer/${developerId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );

  if (!resp.ok) {
    const errorData = await resp.json();
    throw new Error(errorData.message || 'Error in fetch');
  }

  const data = await resp.json();
  return { projects: Array.isArray(data) ? data : [] };
  } catch (error) {
  console.error('Failed to fetch projects by developer:', error);
  return { error: true, message: error.message };
  }
};
