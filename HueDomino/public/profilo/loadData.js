
import { getSessionCookie } from './utils.js';

$(document).ready( async function() {

    let ID_UTENTE = await getSessionCookie();

   

    // Fai una richiesta al server per ottenere i dettagli dell'utente
    const response = await fetch('/utente/' + ID_UTENTE);
    const user = await response.json();

    // Stampa i dettagli dell'utente sulla console
    console.log(user);

    // Mostra i dettagli dell'utente nella pagina
    $('#profileName').text(user.username);
    $('#profileDescription').text(user.description);
    $('#descrizione').val(user.description);
    $('#username').val(user.username);
    $('#email').val(user.email);
    $('#profileImage').attr('src', user.path_to_profile_picture);
    $('#profileImageSettings').attr('src', user.path_to_profile_picture);

    //richiedi le statistiche dell'utente
    $.ajax({
        url: '/statistiche/' + ID_UTENTE,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Qui puoi utilizzare i dati delle statistiche come preferisci
            // Ad esempio, potresti aggiornare l'interfaccia utente con le nuove statistiche

            $('#livelliSuperati').text(data.livelliSuperati);
            $('#mondiGiocati').text(data.mondiGiocati);
        },
        error: function(error) {
            console.error('Errore:', error);
        }
    });

    //richiedi le informazioni sugli amici dell'utente
    $.ajax({
        url: '/friends/' + ID_UTENTE,
        type: 'GET',
        success: function(friends) {
            // Qui puoi utilizzare i dati sugli amici come preferisci
            // Ad esempio, potresti aggiornare l'interfaccia utente con i nuovi amici
    
            // Supponiamo che 'friends' sia un array di oggetti, con ogni oggetto che rappresenta un amico

            console.log(friends);

            var table = document.getElementById('friendsTable');

            for (var i = 0; i < friends.length; i++) {
                var row = table.insertRow(-1); // Inserisce una nuova riga alla fine della tabella

                var cell1 = row.insertCell(0);
                cell1.innerHTML = `
                    <div class="profile-container">
                        <div class="image-container-in-table">
                            <div class="profile-image-container ">
                                <img class="profile-image" src="${friends[i].fotoProfiloAmico}" alt="Foto del Profilo">
                            </div>
                        </div>
                        <div class="profile-info">
                            <h2>${friends[i].usernameAmico}</h2>
                            <p>${friends[i].descrizioneAmico}</p>
                        </div>
                    </div>
                `;

                var cell2 = row.insertCell(1);
                cell2.innerHTML = ` <p>Livelli superati: <span class="stat-text" id="livelliSuperati">${friends[i].livellisuperati}</span></p><p>Mondi giocati: <span class="stat-text" id="mondiGiocati">${friends[i].mondigiocati}</span></p><p>Numero amici: <span class="stat-text" id="numeroAmici">0</span></p><p>Medaglie vinte: <span class="stat-text" id="medaglieVinte">0</span></p><p>Avatar sbloccati: <span class="stat-text" id="avatarSbloccati">0</span></p>`;
                ;


                // Aggiungi qui altre celle per altre statistiche
            }
        },
        error: function(error) {
            console.error('Errore:', error);
        }
    });

});



    