// Variabile mouseDown per tenere traccia dello stato del mouse
let mouseDown = false;

// Dichiarazione e inizializzazione della variabile currentColor
let currentColor = 'white';

//salva il colore iniziale dei bottoni quadrati
let defaultSquarebuttonsColor = 'rgb(242, 242, 242)';

//salva il colore iniziale dei bottoni sottili
let defaultThinbuttonsColor = 'rgb(218, 218, 218)';

//colore dei bottoni sottili selezionati
let selectedThinbuttonsColor = 'black';

// Dichiarazione della variabile selectedColor
let selectedColor = null;

//strutture dati
// Crea una matrice per memorizzare i bottoni quadrati
let matrix = [];

//crea una mappa per memorizzare i bottoni sottili
let thinButtonsMap = new Map();

//costanti
const rows = 32;
const cols = 32;

// Variabile globale per la modalità di selezione
let selectionMode = false;

//Variabile globale per la modalità di gioco
let playMode = false;


// Funzione per gestire l'evento di caricamento del documento
document.addEventListener("DOMContentLoaded", function() {
    const buttonGrid = document.getElementById("buttonGrid");
    
    // Crea una griglia di bottoni quadrati e bottoni sottili a seconda del numero di righe e colonne
    for (let i = 0; i < rows; i++) {
        // Crea una riga della matrice
        let row = [];

        // Crea un div per la riga
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("square-row");

        // Crea i bottoni quadrati e i bottoni sottili orizzontali per una riga
        for (let j = 0; j < cols; j++) {
            // Crea un a per il bottone quadrato
            const buttonContainer = document.createElement("a");
            buttonContainer.classList.add("square-button-container");
    
            // Crea un bottone quadrato
            const button = document.createElement("button");
            button.classList.add("square-button");

            // Imposta il colore di default per il bottone quadrato
            button.style.backgroundColor = defaultSquarebuttonsColor;

            // Assegna una coppia di attributi al bottone che contiene le sue coordinate
            button.setAttribute('data-row', i);
            button.setAttribute('data-col', j);

            // Assegna un ID al bottone che contiene le sue coordinate
            button.id = 'square-' + i + '-' + j;
    
            // Aggiungi il bottone al suo a
            buttonContainer.appendChild(button);
            // Aggiungi il a al div della riga
            rowDiv.appendChild(buttonContainer);

            // Aggiungi il bottone alla matrice
            row.push(button);

            // Aggiungi un ascoltatore di eventi per il clic del mouse sui bottoni quadrati per la loro colorazione
            button.addEventListener('click', function() {
                if (selectedColor && !selectionMode) {
                    // Applica il colore selezionato alla casella cliccata
                    this.style.backgroundColor = selectedColor;
            
                    // Estrai le coordinate dagli attributi del bottone
                    let i = parseInt(this.getAttribute('data-row'));
                    let j = parseInt(this.getAttribute('data-col'));

                    // chiama fillArea per colorare le aree adiacenti con lo stesso colore
                    fillArea(i, j, selectedColor);
                }
            });
            
            // Crea un bottone sottile orizzontale se non è l'ultima colonna
            if (j < cols - 1) {
                //crea un a per il bottone sottile
                const thinButtonContainer = document.createElement("a");
                thinButtonContainer.classList.add("vertical-button-container");
    
                // Crea un bottone sottile
                const thinButton = document.createElement("button");
                thinButton.classList.add("vertical-thin-button");


                // Assegna un ID al bottone sottile in base alle coordinate dei bottoni quadrati adiacenti
                thinButton.id = 'v-border-' + i + '-' + j +'-' + i + '-' + (j + 1);

                // Imposta il colore di default per il bottone sottile
                thinButton.style.backgroundColor = defaultThinbuttonsColor;

                // Aggiungi il bottone sottile alla mappa
                thinButtonsMap.set(thinButton.id, thinButton);

                // Assegna due coppie di attributi per indicare le coordinate dei bottoni quadrati adiacenti
                thinButton.setAttribute('data-row1', i);
                thinButton.setAttribute('data-col1', j);
                thinButton.setAttribute('data-row2', i);
                thinButton.setAttribute('data-col2', j + 1);

                // Assegna i gestori degli eventi al bottone sottile
                thinButton.addEventListener('mouseover', handleMouseOver);
                thinButton.addEventListener('mousedown', handleMouseDown);

                // Assegna i gestori degli eventi al thinButtonContainer, in modo tale che il bottone viene premuto anche se si preme il container
                thinButtonContainer.addEventListener('mousedown', handleMouseDownEvent);
                thinButtonContainer.addEventListener('mouseover', handleMouseOverEvent);
        
                // Aggiungi il bottone sottile al suo a
                thinButtonContainer.appendChild(thinButton);

                // Aggiungi il a al div della riga
                rowDiv.appendChild(thinButtonContainer);
            }
        }

        // Aggiungi la riga alla matrice
        matrix.push(row);

        // Aggiungi il div della riga al div della griglia
        buttonGrid.appendChild(rowDiv);
    
        // Crea un div per i bottoni sottili orizzontali se non è l'ultima riga
        if (i < rows - 1) {
            // Crea un div per i bottoni sottili orizzontali
            const horizontalThinButtonsDiv = document.createElement("div");
            horizontalThinButtonsDiv.classList.add("thin-row");
    
            // Crea i bottoni sottili orizzontali per una riga
            for (let j = 0; j < cols; j++) {
                //crea un a per il bottone sottile
                const thinButtonContainer = document.createElement("a");
                thinButtonContainer.classList.add("horizontal-button-container");
    
                // Crea un bottone sottile
                const thinButton = document.createElement("button");
                thinButton.classList.add("horizontal-thin-button");

                // Assegna un ID al bottone sottile in base alle coordinate dei bottoni quadrati adiacenti
                thinButton.id = 'h-border-' + i + '-' + j + '-' + (i + 1) + '-' + j;
                
                // Imposta il colore di default per il bottone sottile
                thinButton.style.backgroundColor = defaultThinbuttonsColor;

                // Aggiungi il bottone sottile alla mappa
                thinButtonsMap.set(thinButton.id, thinButton);

                // Assegna due coppie di attributi per indicare le coordinate dei bottoni quadrati adiacenti
                thinButton.setAttribute('data-row1', i);
                thinButton.setAttribute('data-col1', j);
                thinButton.setAttribute('data-row2', i + 1);
                thinButton.setAttribute('data-col2', j);

                // Assegna i gestori degli eventi al bottone sottile
                thinButton.addEventListener('mouseover', handleMouseOver);
                thinButton.addEventListener('mousedown', handleMouseDown);

                // Assegna i gestori degli eventi al thinButtonContainer in modo tale che il bottone viene premuto anche se si preme il container
                thinButtonContainer.addEventListener('mousedown', handleMouseDownEvent);
                thinButtonContainer.addEventListener('mouseover', handleMouseOverEvent);
                
    
                // Aggiungi il bottone sottile al suo a
                thinButtonContainer.appendChild(thinButton);

                // Aggiungi il a al div dei bottoni sottili orizzontali
                horizontalThinButtonsDiv.appendChild(thinButtonContainer);
            }
    
            // Aggiungi il div dei bottoni sottili orizzontali al div della griglia
            buttonGrid.appendChild(horizontalThinButtonsDiv);
        }
    }
    
        
    // Imposta il flag quando il mouse viene premuto
    document.addEventListener('mousedown', function() {
        mouseDown = true;
    });
    

    // Aggiungi un gestore di eventi per il rilascio del clic
    document.addEventListener("mouseup", function() {
        mouseDown = false;
    });
    

    // Quando selezioni un colore
    document.getElementById('blueButton').addEventListener('click', function() {
        // Disattiva la modalità di selezione e di gioco
        disableSelectionMode();
        disablePlayMode();

        // Imposta il colore selezionato
        selectedColor = 'blue';
    });

    document.getElementById('redButton').addEventListener('click', function() {
        // Disattiva la modalità di selezione e di gioco
        disableSelectionMode();
        disablePlayMode();

        // Imposta il colore selezionato
        selectedColor = 'red';
    });

    // Quando selezioni il verde
    document.getElementById('greenButton').addEventListener('click', function() {
        // Disattiva la modalità di selezione e di gioco
        disableSelectionMode(); 
        disablePlayMode();

        // Imposta il colore selezionato
        selectedColor = 'green';
    });

    // Quando selezioni "Modalità di selezione"
    document.getElementById('selectButton').addEventListener('click', function() {
        // Disattiva la modalità di gioco
        disablePlayMode();

        // Inverti il flag della modalità di selezione
        selectionMode = !selectionMode;
        
        // Aggiungi o rimuovi la classe 'mode-active' dal bottone (per mostrare visivamente lo stato attivo)
        this.classList.toggle('selection-mode-button-active');
    });

    //Quando selezioni modalità di gioco
    document.getElementById('playButton').addEventListener('click', function() {
        // Disattiva la modalità di selezione
        disableSelectionMode();

        // Inverti il flag della modalità di gioco
        playMode = !playMode;

        // Aggiungi o rimuovi la classe 'mode-active' dal bottone (per mostrare visivamente lo stato attivo)
        this.classList.toggle('play-mode-button-active');
    });
 

    // Aggiungi un ascoltatore di eventi al pulsante reset
    document.getElementById('resetAllButton').addEventListener('click', function() {
        // Disattiva la modalità di selezione e di gioco
        disableSelectionMode();
        disablePlayMode();

        //resettare il colore attuale
        selectedColor = null;

        // Seleziona tutti i bottoni quadrati
        const squareButtons = document.querySelectorAll('.square-button');
        
        // Resetta il colore di tutti i bottoni quadrati
        squareButtons.forEach(button => {
            button.style.backgroundColor =  defaultSquarebuttonsColor;
        });

        // Seleziona tutti i bottoni sottili
        const thinButtons = document.querySelectorAll('.horizontal-thin-button, .vertical-thin-button');

        // Resetta il colore di tutti i bottoni sottili
        thinButtons.forEach(button => {
            button.style.backgroundColor = defaultThinbuttonsColor;
        });
    });

    // Aggiungi un ascoltatore di eventi al pulsante reset color
    document.getElementById('resetColorButton').addEventListener('click', function() {
        // Disattiva la modalità di selezione e di gioco
        disableSelectionMode();
        disablePlayMode();

        //resettare il colore attuale
        selectedColor = null;

        // Seleziona tutti i bottoni quadrati
        const squareButtons = document.querySelectorAll('.square-button');
        
        // Resetta il colore di tutti i bottoni quadrati
        squareButtons.forEach(button => {
            button.style.backgroundColor =  defaultSquarebuttonsColor;
        });

        //resetta i colori di tutti i bottoni sottili che non siano selezionati o non abbiano il colore di default
        const thinButtons = document.querySelectorAll('.horizontal-thin-button, .vertical-thin-button');
        thinButtons.forEach(button => {
            if(button.style.backgroundColor !== defaultThinbuttonsColor && button.style.backgroundColor !== selectedThinbuttonsColor){
                button.style.backgroundColor = defaultThinbuttonsColor;
            }
        });
    });  
    
    
});

