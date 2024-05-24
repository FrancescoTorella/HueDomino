$(document).ready(function() {
  $('#loginForm').on('submit', function(event) {
    event.preventDefault();
    $('#loginError').text('');
    $('#passwordError').text('');

    const usernameOrEmail = $('#username').val();
    const password = $('#password').val();

    $.ajax({
      url: 'http://localhost:3000/authenticate',
      type: 'POST',
      data: JSON.stringify({
        username: usernameOrEmail,
        password: password
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function() {
        console.log('Login effettuato con successo');
        window.location.href = '/';
      },
      error: function(error) {
        if (error.responseJSON) {
          if (error.responseJSON.message === 'Incorrect password') {
            $('#passwordError').text(error.responseJSON.message);
          } else if (error.responseJSON.message === 'Incorrect username or email') {
            $('#loginError').text(error.responseJSON.message);
          } else {
            console.log(error.responseJSON.message);
          }
        } else {
          console.error(error);
        }
      }
    });
  });

  $('#goBackIcon').click(function() {
    window.location.href = '/';
  });
});