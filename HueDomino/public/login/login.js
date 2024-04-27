document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Clear error messages
  document.getElementById('loginError').textContent = '';
  document.getElementById('passwordError').textContent = '';

  const usernameOrEmail = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  axios.post('http://localhost:3000/authenticate', {
    username: usernameOrEmail,
    password: password
  })
  .then(response => {
    // Handle success
    console.log('Login riuscito');
    window.location.href = '../index.html';
  })
  .catch(error => {
    if (error.response) {
      // Show the error message returned by the server
      if (error.response.data.message === 'Incorrect password') {
        document.getElementById('passwordError').textContent = error.response.data.message;
      } else if (error.response.data.message === 'Incorrect username or email') {
        document.getElementById('loginError').textContent = error.response.data.message;
      } else {
        console.log(error.response.data.message);
      }
    } else {
      // Handle other errors
      console.error(error);
    }
  });
});