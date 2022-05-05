export const titleCase = (str) =>
  str ? str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase()) : null;

export const formatDate = (dt) => {
  return `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')}`
}

export const dateHourStringToDate = (dt) => {
  const date = new Date(dt);
  return formatDate(date);
}