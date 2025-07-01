const BASE_URL = import.meta.env.VITE_BASE_URL;
const urlBackEnd = `${BASE_URL}/messages`;

export const getUsers = async (token) => {
  const resp = await fetch(urlBackEnd + "/users", {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  if (!resp.ok) {
    throw new Error("Error getting users");
  }
  const data = await resp.json();
  return data;
};

export const getMessages = async (token, userId) => {
  console.log("userId", userId);
  const messages = await fetch(`${urlBackEnd}/${userId}`, {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  const data = await messages.json();
  return data;
};

export const sendMessage = async (token, text, image, selectedUserId) => {
  const resp = await fetch(urlBackEnd + `/send/${selectedUserId}`, {
    method: "POST",
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, image }),
  });
  if (!resp.ok) {
    throw new Error("Error sending message");
  }
  const data = await resp.json();
  return data;
};

export const suscribeToMessages = (userId, socket, setMessages, notifications, setNotifications) => {
  if (!userId || !socket) return null;

  const handler = (msg) => {
    const isFromSelectedUser = msg.senderId === userId;
    if (isFromSelectedUser) {
      if (!notifications.includes(msg)) {
        setNotifications((prev) => {
          const alreadyExists = prev.some((n) => n._id === msg._id);
          if (!alreadyExists) {
            return [msg, ...prev];
          }
          return prev;
        });
      }
      setMessages((prev) => [...prev, msg]);
    }
  };

  socket.on("newMessage", handler);

  return handler; // 👈 devolvemos el handler real
};

export const unsubscribeFromMessages = (socket, handler) => {
  if (!socket || !handler) return;
  socket.off("newMessage", handler);
};
