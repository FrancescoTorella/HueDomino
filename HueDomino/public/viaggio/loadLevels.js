export async function loadData(nation) {
    console.log("loadData");
    let userId;
    let livello;
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
        console.log('ID utente:', userId);
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.log('Il cookie sessionId non è stato trovato');
    }

    fetch(`/checkPlayable?userId=${userId}`)
    .then(response => response.json())
    .then(data => {
        // `data.playableLevels` dovrebbe essere un array di oggetti, dove ogni oggetto rappresenta un livello giocabile
        data.playableLevels.forEach((level,index) => {
            // Supponendo che ogni oggetto abbia una proprietà `levelNumber` che corrisponde al numero del livello
            console.log(level);
            const nationCapitalized = level.levelnation.charAt(0).toUpperCase() + level.levelnation.slice(1);
            const button = document.getElementById(`level${level.levelnumber}${nationCapitalized}Button`);
            if (button && level.levelnation == nation) {
                
                // Cambia il colore del bottone in giallo
                button.style.backgroundColor = 'yellow';
                // Rendi il bottone cliccabile rimuovendo l'attributo `disabled`
                //button.disabled = false;

                
            }
        });

        
        const worldLevels = data.playableLevels.filter(level => level.levelnation === nation);

        // Trova l'elemento con il levelnumber più alto
        const highestWorldLevel = worldLevels.reduce((highest, current) => {
        return (current.levelnumber > highest.levelnumber) ? current : highest;
        }, worldLevels[0]);


        console.log("highestWorldLevel",highestWorldLevel);
        



        if (highestWorldLevel) {
            //console.log('Questo è l\'ultimo livello', highestWorldLevel.levelnumber);
            // const justPassedCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('justPassed='));

            
            // // Se il cookie esiste, estrai il suo valore
            // if (justPassedCookie) {
            //     const justPassed = justPassedCookie.split('=')[1];
            //     //console.log('Il valore del cookie justPassed è:', justPassed);

            //     if( justPassed == livello){
            //         setTimeout(() => {createColorRain(); }, 3000);
            //     }
            //     // Qui puoi fare quello che vuoi con il valore del cookie
            // }else{
            //     console.log("cookie just passed non trovato")
            // }
            
                livello = highestWorldLevel.levelnumber;
                console.log("livello",livello);
            // }
        }
    })
    .catch(error => {
    console.error('Error:', error);
    });

    // Esegui una richiesta GET al tuo server per ottenere i livelli passati
    fetch(`/checkPassed?userId=${userId}`)
    .then(response => response.json())
    .then(data => {
        // `data.passedLevels` dovrebbe essere un array di oggetti, dove ogni oggetto rappresenta un livello passato
        data.passedLevels.forEach(level => {
            // Supponendo che ogni oggetto abbia una proprietà `levelNumber` che corrisponde al numero del livello
            const nationCapitalized = level.levelnation.charAt(0).toUpperCase() + level.levelnation.slice(1);
            const button = document.getElementById(`level${level.levelnumber}${nationCapitalized}Button`);
            if (button) {
                
                // Cambia il colore del bottone in rosso
                button.style.border = '3px solid red';
            }
        });
    })
    .catch(error => {
    console.error('Error:', error);
    });

    console.log("livello",livello);

    return livello;
}
