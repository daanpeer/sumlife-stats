
const isLeapYear = (date) => {
  const year = date.getFullYear();
  if((year & 3) !== 0) return false;
  return ((year % 100) !== 0 || (year % 400) === 0);
};

export const getDayOfYear = (date) => {
  const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const mn = date.getMonth();
  const dn = date.getDate();
  let dayOfYear = dayCount[mn] + dn;
  if(mn > 1 && isLeapYear(date)) dayOfYear++;
  return dayOfYear;
};
