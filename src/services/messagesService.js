const urlBackEnd = 'http://localhost:3000/messages';

export const getUsers = async (token) => {
    const resp = await fetch(urlBackEnd + '/users', {
        method: 'GET',
        headers: {
            authorization: "Bearer " + token,
        }
    });
    if (!resp.ok) {
        throw new Error("Error getting users");
    }
    const data = await resp.json();
    return data;
}

export const getMessages = async (token, userId) => {
    console.log("userId", userId);
    const messages = await fetch(`${urlBackEnd}/${userId}`, {
        method: 'GET',
        headers: {
            authorization: "Bearer " + token
        }
    })
    const data = await messages.json();
    return data;
}

export const sendMessage = async (token, text, image, selectedUserId) => {
    const resp = await fetch(urlBackEnd + `/send/${selectedUserId}`, {
        method: 'POST',
        headers: {
            authorization: "Bearer " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text,image})
    });
    if (!resp.ok) {
        throw new Error("Error sending message");
    }
    const data = await resp.json();
    return data;
}


