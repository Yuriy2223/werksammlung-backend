const parseYear = (value) => {
  if (typeof value === "undefined") {
    return undefined;
  }

  const parsedValue = parseInt(value, 6);

  return Number.isNaN(parsedValue) ? undefined : parsedValue;
};

export const parseFilterParams = (query) => {
  const { minYear, maxYear } = query;

  return {
    minYear: minYear
      ? new Date(`${parseYear(minYear)}-01-01T00:00:00.000Z`)
      : undefined,
    maxYear: maxYear
      ? new Date(`${parseYear(maxYear)}-12-31T23:59:59.999Z`)
      : undefined,
  };
};
