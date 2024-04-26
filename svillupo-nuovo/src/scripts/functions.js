
import { defaultSquarebuttonsColor, defaultThinbuttonsColor,rows,cols } from './constants.js';
import{ matrix, thinButtonsMap } from './data.js';


//Tiene traccia delle combinazioni di colori
let colorCombinations = {};

//Tiene traccia dello stato del mouse
let mouseDown = false;

//colore dei bottoni sottili selezionati
let selectedThinbuttonsColor = 'black';

// Variabile globale per la modalità di selezione
let selectionMode = false;

//Variabile globale per la modalità di gioco
let playMode = false;

// Dichiarazione della variabile selectedColor
let selectedColor = null;


//Funzione per il click del mouse
export function handleMouseClick(event) {
    // Imposta il flag quando il mouse viene premuto
    mouseDown = true;
}

//Funzione per il rilascio del clic
export function handleMouseUp(event) {
    // Aggiungi un gestore di eventi per il rilascio del clic
    mouseDown = false;
}

//Funzione per i tasti di colore
export function selectColor(){
    // Disattiva la modalità di selezione e di gioco
    disableSelectionMode();
    disablePlayMode();

    // Imposta il colore selezionato in base all'ID del pulsante
    selectedColor = event.target.id.replace('Button', '');
}

//Funzione per il tasto modalità di selezione
export function setSelectionMode(){
    // Disattiva la modalità di gioco
    disablePlayMode();

    // Inverti il flag della modalità di selezione
    selectionMode = !selectionMode;
    
    // Aggiungi o rimuovi la classe 'mode-active' dal bottone (per mostrare visivamente lo stato attivo)
    this.classList.toggle('selection-mode-button-active');
}

//Funzione per il tasto gioca
export function setPlayMode(){
    // Disattiva la modalità di selezione
    disableSelectionMode();

    // Inverti il flag della modalità di gioco
    playMode = !playMode;

    // Aggiungi o rimuovi la classe 'mode-active' dal bottone (per mostrare visivamente lo stato attivo)
    this.classList.toggle('play-mode-button-active');
}

//Funzione per il tasto resetAll
export function resetAll(){
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
}

//Funzione per il tasto resetColorButton
export function resetColor(){
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
}

// Funzione per disabilitare la modalità di selezione
export function disableSelectionMode(){
    if(selectionMode){
        document.getElementById('selectButton').classList.toggle('selection-mode-button-active');
        selectionMode = false;
    }
}

// Funzione per disabilitare la modalità di gioco
export function disablePlayMode(){
    if(playMode){
        document.getElementById('playButton').classList.toggle('play-mode-button-active');
        playMode = false;
    }
}

// Funzione per gestire l'evento di passaggio del mouse su un bottone sottile
export function handleMouseOver(event) {
    event.stopPropagation();
    // Se il mouse non è premuto, esci dalla funzione
    if (!mouseDown) return;
    if(selectionMode){
        // Aggiungi la classe 'selected' al bottone
        this.style.backgroundColor = selectedThinbuttonsColor;
    }
}

// Funzione per gestire l'evento di clic del mouse su un bottone sottile
export function handleMouseDown(event) {
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
    
            this.style.backgroundColor = defaultThinbuttonsColor;
            let oldColor1 = matrix[i1][j1].style.backgroundColor;
            let oldColor2 = matrix[i2][j2].style.backgroundColor;
            //se il colore di uno dei bottoni quadrati adiacenti è diverso dal colore di default
            if(oldColor1 === defaultSquarebuttonsColor ^ oldColor2 === defaultSquarebuttonsColor){
                fillArea(i1, j1, oldColor2);
                fillArea(i2, j2, oldColor1);
                fillThinButtons();
            } else if (oldColor1 !== oldColor2){
                fillArea(i1, j1, oldColor2,1);
                fillArea(i2, j2, oldColor1,1);
                fillThinButtons();
            }else{
                this.style.backgroundColor = oldColor1;
            }
        }   
    }
}

// Funzione per gestire l'evento mousedown sul container del bottone sottile
export function handleMouseDownEvent() {
    // Crea un evento mousedown e lo invia al primo figlio del container
    var evt = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    this.firstChild.dispatchEvent(evt);
}

// Funzione per gestire l'evento mouseover sul container del bottone sottile
export function handleMouseOverEvent() {
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

//Funzione per la colorazione di aree quadrate manualmente
export function handleSquareButtonMouseClick(){
    if (selectedColor && !selectionMode && !playMode) {
        // Applica il colore selezionato alla casella cliccata
        //this.style.backgroundColor = selectedColor;

        // Estrai le coordinate dagli attributi del bottone
        let i = parseInt(this.getAttribute('data-row'));
        let j = parseInt(this.getAttribute('data-col'));

        
        // chiama fillArea per colorare le aree adiacenti con lo stesso colore
        fillArea(i, j, selectedColor);
        fillThinButtons();
    }else if(selectionMode){
        //se la modalità di selezione è attiva, allora evidenzia il bottone quadrato cambiando l'ombra
        if(this.style.boxShadow === ''){
            this.style.boxShadow = '0 0 0 2px orange';
        }else{
            this.style.boxShadow = '';
        }

    }
    // else if(playMode && this.style.backgroundColor !== defaultSquarebuttonsColor){
    //     //aggiungi la classe animate  se non presente (per ora)
    //     this.classList.toggle('darken');
    // }
}

//Funzione principale per l'espanzione del colore
export function fillArea(i, j, color,maxCells = 1024) {
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
                continue;
            }

            matrix[i][j].style.backgroundColor = newColor;

            // Aggiungi le celle adiacenti alla coda solo se non hanno già il nuovo colore e la distanza è minore di maxCells
            if (i > 0 && !activeBorder(i-1,j,i,j)){
                //colorBorder(i-1,j,i,j,newColor);
                if (matrix[i-1][j].style.backgroundColor !== newColor && distance < maxCells) {
                    queue.push({i: i - 1, j: j, distance: distance + 1});
                }
            } 
            if (i < rows - 1 && !activeBorder(i,j,i+1,j)){
                //colorBorder(i,j,i+1,j,newColor);
                if (matrix[i+1][j].style.backgroundColor !== newColor && distance < maxCells) {
                    queue.push({i: i + 1, j: j, distance: distance + 1});
                }
            }
            if (j > 0 && !activeBorder(i,j-1,i,j)){
                //colorBorder(i,j-1,i,j,newColor);
                if (matrix[i][j-1].style.backgroundColor !== newColor && distance < maxCells) {
                    queue.push({i: i, j: j - 1, distance: distance + 1});
                }
            }
            if (j < cols - 1 && !activeBorder(i,j,i,j+1)){
                //colorBorder(i,j,i,j+1,newColor);
                if (matrix[i][j+1].style.backgroundColor !== newColor && distance < maxCells) {
                    queue.push({i: i, j: j + 1, distance: distance + 1});
                }
            }
            
        }
    }

    //fillThinButtons();
}

