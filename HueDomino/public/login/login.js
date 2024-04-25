document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  axios.post('http://localhost:3000/login', {
    username: username,
    password: password
  })
  .then(function (response) {
    if (response.status === 200) {
      // Login riuscito
      console.log('Login riuscito');
      window.location.href = '../index.html';
      // Qui potresti reindirizzare l'utente alla pagina principale, ad esempio:
      // window.location.href = '/home.html';
    } else {
      // Login fallito
      console.log('Login fallito');
    }
  })
  .catch(function (error) {
    console.error('Errore:', error);
  });
});