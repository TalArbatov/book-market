export default () => {
  const token = localStorage.token;
  let userEmail = null;
  try {
    userEmail = require("jsonwebtoken").decode(localStorage.token).email;
  } catch (e) {
    return false;
  }
  if(userEmail == undefined || userEmail == null)
    return false;
  return true;
};
