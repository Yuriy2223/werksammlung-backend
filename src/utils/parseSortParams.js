const parseSortBy = (value) => {
  if (typeof value === "undefined") {
    return "createdAt";
  }

  const keys = ["_id", "author", "technologies", "date", "title", "createdAt"];

  if (!keys.includes(value)) {
    return "createdAt";
  }

  return value;
};

const parseSortOrder = (value) => {
  if (typeof value === "undefined") {
    return "desc";
  }

  return value === "desc" ? "desc" : "asc";
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  return {
    sortBy: parseSortBy(sortBy),
    sortOrder: parseSortOrder(sortOrder),
  };
};
