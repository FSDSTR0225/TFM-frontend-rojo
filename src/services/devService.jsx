const urlBackEnd = 'http://localhost:3000';

export const getAllDevelopers = async () => {
  try {
    const resp = await fetch(urlBackEnd + '/devs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch developers:', error);
    return { error: true, message: error.message };
  }
};