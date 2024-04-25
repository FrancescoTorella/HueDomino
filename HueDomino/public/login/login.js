document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Clear error messages
  document.getElementById('loginError').textContent = '';

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  axios.post('http://localhost:3000/login', {
    username: username,
    password: password
  })
  .then(response => {
    // Handle success
      console.log('Login riuscito');
      window.location.href = '../index.html';
  })
  .catch(error => {
    if (error.response.status === 401) {
      // Show an error message
      document.getElementById('loginError').textContent = 'Incorrect username or password';
    } else {
      // Handle other errors
    }
  });
});