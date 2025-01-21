export const checkIfPersonAlreadyApplied = async (advId, personId, token) => {
  try {
    const response = await fetch(
      `http://localhost:3001/job_application/check_person/${advId}/${personId}`,
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
      switch (response.status) {
        case 500:
          console.log("Error 500: Servor Error");
          break;
        default:
          console.log(`Unexpected Error: ${response.status}`);
      }
    }
  } catch (error) {
    console.log(`Network Error: ${error}`);
  }
};

export const checkIfUserAlreadyApplied = async (advId, userId, token) => {
  try {
    const response = await fetch(
      `http://localhost:3001/job_application/check_user/${advId}/${userId}`,
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
      switch (response.status) {
        case 500:
          console.log("Error 500: Servor Error");
          break;
        default:
          console.log(`Unexpected Error: ${response.status}`);
      }
    }
  } catch (error) {
    console.log(`Network Error: ${error}`);
  }
};
