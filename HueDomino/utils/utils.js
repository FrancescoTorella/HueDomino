const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

function validateEmail(email) {
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

module.exports = { validateEmail, validatePassword };