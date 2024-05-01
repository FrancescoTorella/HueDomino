$(document).ready( async function() {

    let ID_UTENTE;

    const sessionId = document.cookie.split(';').find(item => item.trim().startsWith('sessionId='));
        
    if (sessionId) {
        // Estrai l'ID della sessione dal cookie
        const sessionIdValue = sessionId.split('=')[1];

        try {
        // Fai una richiesta al server per ottenere i dettagli della sessione
        const response = await fetch('/session/' + sessionIdValue);
        const session = await response.json();

        // Stampa i dettagli della sessione sulla console
        
        ID_UTENTE = session.user_id;
        } catch (error) {
            console.error('Error:', error);
        }
        console.log('Il cookie sessionId è stato trovato');
    } else {
        console.log('Il cookie sessionId non è stato trovato');
    }

    // Fai una richiesta al server per ottenere i dettagli dell'utente
    const response = await fetch('/utente/' + ID_UTENTE);
    const user = await response.json();

    // Stampa i dettagli dell'utente sulla console
    console.log(user);

    // Mostra i dettagli dell'utente nella pagina
    $('#profileName').text(user.username);
    $('#profileDescription').text(user.description);
    $('#profileImage').attr('src', user.path_to_profile_picture);
    $('.profile-image-settings').css('background-image', 'url(' + user.path_to_profile_picture + ')');

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

    

});

    