function getCurrentDate() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month_ = date.getMonth() + 1;
  const Year = date.getFullYear();
  const month = month_.toString().padStart(2, '0');

  return `${Year}-${month}-${day}`;
}

export default {
  getCurrentDate
};