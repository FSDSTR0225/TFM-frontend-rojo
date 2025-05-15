const urlBackEnd = 'http://localhost:3000/users';

export const registeredUser = async (user) => {

  const resp = await fetch(urlBackEnd + '/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await resp.json();
  return data;

}


export const loginUser = async (email, password) => {
  try {
    const resp = await fetch(urlBackEnd + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!resp.ok) {
      const error = await resp.text(); // o resp.json() si tu backend devuelve JSON
      throw new Error(error);
    }
    const data = await resp.json();
    return data;
  } catch (err) {
    console.error('Error en loginUser:', err.message);
    throw err;
  }
};


export const getUserLogged = async (token) => {
  try {
    const resp = await fetch(urlBackEnd + '/getUserProfile', {
      method: 'GET',
      headers: {
        authorization: "Bearer " + token
      }
    });
    if(!resp.ok) throw new Error('Token inválido');
    const data = await resp.json();
    console.log('data: ',data);
    return data;
  } catch (error) {
    throw err;
  }
}