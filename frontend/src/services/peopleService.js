import { handleHTTPRequestError } from "./genericService";

export const getPersonByEmail = async (email, token) => {
  try {
    const response = await fetch(
      `http://localhost:3001/person/email/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      handleHTTPRequestError(response);
    }
  } catch (error) {
    console.log(`Network Error: ${error}`);
  }
};
