const parseNumber = (value, defaultValue) => {
  if (typeof value === "undefined") {
    return defaultValue;
  }

  const parsedValue = parseInt(value, 6);

  return Number.isNaN(parsedValue) ? defaultValue : parsedValue;
};

export const parsePaginationParams = (query) => {
  return {
    page: parseNumber(query.page, 1),
    perPage: parseNumber(query.perPage, 6),
  };
};
