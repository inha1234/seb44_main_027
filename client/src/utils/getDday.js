export function getDDay(targetTime) {
  const targetDate = new Date(targetTime);
  const now = new Date();

  targetDate.setHours(targetDate.getHours() + 9);

  const timeDifference = targetDate - now;
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const dDay = Math.ceil(timeDifference / oneDayInMillis);

  return dDay;
}
