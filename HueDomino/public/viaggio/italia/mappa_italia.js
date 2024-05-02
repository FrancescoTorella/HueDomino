var aeroplanino; // Elemento DOM dell'aeroplanino
var mapBox;      // Elemento DOM del contenitore della mappa
var livello = 1; // Variabile che tiene traccia del livello corrente
var angle = 0;   // Angolo per calcolare la posizione dell'aeroplanino
var aeroplaninoMovementInterval; // Variabile per l'intervallo di movimento dell'aeroplanino

function updateAeroplaninoPosition() {
    let currentLevelIcon = document.querySelector(`.level-icon[data-level="${livello}"]`);      //uso data-level segnata in italia.html sui vari livelli per estrarre le posizioni espresse sempre in italia.html

    if (!currentLevelIcon) {
        console.error('Icona del livello corrente non trovata.');
        return;
    }

    const iconRect = currentLevelIcon.getBoundingClientRect();
    const mapRect = mapBox.getBoundingClientRect();
    
    const radius = 25;      //Questo è il raggio dell'orbita dell'aeroplanino, da notare che è un valore fisso quindi al variare della grandezza della mappa rimana invariato
    //un'idea sarebbe scrivere una funzione che calcoli e modifichi il raggio in base alla grandezza della mappa ma ciò richiede aggiustamenti anche di centerX,Y per simulare un'orbita circolare/centrata
    const centerX = (iconRect.left - mapRect.left) + (iconRect.width / 2) - radius;
    const centerY = (iconRect.top - mapRect.top) + (iconRect.height / 2) - radius;

    const x = centerX + (radius * Math.cos(angle * Math.PI / 180));
    const y = centerY + (radius * Math.sin(angle * Math.PI / 180));

    aeroplanino.style.left = `${x}px`;
    aeroplanino.style.top = `${y}px`;

    angle = (angle + 2) % 360;
}

document.addEventListener('DOMContentLoaded', () => {
    aeroplanino = document.querySelector('.aeroplanino-icon');
    mapBox = document.querySelector('.map-container');
    
    // Chiamata iniziale per impostare la posizione dell'aeroplanino
    updateAeroplaninoPosition();

    // Aggiornamento periodico della posizione dell'aeroplanino
    aeroplaninoMovementInterval = setInterval(updateAeroplaninoPosition, 20);           //20 è il tempo di aggiornamento della posizione dell'aeroplanino in ms cambiarlo influisce sulla velocità
});

// Funzione che gestisce la transizione dell'aeroplanino al livello successivo
function transitionToNextLevel() {
    if (livello >= 10) {
        console.log("Hai raggiunto l'ultimo livello.");
        return;
    }

    let nextLevel = livello + 1;
    let currentLevelIcon = document.querySelector(`.level-icon[data-level="${livello}"]`);
    let nextLevelIcon = document.querySelector(`.level-icon[data-level="${nextLevel}"]`);

    if (!currentLevelIcon || !nextLevelIcon) {
        console.error('Una delle icone dei livelli non è stata trovata.');
        return;
    }

    let startRect = currentLevelIcon.getBoundingClientRect();
    let endRect = nextLevelIcon.getBoundingClientRect();
    let deltaX = endRect.left - startRect.left;
    let deltaY = endRect.top - startRect.top;

    // Applica la trasformazione scaleX per capovolgere l'aeroplanino orizzontalmente serve per le transizioni da destra a sinistra "evita effetto contromano"
    //Verifica se la transizione è da destra a sinistra o viceversa
    aeroplanino.style.transform = `scaleX(${deltaX >= 0 ? 1 : -1})`;

    let steps = 100;
    let currentStep = 0;

    //Funzione ricorsiva per il movimento dell'areoplanino
    const move = () => {
        if (currentStep <= steps) {
            let newX = startRect.left + (deltaX * currentStep / steps) - mapBox.getBoundingClientRect().left;
            let newY = startRect.top + (deltaY * currentStep / steps) - mapBox.getBoundingClientRect().top;
            aeroplanino.style.left = `${newX}px`;
            aeroplanino.style.top = `${newY}px`;

            currentStep++;
            if (currentStep === steps) {
                requestAnimationFrame(() => {
                    livello = nextLevel;
                    // Ripristina l'orientamento originale una volta completata la transizione
                    aeroplanino.style.transform = 'scaleX(1)';
                    updateAeroplaninoPosition();
                });
            } else {
                requestAnimationFrame(move);
            }
        }
    };

    move();
}



