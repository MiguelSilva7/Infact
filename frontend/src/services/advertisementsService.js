export const filterTable = (table, filter) => {
  let filteredTable = table.filter(
    (obj) =>
      obj.title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(
          filter.title
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase(),
        ) && obj.salary >= filter.salary,
  );

  return filteredTable;
};
