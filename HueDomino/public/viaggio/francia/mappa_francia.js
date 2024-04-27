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
    const numberOfDrops = 200;  //Numero di gocce da creare
    let dropsCompleted = 0; // Variabile per tenere traccia delle gocce completate

    //set timeout serve per la gestione degli eventi con timing 

    for (let i = 0; i < numberOfDrops; i++) {
        setTimeout(() => {
            let drop = document.createElement('div');
            drop.className = 'color-line';
            drop.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            drop.style.left = `${aeroplaninoRect.left + aeroplaninoRect.width * Math.random()}px`;
            drop.style.top = `${aeroplaninoRect.top + aeroplaninoRect.height / 2}px`;
            document.body.appendChild(drop);

            setTimeout(() => {
                drop.style.top = `${aeroplaninoRect.top + aeroplaninoRect.height / 2 + 100}px`;
                drop.style.opacity = '0';

                setTimeout(() => {
                    document.body.removeChild(drop);
                    dropsCompleted++; // Incrementa il conteggio delle gocce completate

                    if (dropsCompleted === numberOfDrops) {
                        if(livello < 10)
                            transitionToNextLevel(); // Chiama transitionToNextLevel solo dopo che tutte le gocce sono state gestite
                        aeroplaninoMovementInterval = setInterval(updateAeroplaninoPosition, 20); // Riavvia il movimento dell'aeroplanino
                        updateMapImage();
                    }
                }, 2000); // Dopo 2 secondi, termina l'animazione e rimuove le gocce
            }, 100);
        }, i * 40);
    }
}

//Funzione per aggiornare l'immagine al superamento del livello
function updateMapImage() {     
    var mapImage = document.querySelector('.map-country');
    var imageName = "images/franciaCarta_" + (livello) + ".png";
    mapImage.src = imageName;
}

//per vedere le funzioni sul sito andare su console in pagina italia, e scrivere nomeFunzione() "poi invio"
