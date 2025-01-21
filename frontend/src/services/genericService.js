export const deleteById = async (table, id, token) => {
  try {
    const response = await fetch(`http://localhost:3001/${table}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Erreur ${response.status}: Impossible de supprimer l'élément avec l'ID ${id} dans la table ${table}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la suppression :", error.message);
  }
};

export const updateById = async (table, id, obj, token) => {
  try {
    if (obj.created_at) {
      obj.created_at = new Date(obj.created_at)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    }
    const response = await fetch(`http://localhost:3001/${table}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(
        `Erreur ${response.status}: Impossible de modifier l'élément avec l'ID ${id} dans la table ${table}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la suppression :", error.message);
  }
};

export const getById = async (table, id, token) => {
  try {
    const response = await fetch(`http://localhost:3001/${table}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Erreur ${response.status}: Impossible de récupérer l'élément dans la table ${table}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la requête :", error.message);
    return { error: error.message };
  }
};

export const getAll = async (table, token) => {
  try {
    const response = await fetch(`http://localhost:3001/${table}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Erreur ${response.status}: Impossible de récupérer les éléments dans la table ${table}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la requête :", error.message);
    return { error: error.message };
  }
};

export const insert = async (table, obj, token) => {
  try {
    const response = await fetch(`http://localhost:3001/${table}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
    });
    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      handleHTTPRequestError(response);
    }
  } catch (error) {
    console.log("Erreur:", error);
  }
};

export const filterAdmin = (table, filter) => {
  let filteredTable = table.filter((obj) =>
    Object.values(obj).some((value) =>
      String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(
          filter.title
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase(),
        ),
    ),
  );

  return filteredTable;
};

export const handleHTTPRequestError = (response) => {
  switch (response.status) {
    case 404:
      console.log("Error 404: Not Found");
      break;
    case 500:
      console.log("Error 500: Servor Error");
      break;
    default:
      console.log(`Unexpected Error: ${response.status}`);
  }
};
