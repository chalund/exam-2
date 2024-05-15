export const calculateDaysDifference = (dateFrom, dateTo) => {
  // Convert dates to milliseconds
  const dateFromMs = new Date(dateFrom).getTime();
  const dateToMs = new Date(dateTo).getTime();

  // Calculate the difference in milliseconds
  const differenceMs = dateToMs - dateFromMs;

  // Convert milliseconds to days
  const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  // Ensure minimum of 1 day
  return Math.max(daysDifference, 1);
};
