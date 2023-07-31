export const validateRangeOfDate = (from: string, to: string): boolean =>
  new Date(to) > new Date(from);

export const dateIsGraterThanCurrentDate = (date: string): boolean =>
  new Date(date) > new Date();
