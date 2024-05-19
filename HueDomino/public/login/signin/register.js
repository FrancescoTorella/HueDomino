$(document).ready(function() {
  $('#registerForm').on('submit', function(event) {
    event.preventDefault();

    // Clear error messages
    $('#usernameError').text('');
    $('#emailError').text('');
    $('#passwordError').text('');

    const username = $('#username').val();
    const password = $('#password').val();
    const email = $('#email').val();

    $.ajax({
      url: 'http://localhost:3000/register',
      type: 'POST',
      data: JSON.stringify({
        username: username,
        password: password,
        email: email
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(response) {
        // Registrazione riuscita
        console.log('Registrazione riuscita');
        window.location.href = '/';
        // Qui potresti reindirizzare l'utente alla pagina di login, ad esempio:
        // window.location.href = '/login.html';
      },
      error: function(error) {
        if (error.status === 400) {
          // Show an error message based on the error message from the server
          if (error.responseJSON.message === 'Invalid email format') {
            $('#emailError').text('Invalid email format');
          } else if (error.responseJSON.message === 'Password must be at least 8 characters') {
            $('#passwordError').text('Password must be at least 8 characters');
          } else {
            console.log(error.responseJSON.message);
          }
        } else {
          // Registrazione fallita
          console.log('Registrazione fallita');
        }
      }
    });
  });

  $('#goBackIcon').click(function() {
    window.location.href = '/login';
  });
});