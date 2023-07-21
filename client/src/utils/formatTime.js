function formatTime(timestamp) {
  const date = new Date(timestamp);
  const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000); // 한국 시간대로 변환
  const currentDate = new Date();
  const elapsed = currentDate - koreanTime;

  // 밀리초(ms) 단위로 경과된 시간을 분, 시간, 일, 개월 단위로 계산
  const minutes = Math.floor(elapsed / (1000 * 60));
  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const months = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 30));

  if (months >= 1) {
    return months + '개월 전';
  } else if (days >= 1) {
    return days + '일 전';
  } else if (hours >= 1) {
    return hours + '시간 전';
  } else if (minutes >= 1) {
    return minutes + '분 전';
  } else {
    return '방금 전';
  }
}

export default formatTime;
