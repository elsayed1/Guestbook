export const login = async (user) => {
  const response = await fetch(`/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    return Promise.reject(error);
  }
  const token = await response.json();
  return token;
};

export const register = async (user) => {
  let response = await fetch(`/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  response = await response.json();
  return response;
};
