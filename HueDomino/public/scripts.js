document.addEventListener('DOMContentLoaded', function() {
    // document.getElementById('loginButton').addEventListener('click', function() {
    //     window.location.href = 'login/login.html';
    // });

    // function isLoggedIn() {
    //     // Controlla se esiste un cookie chiamato 'session'
    //     const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('session='));
    //     // Se il cookie esiste, l'utente è loggato
    //     return sessionCookie !== undefined;
    // }

    // // Supponiamo che tu abbia una funzione 'isLoggedIn' che restituisce true se l'utente è loggato
    // window.addEventListener('load', function() {
    //     if (isLoggedIn()) {
    //       const loginButton = document.getElementById('loginButton');
    //       loginButton.textContent = 'Profile Settings'; // Cambia il testo del pulsante
    //     }
    //   });

    window.onload = function() {
      
        
      
        if (document.cookie.split(';').some((item) => item.trim().startsWith('loggedIn='))) {
          // rendi visibile l'elemento temporary-div
          const temp = document.getElementById("temporaryDiv");
          temp.style.display = "block"; // o qualsiasi altro valore di display che desideri

          const userId = document.cookie.split(';').find(item => item.trim().startsWith('userId=')).split('=')[1];

          if(userId){
            // Esegui una richiesta GET al tuo server per ottenere i livelli giocabili
            fetch(`/checkPlayable?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                // `data.playableLevels` dovrebbe essere un array di oggetti, dove ogni oggetto rappresenta un livello giocabile
                data.playableLevels.forEach(level => {
                    // Supponendo che ogni oggetto abbia una proprietà `levelNumber` che corrisponde al numero del livello
                    const button = document.getElementById(`level${level.levelnumber}ItalyButton`);
                    if (button) {
                        
                        // Cambia il colore del bottone in giallo
                        button.style.backgroundColor = 'yellow';
                        // Rendi il bottone cliccabile rimuovendo l'attributo `disabled`
                        button.disabled = false;
                    }
                });
            })
            .catch(error => {
            console.error('Error:', error);
            });
          }
    
          
        } else {
          console.log('Il cookie loggedIn non è stato trovato');
        }
    };
});