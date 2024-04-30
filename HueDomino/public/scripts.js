document.addEventListener('DOMContentLoaded', function() {

    // function isLoggedIn() {
    //     // Controlla se esiste un cookie chiamato 'session'
    //     const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('sessionId='));
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
        // Cerca il cookie 'sessionId'
        const sessionId = document.cookie.split(';').find(item => item.trim().startsWith('sessionId='));
      
        if (sessionId) {
          // Estrai l'ID della sessione dal cookie
          const sessionIdValue = sessionId.split('=')[1];
      
          // Fai una richiesta al server per ottenere i dettagli della sessione
          fetch('/session/' + sessionIdValue)
            .then(response => response.json())
            .then(session => {
              // Stampa i dettagli della sessione sulla console
              console.log('Dettagli della sessione:', session);
            })
            .catch(error => console.error('Error:', error));
        } else {
          console.log('Il cookie sessionId non è stato trovato');
        }
    };
});