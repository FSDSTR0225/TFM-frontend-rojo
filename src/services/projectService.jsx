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
