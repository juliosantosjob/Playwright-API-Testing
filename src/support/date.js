function getCurrentDate() {
  const actualDate = new Date();
  const day = actualDate.getDate().toString().padStart(2, '0');
  const month_ = actualDate.getMonth() + 1;
  const Year = actualDate.getFullYear();
  const month = month_.toString().padStart(2, '0');

  return `${Year}-${month}-${day}`;
}

export default {
  getCurrentDate
};