// Funzione per disabilitare la modalità di selezione
function disableSelectionMode(){
    if(selectionMode){
        document.getElementById('selectButton').classList.toggle('selection-mode-button-active');
        selectionMode = false;
    }
}

// Funzione per disabilitare la modalità di gioco
function disablePlayMode(){
    if(playMode){
        document.getElementById('playButton').classList.toggle('play-mode-button-active');
        playMode = false;
    }
}


// Funzione per gestire l'evento di passaggio del mouse su un bottone sottile
function handleMouseOver(event) {
    event.stopPropagation();
    // Se il mouse non è premuto, esci dalla funzione
    if (!mouseDown) return;
    if(selectionMode){
        // Aggiungi la classe 'selected' al bottone
        this.style.backgroundColor = selectedThinbuttonsColor;
    }
}

// Funzione per gestire l'evento di clic del mouse su un bottone sottile
function handleMouseDown(event) {
    event.stopPropagation();
    if(selectionMode){
        //Se è attiva la modalità di selezione, allora cambia il colore del bottone sottile se non è selezionato, altrimenti rimuovi la selezione
        if(this.style.backgroundColor === selectedThinbuttonsColor){
            this.style.backgroundColor = defaultThinbuttonsColor;
        } else {
            this.style.backgroundColor = selectedThinbuttonsColor;
        }
    }else if(playMode){
        //se è attiva la modalità di gioco e se il bottone sottile è selezionato, allora gestisci l'evento di espansione del colore
        if (this.style.backgroundColor === selectedThinbuttonsColor) {
            
            //prende le coordinate dei bottoni quadrati adiacenti
            let i1 = parseInt(this.getAttribute('data-row1'));
            let j1 = parseInt(this.getAttribute('data-col1'));
            let i2 = parseInt(this.getAttribute('data-row2'));
            let j2 = parseInt(this.getAttribute('data-col2'));
    
            //se il colore di entrambi i bottoni qudrati adiacenti è quello di default, allora imposta colore di default anche al bottone sottile ed esci dalla funzione
            if(matrix[i1][j1].style.backgroundColor === defaultSquarebuttonsColor && matrix[i2][j2].style.backgroundColor === defaultSquarebuttonsColor){
                this.style.backgroundColor = defaultThinbuttonsColor;
                return;
            }

            //se il colore di entrambi i bottoni è uguale, ma diverso da quello di default,allora imposta quel colore al bottone sottile e esci dalla funzione
            if(matrix[i1][j1].style.backgroundColor === matrix[i2][j2].style.backgroundColor){
                this.style.backgroundColor = matrix[i1][j1].style.backgroundColor;
                return;
            }

            //se il colore di entrambi i bottoni e diverso e uno di essi ha la colorazione di default, allora colora il bottone sottile con il colore dell'altro bottone (quello con la colorazione non di default) e chiama fillArea sul bottone quadrato con la colorazione di default
            if(matrix[i1][j1].style.backgroundColor === defaultSquarebuttonsColor){
                this.style.backgroundColor = matrix[i2][j2].style.backgroundColor;
                fillArea(i1, j1, matrix[i2][j2].style.backgroundColor);
                return;
            }else if (matrix[i2][j2].style.backgroundColor === defaultSquarebuttonsColor){
                this.style.backgroundColor = matrix[i1][j1].style.backgroundColor;
                fillArea(i2, j2, matrix[i1][j1].style.backgroundColor);
                return;
            }

            //se il colore di entrambi i bottoni è diverso, allora colora il bottone sottile con il colore di merge, poi colora i bottoni quadrati adiacenti con il colore del bottone quadrato opposto
            let color = combineColors(matrix[i1][j1].style.backgroundColor, matrix[i2][j2].style.backgroundColor);
            this.style.backgroundColor = color;
            fillArea(i1, j1, color,1);
            fillArea(i2, j2, color,1);
        }   
    }
}

