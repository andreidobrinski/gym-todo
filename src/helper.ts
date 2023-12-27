export const getDiffDays = (completedDate: number) => {
  const currentDate = new Date().getTime();
  const millisecondDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    Math.abs(completedDate - currentDate) / millisecondDay
  );
  return diffDays;
};

/**
 * Returns the pluralized day string with the number
 */
export const getDaysString = (days: number) => {
  if (days === 1) return `${days} day`;
  return `${days} days`;
};
