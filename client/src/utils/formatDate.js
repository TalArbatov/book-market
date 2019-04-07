export default date => {
  let dateString = ''
  if(date != null && date!=undefined) {
  console.log(date)
  const m = new Date(date)
  dateString =
    m.getFullYear() +
    "/" +
    (m.getMonth() + 1) +
    "/" +
    m.getDate() +
    " " +
    m.getHours() +
    ":" +
    m.getMinutes() +
    ":" +
    m.getSeconds();
  }
    return dateString
};
