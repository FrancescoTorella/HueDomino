document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear error messages
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
  
    axios.post('http://localhost:3000/register', {
      username: username,
      password: password,
      email: email
    })
    .then(function (response) {
      if (response.status === 201) {
        // Registrazione riuscita
        console.log('Registrazione riuscita');
        window.location.href = '../../index.html';
        // Qui potresti reindirizzare l'utente alla pagina di login, ad esempio:
        // window.location.href = '/login.html';
      } else {
        // Registrazione fallita
        console.log('Registrazione fallita');
      }
    })
    .catch(function (error) {
      if (error.response.status === 400) {
        // Show an error message based on the error message from the server
        if (error.response.data.message === 'Invalid email format') {
          document.getElementById('emailError').textContent = 'Invalid email format';
        } else if (error.response.data.message === 'Password must be at least 8 characters') {
          document.getElementById('passwordError').textContent = 'Password must be at least 8 characters';
        } else {
          console.log(error.response.data.message);
        }
      } else if (error.response.status === 409) {
        // Show an error message based on the error message from the server
        if (error.response.data.message === 'Username already in use') {
          document.getElementById('usernameError').textContent = 'Username already in use';
        } else if (error.response.data.message === 'Email already in use') {
          document.getElementById('emailError').textContent = 'Email already in use';
        } else {
          console.log(error.response.data.message);
        }
      } else {
        console.error("Other error");
      }
    });
  });