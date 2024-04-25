document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    axios.post('http://localhost:3000/register', {
      username: username,
      password: password
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
      if (error.response && error.response.status === 409) {
        // Username già esistente
        console.log('Username già esistente');
      } else {
        console.error('Errore:', error);
      }
    });
  });