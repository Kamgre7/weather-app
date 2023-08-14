export const getFutureDateString = (days: number) => {
  const date = new Date();
  date.setDate(new Date().getDate() + days);

  return date.toISOString().split('T')[0];
};