//Registra le combinazioni di colori
// Modifica la funzione combineColors per utilizzare l'oggetto colorCombinations
export function combineColors(color1, color2) {
    if(color1 === color2){
        return color1;
    }else if (color1 === defaultSquarebuttonsColor){
        return color2;
    }else if (color2 === defaultSquarebuttonsColor){
        return color1;
    }
    color1 = color1.toLowerCase().trim();
    color2 = color2.toLowerCase().trim();
    const colorCombination = colorCombinations[`${color1}${color2}`];

    if (colorCombination) {
        return colorCombination;
    } else {
        const keys = Object.keys(colorCombinations);
        if (keys.some(key => key.includes(color1))) {
            return color2;
        } else if (keys.some(key => key.includes(color2))) {
            return color1;
        } else {
            return color2; // fallback se nessuno dei colori è presente in una chiave
        }
    }
}

// Funzione per verificare se un bordo sottile è attivo
export function activeBorder(i1, j1, i2, j2) {
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
export function colorBorder(i1, j1, i2, j2, color) {
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

//Funzione per colorare insieme di bottoni sottili
export function fillThinButtons(){
    // Seleziona i bottoni sottili dalla mappa thinButtonsMap
    const thinButtons = Array.from(thinButtonsMap.values());

    //colora i bottoni sottili se non sono neri e se i bottoni quadrati adiacenti hanno lo stesso colore
    thinButtons.forEach(button => {
        //se il bottone non è nero, allora prendi i colori dei bottoni quadrati adiacenti
        if(button.style.backgroundColor !== selectedThinbuttonsColor){
            let i1 = parseInt(button.getAttribute('data-row1'));
            let j1 = parseInt(button.getAttribute('data-col1'));
            let i2 = parseInt(button.getAttribute('data-row2'));
            let j2 = parseInt(button.getAttribute('data-col2'));
            //se il colore di uno dei bottoni quadrati adiecenti è il colore di default o se i bottoni quadrati adiacenti hanno colori diversi, allora imposta il colore del bottone sottile a default
            if(matrix[i1][j1].style.backgroundColor === defaultSquarebuttonsColor || matrix[i2][j2].style.backgroundColor === defaultSquarebuttonsColor){
                button.style.backgroundColor = defaultThinbuttonsColor;
            }else if( matrix[i1][j1].style.backgroundColor !== matrix[i2][j2].style.backgroundColor){
                button.style.backgroundColor = selectedThinbuttonsColor;
            }else{
                //alrimenti imposta il colore del bottone sottile con il colore dei bottoni quadrati adiacenti
                button.style.backgroundColor = matrix[i1][j1].style.backgroundColor;
            }
        }
    });
}

// Funzione per salvare la configurazione dei bottoni sottili
export function saveThinButtonConfig() {
    // Crea un array di oggetti contenenti l'ID del bottone sottile e il suo colore
    const data = Array.from(thinButtonsMap).map(([thinId, thinButton]) => ({
        thinId,
        selected: thinButton.style.backgroundColor === defaultThinbuttonsColor ? 0 : 1
    }));

    // Invia i dati al server effettuando una richiesta di salvataggio
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

// Funzione per caricare la configurazione dei bottoni sottili
export function loadThinButtonConfig() {
    // Effettua una richiesta di caricamento al server dei dati salvati
    fetch('/load')
        .then(response => response.json())
        .then(data => {
            // colora i bottoni secondo i dati caricati
            data.forEach(({THINID, SELECTED}) => {
                const thinButton = thinButtonsMap.get(THINID);
                if (thinButton) {
                    const isSelected = Number(SELECTED) === 0 ? false : true;
                    thinButton.style.backgroundColor = isSelected ? selectedThinbuttonsColor : defaultThinbuttonsColor;
                }
            });
        });
}

// Leggi il file CSV e popola l'oggetto colorCombinations
// Questa funzione dovrebbe essere chiamata all'avvio del programma
export async function loadColorCombinations() {
    const response = await fetch('../color-combinations.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1);
    rows.forEach(row => {
        const cols = row.split(",");
        let color1 = cols[0].toLowerCase().trim();
        let color2 = cols[1].toLowerCase().trim();
        let result = cols[2].toLowerCase().trim();


        colorCombinations[`${color1}${color2}`] = result;
        colorCombinations[`${color2}${color1}`] = result;
    });
}