// Funzione per gestire l'evento mousedown sul container del bottone sottile
function handleMouseDownEvent() {
    // Crea un evento mousedown e lo invia al primo figlio del container
    var evt = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    this.firstChild.dispatchEvent(evt);
}

// Funzione per gestire l'evento mouseover sul container del bottone sottile
function handleMouseOverEvent() {
    // Se il mouse è premuto, crea un evento mouseover e lo invia al primo figlio del container
    if(mouseDown){
        var evt = new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        this.firstChild.dispatchEvent(evt);
    }
}

function fillArea(i, j, color,maxCells = 1024) {
    let visited = new Set();
    let queue = [{i: i, j: j, distance: 0}];

    while (queue.length > 0) {
        let {i, j, distance} = queue.shift();

        if (!visited.has(matrix[i][j])) {
            visited.add(matrix[i][j]);

            let oldColor = matrix[i][j].style.backgroundColor;
            let newColor = combineColors(oldColor, color);

            // Se il colore corrente è uguale al nuovo colore, continua al prossimo ciclo
            if (playMode && oldColor === newColor) {
                console.log('oldColor === newColor');
                continue;
            }

            matrix[i][j].style.backgroundColor = newColor;

            // Aggiungi le celle adiacenti alla coda solo se non hanno già il nuovo colore e la distanza è minore di maxCells
            if (distance < maxCells) {
                if (i > 0 && !activeBorder(i-1,j,i,j)){
                    colorBorder(i-1,j,i,j,newColor);
                    if (matrix[i-1][j].style.backgroundColor !== newColor) {
                        queue.push({i: i - 1, j: j, distance: distance + 1});
                    }
                } 
                if (i < rows - 1 && !activeBorder(i,j,i+1,j)){
                    colorBorder(i,j,i+1,j,newColor);
                    if (matrix[i+1][j].style.backgroundColor !== newColor) {
                        queue.push({i: i + 1, j: j, distance: distance + 1});
                    }
                }
                if (j > 0 && !activeBorder(i,j-1,i,j)){
                    colorBorder(i,j-1,i,j,newColor);
                    if (matrix[i][j-1].style.backgroundColor !== newColor) {
                        queue.push({i: i, j: j - 1, distance: distance + 1});
                    }
                }
                if (j < cols - 1 && !activeBorder(i,j,i,j+1)){
                    colorBorder(i,j,i,j+1,newColor);
                    if (matrix[i][j+1].style.backgroundColor !== newColor) {
                        queue.push({i: i, j: j + 1, distance: distance + 1});
                    }
                }
            }
        }
    }
}

