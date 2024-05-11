import { getSessionCookie } from './utils.js';

$(document).ready( async function() {

    let ID_UTENTE = await getSessionCookie();

    $('#foto-profilo').on('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function() {
                $('.profile-image-settings').css('background-image', 'url(' + reader.result + ')');
                
                const formData = new FormData($('#uploadProfileImageForm')[0]);
                formData.append('user-id', ID_UTENTE);

                $.ajax({
                    url: '/upload-profile-image/' + ID_UTENTE,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        console.log(response);
                        location.reload();
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(textStatus, errorThrown);
                    }
                });
            }
            reader.readAsDataURL(file);
        }
    });

    $('#descrizione').on('change', function() {
        var descrizione = $(this).val();

    
        $.ajax({
            url: '/update-description/' + ID_UTENTE,
            type: 'POST',
            data: { description: descrizione},
            success: function(response) {
                console.log(response);
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });

    $('#updateUsername').on('submit', function(e) {
        e.preventDefault();

        //Rimuovi eventuali errori precedenti
        $('#usernameError').text('');
        $('#passwordErrorInUpdateUsername').text('');
    
        var username = $('#username').val();
        var password = $('#passwordForUsername').val();
    
        $.ajax({
            url: '/update-username/' + ID_UTENTE,
            type: 'POST',
            data: { 
                username: username,
                password: password
            },
            success: function(response) {
                console.log(response);
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if(jqXHR.status == 409){
                    $('#usernameError').text('Username già in uso');
                }else if(jqXHR.status == 401){
                    $('#passwordErrorInUpdateUsername').text('Password errata');
                }else{
                    console.log(textStatus, errorThrown);
                }
            }
        });
    });

    $('#updatePassword').on('submit', function(e) {
        e.preventDefault();

        //Rimuovi eventuali errori precedenti
        $('#oldPasswordError').text('');
        $('#newPasswordError').text('');
    
        var oldPassword = $('#oldPassword').val();
        var newPassword = $('#newPassword').val();
    
        $.ajax({
            url: '/update-password/' + ID_UTENTE,
            type: 'POST',
            data: { 
                oldPassword: oldPassword,
                newPassword: newPassword
            },
            success: function(response) {
                console.log(response);
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if(jqXHR.status == 400){
                    $('#newPasswordError').text('La password deve contenere almeno 8 caratteri');
                }else if(jqXHR.status == 401){
                    $('#oldPasswordError').text('Password errata');
                }else{
                    console.log(textStatus, errorThrown);
                }
            }
        });
    });

    $('#updateEmail').on('submit', function(e) {
        e.preventDefault();

        //Rimuovi eventuali errori precedenti
        $('#emailError').text('');
        $('#passwordErrorInUpdateEmail').text('');

    
        var email = $('#email').val();
        var password = $('#passwordForEmail').val();
    
        $.ajax({
            url: '/update-email/' + ID_UTENTE,
            type: 'POST',
            data: { 
                email: email,
                password: password
            },
            success: function(response) {
                console.log(response);
                location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if(jqXHR.status == 409){
                    $('#emailError').text('Email già in uso');
                }else if(jqXHR.status == 401){
                    $('#passwordErrorInUpdateEmail').text('Password errata');
                }else if(jqXHR.status == 400){
                    $('#emailError').text('Formato email non valido');
                }
                else{
                    console.log(textStatus, errorThrown);
                }
            }
        });
    });

    $('#addFriendForm').on('submit', function(e) {
        e.preventDefault();

        //Rimuovi eventuali errori precedenti
        $('#friendError').text('');
    
        var friendUsername = $('#friendUsername').val();
        var userId = ID_UTENTE;
    
        $.ajax({
            url: '/add-friend',
            type: 'POST',
            data: { 
                friendUsername: friendUsername,
                userId: userId
            },
            success: function(data) {
                console.log(data);
                location.reload();
                // Aggiorna l'interfaccia utente qui
            },
            error:  function(jqXHR, textStatus, errorThrown) {
                if(jqXHR.status == 409){
                    $('#friendError').text('Utente già presente tra gli amici');
                }else if(jqXHR.status == 404){
                    $('#friendError').text('L\'utente non esiste');
                }else{
                    console.log(textStatus, errorThrown);
                }
            }
        });
    });

    

    $(document).on('click', '#confirmButton',  function(e) {
        e.preventDefault();
        var action = $(this).attr('data-action');

        if(action.startsWith('removeFriend')) {
            var friendId = action.substring('removeFriend'.length);
            console.log(friendId);
            var userId = ID_UTENTE;
        
            $.ajax({
                url: '/remove-friend',
                type: 'POST',
                data: { 
                    friendId: friendId,
                    userId: userId
                },
                success: function(data) {
                    location.reload();
                    // Aggiorna l'interfaccia utente qui
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        }else if(action === 'logout'){
            document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.href = '/';
        }

    });







});