//Funzione che viene attivata solo al superamento di un livello
function createColorRain() {
    if (livello > 10) {
        console.log("Hai raggiunto l'ultimo livello.");
        return;
    }
    const aeroplanino = document.querySelector('.aeroplanino-icon');
    const mapContainer = document.querySelector('.map-container');

    clearInterval(aeroplaninoMovementInterval); 

    const aeroplaninoRect = aeroplanino.getBoundingClientRect();
    const aeroplaninoTop = aeroplaninoRect.top + window.scrollY;
    const aeroplaninoLeft = aeroplaninoRect.left + window.scrollX;
    const numberOfDrops = 200;  //Numero di gocce da creare
    let dropsCompleted = 0; // Variabile per tenere traccia delle gocce completate

    //set timeout serve per la gestione degli eventi con timing 

    for (let i = 0; i < numberOfDrops; i++) {
        setTimeout(() => {
            let drop = document.createElement('div');
            drop.className = 'color-line';
            drop.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            drop.style.left = `${aeroplaninoLeft + aeroplaninoRect.width * Math.random()}px`;
            drop.style.top = `${aeroplaninoTop + aeroplaninoRect.height / 2}px`;
            document.body.appendChild(drop);

            setTimeout(() => {
                drop.style.top = `${aeroplaninoTop + aeroplaninoRect.height / 2 + 100}px`;
                drop.style.opacity = '0';

                setTimeout(() => {
                    document.body.removeChild(drop);
                    dropsCompleted++; // Incrementa il conteggio delle gocce completate

                    if (dropsCompleted === numberOfDrops) {
                        if(livello < 10)
                            transitionToNextLevel(); // Chiama transitionToNextLevel solo dopo che tutte le gocce sono state gestite
                        aeroplaninoMovementInterval = setInterval(updateAeroplaninoPosition, 20); // Riavvia il movimento dell'aeroplanino
                        // updateMapImage();
                    }
                }, 2000); // Dopo 2 secondi, termina l'animazione e rimuove le gocce
            }, 100);
        }, i * 40);
    }
}

//Funzione per aggiornare l'immagine al superamento del livello
function updateMapImage() {     
    var mapImage = document.querySelector('.map-country');
    var imageName = "images/italiaCarta_" + (livello) + ".jpg";
    mapImage.src = imageName;
}

//per vedere le funzioni sul sito andare su console in pagina italia, e scrivere nomeFunzione() "poi invio"


//quando carichi la pagina esegui richiesta al server per caricare livelli disponibili
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
            const button = document.getElementById(`level${level.levelnumber}ItalyButton`);
            if (button) {
                
                // Cambia il colore del bottone in giallo
                button.style.backgroundColor = 'yellow';
                // Rendi il bottone cliccabile rimuovendo l'attributo `disabled`
                //button.disabled = false;

                // Controlla se questo è l'ultimo elemento
                if (index === data.playableLevels.length - 1) {
                    // Qui puoi fare quello che vuoi con l'ultimo elemento
                    livello = index;
                    console.log('Questo è l\'ultimo livello', livello);

                    const justPassedCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('justPassed='));

                    
                    // Se il cookie esiste, estrai il suo valore
                    if (justPassedCookie) {
                        const justPassed = justPassedCookie.split('=')[1];
                        console.log('Il valore del cookie justPassed è:', justPassed);

                        if( justPassed == livello){
                            setTimeout(() => {createColorRain(); }, 3000);
                        }
                        // Qui puoi fare quello che vuoi con il valore del cookie
                    }else{
                        console.log("cookie just passed non trovato")
                        livello = index + 1;
                    }
                }
            }
        });
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
            const button = document.getElementById(`level${level.levelnumber}ItalyButton`);
            if (button) {
                
                // Cambia il colore del bottone in rosso
                button.style.border = '3px solid red';
            }
        });
    })
    .catch(error => {
    console.error('Error:', error);
    });

        

}
