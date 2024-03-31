export function getTime(timeString: string): string {
  const [hours, mins] = timeString.split(":");

  if (parseInt(hours) < 10) {
    let hour = hours.split("").pop();
    return `${hour}:${mins}`
  }

  return timeString
}

export function to24HourFormat(time12h: string): string {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12);
  }
  return `${hours}:${minutes}`;
}

export function to12HourFormat(time24h: string): string {
  let [hours, minutes] = time24h.split(':').map(Number);
  const modifier = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${modifier}`;
}
