export default date => {
  let dateString = "";

  

  if (date != null && date != undefined) {
    console.log(date);
    const m = new Date(date);
    let month = m.getMonth() + 1;
    if(month.toString().length == 1)
      month = '0' + month;
    let day = m.getDate();
    if(day.toString().length == 1)
      day = '0' + day;
    dateString = day + '/' + month + '/' + m.getFullYear();
  }
  return dateString;
};
