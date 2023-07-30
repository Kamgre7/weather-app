const MIN_LAT = -90;
const MAX_LAT = 90;
const MIN_LON = -180;
const MAX_LON = 180;

export const validateLat = (lat: string): boolean => {
  const numericValue = parseFloat(lat);

  return (
    !isNaN(numericValue) && numericValue >= MIN_LAT && numericValue <= MAX_LAT
  );
};

export const validateLon = (lon: string): boolean => {
  const numericValue = parseFloat(lon);

  return (
    !isNaN(numericValue) && numericValue >= MIN_LON && numericValue <= MAX_LON
  );
};
