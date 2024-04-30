window.onload = async function() {

    let userId;

    const sessionId = document.cookie.split(';').find(item => item.trim().startsWith('sessionId='));
        
    if (sessionId) {
        // Estrai l'ID della sessione dal cookie
        const sessionIdValue = sessionId.split('=')[1];

        try {
        // Fai una richiesta al server per ottenere i dettagli della sessione
        const response = await fetch('/session/' + sessionIdValue);
        const session = await response.json();

        // Stampa i dettagli della sessione sulla console
        
        userId = session.user_id;
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.log('Il cookie sessionId non è stato trovato');
    }

    

}

    