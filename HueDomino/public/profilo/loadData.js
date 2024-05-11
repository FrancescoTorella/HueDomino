
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
            $('#numeroAmici').text(data.numeroAmici);
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
                cell2.innerHTML = ` <p>Livelli superati: <span class="stat-text" id="livelliSuperati">${friends[i].livellisuperati}</span></p><p>Mondi giocati: <span class="stat-text" id="mondiGiocati">${friends[i].mondigiocati}</span></p><p>Numero amici: <span class="stat-text" id="numeroAmici">${friends[i].numeroamici}</span></p><p>Medaglie vinte: <span class="stat-text" id="medaglieVinte">0</span></p><p>Avatar sbloccati: <span class="stat-text" id="avatarSbloccati">0</span></p>`;
                ;

                var cell3 = row.insertCell(2);
                cell3.innerHTML = `
                    <button id="removeFriendButton" class="pixel2" data-idAmico="${friends[i].idAmico}" data-usernameamico="${friends[i].usernameAmico}">Rimuovi</button>
                `;


                // Aggiungi qui altre celle per altre statistiche
            }
        },
        error: function(error) {
            console.error('Errore:', error);
        }
    });

    //richiedi i livelli completati dall'utente
    $.ajax({
        url: '/levels/' + ID_UTENTE,
        type: 'GET',
        success: function(levels) {
            // Qui puoi utilizzare i dati sui livelli completati come preferisci
            // Ad esempio, potresti aggiornare l'interfaccia utente con i nuovi livelli completati

            console.log(levels);
            for (var i = 0; i < levels.length; i++) {
                var level = levels[i];
                //individua il path delle immagini dei livelli completati
                var path_to_level_image = '/viaggio/'+ level.levelnation+'/level'+level.levelnumber+'/completed.png';
                //console.log(path_to_level_image);
                // JavaScript
                var levelCard = `
                <div class="col-sm-6 col-lg-4 col-xl-3 custom-card-container">
                    <div class="card custom-card">
                        <img class="card-img-top" src="${path_to_level_image}" alt="Livello ${level.levelname}">
                        <div class="card-body">
                            <h5 class="card-title">${level.levelnation}: ${level.levelnumber}</h5>
                           
                        </div>
                    </div>
                </div>
                `;


                // Aggiungi la card alla griglia
                $('#levelsGrid').append(levelCard);
                            

                // Aggiungi qui il codice per mostrare i livelli completati
            }
            

        },
        error: function(error) {
            console.error('Errore:', error);
        }
    });

});



    