//Registra le combinazioni di colori
function combineColors(color1, color2) {
    // Normalizza i colori per ignorare le differenze di maiuscole/minuscole e gli spazi bianchi
    color1 = color1.toLowerCase().trim();
    color2 = color2.toLowerCase().trim();

    // Controlla le combinazioni di colori
    if ((color1 === 'red' && color2 === 'blue') || (color1 === 'blue' && color2 === 'red')) {
        return 'magenta';
    } else if ((color1 === 'blue' && color2 === 'green') || (color1 === 'green' && color2 === 'blue')) {
        return 'cyan';
    } else if ((color1 === 'red' && color2 === 'green') || (color1 === 'green' && color2 === 'red')) {
        return 'yellow';
    } else {
        // Se i colori non corrispondono a nessuna combinazione, restituisci il secondo colore
        return color2;
    }

    
}

// Funzione per verificare se un bordo sottile è attivo
function activeBorder(i1, j1, i2, j2) {
    // Costruisci l'ID del bottone sottile
    let thinId = 'h-border-' + i1 + '-' + j1 + '-' + i2 + '-' + j2;
    if (i1 === i2) {
        thinId = 'v-border-' + i1 + '-' + j1 + '-' + i2 + '-' + j2;
    }

    // Seleziona il bottone sottile dalla mappa
    let thinButton = thinButtonsMap.get(thinId);

    // Verifica se il bottone sottile è selezionato
    return thinButton.style.backgroundColor === selectedThinbuttonsColor;
}

// Funzione per colorare un bordo sottile
function colorBorder(i1, j1, i2, j2, color) {
    // Costruisci l'ID del bottone sottile
    let thinId = 'h-border-' + i1 + '-' + j1 + '-' + i2 + '-' + j2;
    if (i1 === i2) {
        thinId = 'v-border-' + i1 + '-' + j1 + '-' + i2 + '-' + j2;
    }

    // Seleziona il bottone sottile dalla mappa
    let thinButton = thinButtonsMap.get(thinId);

    // Cambia il colore del bottone sottile
    thinButton.style.backgroundColor = color;
}