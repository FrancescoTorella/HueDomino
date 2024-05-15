


export async function loadData(nation) {
    //console.log("loadData");
    let userId;
    let livello;
    const sessionIdCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('sessionId='));
    let sessionId;
    if (sessionIdCookie) {
        sessionId = sessionIdCookie.split('=')[1];
    }
    //console.log("sessionId",sessionId);
    if (sessionId) {
        $.ajax({
            url: `/session/${sessionId}`,
            dataType: 'json',
            async: false,
            success: function(data) {
                userId = data.user_id;
                //console.log('ID utente:', userId);
            },
            error: function(jqxhr, textStatus, error) {
                console.error('Error:', error);
                
            }
        });
    } else {
        console.log('Il cookie sessionId non è stato trovato');
        
    }

    if(!userId) {
        console.log('ID utente non trovato');
        return;
    }

    //console.log("userId",userId);

    $.ajax({
        url: `/checkPlayable?userId=${userId}`,
        dataType: 'json',
        async: false,
        success: function(data) {
            data.playableLevels.forEach((level,index) => {
                console.log(level);
                const nationCapitalized = level.levelnation.charAt(0).toUpperCase() + level.levelnation.slice(1);
                const button = $(`#level${level.levelnumber}${nationCapitalized}Button`);
                if (button.length > 0 && level.levelnation == nation) {
                    button.css('backgroundColor', 'yellow');
                }
            });
            const worldLevels = data.playableLevels.filter(level => level.levelnation === nation);

            // Trova l'elemento con il levelnumber più alto
            const highestWorldLevel = worldLevels.reduce((highest, current) => {
                return (current.levelnumber > highest.levelnumber) ? current : highest;
            }, worldLevels[0]);
            
            //console.log("highestWorldLevel", highestWorldLevel);
            
            if (highestWorldLevel) {
                livello = highestWorldLevel.levelnumber;
            }
        },
        error: function(jqxhr, textStatus, error) {
            console.error('Error:', error);
        }
    });

    // Esegui una richiesta GET al tuo server per ottenere i livelli passati
    // Esegui una richiesta GET al tuo server per ottenere i livelli passati
    $.ajax({
        url: `/checkPassed?userId=${userId}`,
        dataType: 'json',
        async: false,
        success: function(data) {
            data.passedLevels.forEach(level => {
                // Supponendo che ogni oggetto abbia una proprietà `levelNumber` che corrisponde al numero del livello
                const nationCapitalized = level.levelnation.charAt(0).toUpperCase() + level.levelnation.slice(1);
                const button = $(`#level${level.levelnumber}${nationCapitalized}Button`);
                if (button.length > 0) {
                    // Cambia il colore del bottone in rosso
                    button.css('border', '3px solid red');
                }
            });
        },
        error: function(jqxhr, textStatus, error) {
            console.error('Error:', error);
        }
    });

    //console.log("livello",livello);

    return livello;
}


    