export const titleCase = (str) => {

  str = str === 'success' ? 'exito' : str;
  return str ? str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase()) : null;

}

export const formatDate = (dt) => {
  return `${dt.getFullYear().toString().padStart(4, '0')}`
}

export const dateHourStringToDate = (dt) => {
  const date = new Date(dt);
  return formatDate(date);
}