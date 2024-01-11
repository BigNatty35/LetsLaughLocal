export function formatTime(time: Date) {
  if (!time) {
    return "";
  }
  const startHour = (time.getHours() % 12).toString();
  const startMin = time.getMinutes() > 0 ? time.getMinutes().toString() : "00"
  
  return {
    startHour, startMin
  }
}