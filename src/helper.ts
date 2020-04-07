export const getDiffDays = (completedDate: number) => {
  const currentDate = new Date().getTime();
  const millisecondDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(
    Math.abs(completedDate - currentDate) / millisecondDay
  );
  return diffDays;
};
