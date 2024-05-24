$(document).ready(function() {
  $('#registerForm').on('submit', function(event) {
    event.preventDefault();

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
        console.log('La registrazione è avvenuta con successo!');
        window.location.href = '/';
      },
      error: function(error) {
        if (error.status === 400) {
          if (error.responseJSON.message === 'Invalid email format') {
            $('#emailError').text('Invalid email format');
          } else if (error.responseJSON.message === 'Password must be at least 8 characters') {
            $('#passwordError').text('Password must be at least 8 characters');
          } 
          else {
            console.log(error.responseJSON.message);
          }
        } else if (error.status === 409){
          if(error.responseJSON.message === 'Username already in use'){
            $('#usernameError').text('Username gia in uso');
          }else if(error.responseJSON.message === 'Email already in use'){
            $('#emailError').text('Email gia in uso');
          }
        } else {
          console.log('Registrazione fallita');
        }
      }
    });
  });

  $('#goBackIcon').click(function() {
    window.location.href = '/login';
  });
});