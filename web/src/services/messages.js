export const getMessages = async (user) => {
  const token = localStorage.getItem("token");

  let response = await fetch(`/messages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  response = await response.json();
  return response;
};

export const createMessage = async (message) => {
  const token = localStorage.getItem("token");

  let response = await fetch(`/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  response = await response.json();
  return response;
};

export const updateMessage = async ({ messageId, message }) => {
  const token = localStorage.getItem("token");

  let response = await fetch(`/messages/${messageId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  response = await response.json();
  return response;
};

export const deleteMessage = async ({ messageId }) => {
  const token = localStorage.getItem("token");

  let response = await fetch(`/messages/${messageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }

  return response;
};

export const addReplyMessage = async ({ messageId, message }) => {
  const token = localStorage.getItem("token");

  let response = await fetch(`/messages/${messageId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  response = await response.json();
  return response;
};
