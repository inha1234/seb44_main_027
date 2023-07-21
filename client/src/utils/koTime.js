function koTime(utcTime) {
  const date = new Date(utcTime);
  const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  // 한국 시간 형식으로 변환
  const year = koreanTime.getFullYear();
  const month = String(koreanTime.getMonth() + 1).padStart(2, '0');
  const day = String(koreanTime.getDate()).padStart(2, '0');
  let hours = koreanTime.getHours();
  const minutes = String(koreanTime.getMinutes()).padStart(2, '0');
  let meridiem = '오전';

  if (hours >= 12) {
    meridiem = '오후';
    hours %= 12;
  }

  hours = String(hours).padStart(2, '0');

  return `${year}-${month}-${day} ${meridiem} ${hours}:${minutes}`;
}

export default koTime;
