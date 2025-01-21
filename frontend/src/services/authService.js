export const loginService = async (email, password) => {
  const response = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  const data = await response.json();
  return data;
};

export const register = async (username, email, password, role) => {
  const response = await fetch("http://localhost:3001/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, role }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error.message || "Something went wrong");
  }

  return await response.json();
};
