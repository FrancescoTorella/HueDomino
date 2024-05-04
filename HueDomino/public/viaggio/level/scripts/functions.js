
//import { get } from '../../../../routes/pageRoutes.js';
import { defaultSquarebuttonsColor, defaultThinbuttonsColor,rows,cols } from './constants.js';
import{ matrix, thinButtonsMap } from './data.js';


//Tiene traccia delle combinazioni di colori
let colorCombinations = {};

//colore dei bottoni sottili selezionati
let selectedThinbuttonsColor = 'black';

// Dichiarazione della variabile selectedColor
let selectedColor = null;

// Variabile per tenere traccia del bottone che sta pulsando
let pulsingButton = null;

//variabile per tener traccia delle mosse rimanenti
let leftMoves = null;

//variabile per debugging
let debugging = true;

//variabile per configurazione finale
let finalConfigMatrix = null;

//estrai le infromazioni dai cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

//let userId = parseInt(getCookie('userId'));
let levelNation = getCookie('levelNation');
let levelNumber = parseInt(getCookie('levelNumber'));

if(debugging){
    //console.log(getCookie('userId'));
    //console.log(userId);
    console.log(levelNation);
    console.log(levelNumber);
}

//variabili per tener traccia dei filepath
let colorCombinationsPath = '/viaggio/' + levelNation + '/level' + levelNumber + '/color-combinations.json';
let leftMovesPath = '/viaggio/' + levelNation + '/level' + levelNumber + '/left-moves.json';
let finalColorConfigPath = '/viaggio/' + levelNation + '/level' + levelNumber + '/final-color-config.json';
let startConfigPath = '/viaggio/' + levelNation + '/level' + levelNumber + '/start-config.json';

if(debugging){
    console.log(colorCombinationsPath);
    console.log(leftMovesPath);
    console.log(finalColorConfigPath);
    console.log(startConfigPath);

}

//imposta il filepath alle immagini di riferimento
let imgElement = parent.document.getElementById('popupFinalImage');
imgElement.src = '/viaggio/' + levelNation + '/level' + levelNumber + '/completed.png';
imgElement = parent.document.getElementById('levelCompletedImage');
imgElement.src = '/viaggio/' + levelNation + '/level' + levelNumber + '/completed.png';

//imposta il path ai bottoni del div di fine livello
let nextLevelButton = parent.document.getElementById('nextLevelButton');
if(levelNumber < 8){    
    nextLevelButton.onclick = function() {
        parent.window.location.href = '/journey/' + levelNation + '/' + (levelNumber + 1);
    }
}else{
    nextLevelButton.style.display = 'none';
}
let backToMenuButton = parent.document.getElementById('backToMenuButton');
backToMenuButton.onclick = function() {
    parent.window.location.href = '/journey/' + levelNation;
}
// Funzione per gestire il click del bottone
export function handleButtonClick(button) {
   
    button.onclick = function(event) {
        // Se nessun altro bottone sta pulsando, fai pulsare questo bottone


        if(selectedColor === null){
            if (pulsingButton === null) {
                this.classList.add('pulsing');
                pulsingButton = button;
            } else {
                if(debugging) console.log("pulsing");
                
                // Altrimenti, rimuovi la classe 'pulsing' dal bottone che sta pulsando
                pulsingButton.classList.remove('pulsing');
                
                //esci dalla funzione se il numero di mosse è esaurito
                if(leftMoves <= 0){
                    pulsingButton = null;
                    return;
                }
                
    
                //se il bottone cliccato è vicino al bottone pulsante allora invoca fillArea
                let ic = Number(button.getAttribute('data-row'));
                let jc = Number(button.getAttribute('data-col'));
    
                let ip = Number(pulsingButton.getAttribute('data-row'));
                let jp = Number(pulsingButton.getAttribute('data-col'));
                pulsingButton = null;
                if(ic==ip+1 && jc==jp || ic==ip && jc==jp+1 || ic==ip-1 && jc==jp || ic==ip && jc==jp-1){

                    //salva stato prima di effettuare una mossa
                    saveState();
                    

                    //ottieni bottone sottile corrispondente
                    let thinButton;
                    if(ic==ip+1 && jc==jp){
                        thinButton = thinButtonsMap.get('h-border-' + ip + '-' + jp + '-' + ic + '-' + jc);
                    }else if(ic==ip && jc==jp+1){
                        thinButton = thinButtonsMap.get('v-border-' + ip + '-' + jp + '-' + ic + '-' + jc);
                    }else if(ic==ip-1 && jc==jp){
                        thinButton = thinButtonsMap.get('h-border-' + ic + '-' + jc + '-' + ip + '-' + jp);
                    }else if(ic==ip && jc==jp-1){
                        thinButton = thinButtonsMap.get('v-border-' + ic + '-' + jc + '-' + ip + '-' + jp);
                    }

                    thinButton.style.backgroundColor = defaultThinbuttonsColor;
                    let oldColor1 = matrix[ic][jc].style.backgroundColor;
                    let oldColor2 = matrix[ip][jp].style.backgroundColor;
                    if(oldColor1 === defaultSquarebuttonsColor ^ oldColor2 === defaultSquarebuttonsColor){
                        fillArea(ic, jc, oldColor2);
                        fillArea(ip, jp, oldColor1);
                        fillThinButtons();
                    } else if (oldColor1 !== oldColor2){
                        fillArea(ic, jc, oldColor2,1);
                        fillArea(ip, jp, oldColor1,1);
                        fillThinButtons();
                    }else{
                        this.style.backgroundColor = oldColor1;
                    }

                    leftMoves -= 1;
                    displayLeftMoves();
                    checkColorsMatch();
                }
            }
        }else{

            //esci dalla funzione se il numero di mosse è esaurito
            if(leftMoves <= 0){
                return;
            }

            //salva stato prima di effettuare una mossa
            saveState();

            let i = button.getAttribute('data-row');
            let j = button.getAttribute('data-col');
            fillArea(i,j,selectedColor);
            fillThinButtons();
            leftMoves -= 1;
            displayLeftMoves();
            checkColorsMatch();
        }

        // Impedisci che l'evento si propaghi al document
        event.stopPropagation();
    }
}



//annulla l'effetto di pulsing se viene premuta una qualunque altra parte dello schermo
export function handleDocumentClick() {
    if(pulsingButton != null){
        pulsingButton.classList.remove('pulsing');
        pulsingButton = null;
    }
}

export async function loadThinButtonsStartConfig() {
    try {
        const response = await fetch(startConfigPath);
        const data = await response.json();

        thinButtonsMap.forEach((button, id) => {
            const buttonData = data.find(b => b.id === id);
            if (buttonData && buttonData.selected) {
                button.style.backgroundColor = selectedThinbuttonsColor;
            } else {
                button.style.backgroundColor = defaultThinbuttonsColor;
            }
        });
    } catch (error) {
        console.error('Si è verificato un errore:', error);
    }
}


export async function loadColorCombinations() {
    try {
        // Carica il file JSON
        const response = await fetch(colorCombinationsPath);
        const data = await response.json();

        // Estrai i colori primari dalle prime tre righe
        const primaryColors = [data[0].color1, data[1].color1, data[2].color1];

        // Ottieni i div
        const firstColorDiv = parent.document.getElementById('firstColorDiv');
        const secondColorDiv = parent.document.getElementById('secondColorDiv');
        const thirdColorDiv = parent.document.getElementById('thirdColorDiv');

        // Applica i colori come sfondo ai div
        firstColorDiv.style.backgroundColor = primaryColors[0];
        secondColorDiv.style.backgroundColor = primaryColors[1];
        thirdColorDiv.style.backgroundColor = primaryColors[2];

        // Estrai le combinazioni di colori da tutte le righe e caricale in colorCombinations
        data.forEach(row => {
            colorCombinations[`${row.color1}${row.color2}`] = row.result;
            colorCombinations[`${row.color2}${row.color1}`] = row.result;
        });

    } catch (error) {
        console.error('Si è verificato un errore:', error);
    }
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
            if ( oldColor === newColor) {
                continue;
            }

            matrix[i][j].style.backgroundColor = newColor;
            

            // Aggiungi le celle adiacenti alla coda solo se non hanno già il nuovo colore e la distanza è minore di maxCells
            i = parseInt(i);
            j= parseInt(j);
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

function fillThinButtonsAtEnd(){
    // Seleziona i bottoni sottili dalla mappa thinButtonsMap
    const thinButtons = Array.from(thinButtonsMap.values());

    //colora i bottoni sottili se non sono neri e se i bottoni quadrati adiacenti hanno lo stesso colore
    thinButtons.forEach(button => {
        let i1 = parseInt(button.getAttribute('data-row1'));
        let j1 = parseInt(button.getAttribute('data-col1'));
        let i2 = parseInt(button.getAttribute('data-row2'));
        let j2 = parseInt(button.getAttribute('data-col2'));
        //se il bottone non è nero, allora prendi i colori dei bottoni quadrati adiacenti
        if(button.style.backgroundColor !== selectedThinbuttonsColor){
            
            //se il colore di uno dei bottoni quadrati adiecenti è il colore di default o se i bottoni quadrati adiacenti hanno colori diversi, allora imposta il colore del bottone sottile a default
            if(matrix[i1][j1].style.backgroundColor === defaultSquarebuttonsColor || matrix[i2][j2].style.backgroundColor === defaultSquarebuttonsColor){
                button.style.backgroundColor = defaultThinbuttonsColor;
            }else if( matrix[i1][j1].style.backgroundColor !== matrix[i2][j2].style.backgroundColor){
                button.style.backgroundColor = selectedThinbuttonsColor;
            }else{
                //alrimenti imposta il colore del bottone sottile con il colore dei bottoni quadrati adiacenti
                button.style.backgroundColor = matrix[i1][j1].style.backgroundColor;
            }
        }else{
            //se il bottone è nero, allora controlla se i bottoni quadrati adiacenti hanno lo stesso colore
            if(matrix[i1][j1].style.backgroundColor === matrix[i2][j2].style.backgroundColor && matrix[i1][j1].style.backgroundColor !== defaultSquarebuttonsColor){
                button.style.backgroundColor = matrix[i1][j1].style.backgroundColor;
            }
        
            
        }
    });
}

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

export function handleColorDivClick() {
    //se ci sono bottoni che stanno 
    selectedColor = this.style.backgroundColor;
}

export function handleEraserIconClick() {
    selectedColor = null;
}

function resetColor(){
    //resetta il colore attuale
    selectedColor = null;

    //esegui un ciclo su tutti i bottoni quadrati
    matrix.forEach(row => {
        row.forEach(cell => {
            // Resetta il colore del bottone quadrato
            cell.style.backgroundColor = defaultSquarebuttonsColor;
        });
    });
}

function saveState(){
    // Crea un array per salvare lo stato dei bottoni quadrati
    let squareButtonsState = [];

    // Attraversa la matrice e salva lo stato di ogni bottone quadrato
    matrix.forEach((row, y) => {
        row.forEach((cell, x) => {
            squareButtonsState.push({
                x: x,
                y: y,
                color: cell.style.backgroundColor
            });
        });
    });

    // Salva lo stato dei bottoni quadrati in localStorage
    localStorage.setItem('matrixPrev', JSON.stringify(squareButtonsState));

    // Crea un array per salvare lo stato dei bottoni sottili
    let thinButtonsState = [];

    // Attraversa thinButtonsMap e salva lo stato di ogni bottone sottile
    for (let [id, button] of thinButtonsMap) {
        thinButtonsState.push({
            id: id,
            selected: button.style.backgroundColor === selectedThinbuttonsColor
        });
    }

    // Salva lo stato dei bottoni sottili in localStorage
    localStorage.setItem('thinButtonsMapPrev', JSON.stringify(thinButtonsState));

    // Salva le mosse rimanenti
    localStorage.setItem('leftMovesPrev', leftMoves.toString());
}

export async function restoreState(){
    // Ripristina lo stato dei bottoni sottili
    const thinButtonsState = localStorage.getItem('thinButtonsMapPrev');
    if (thinButtonsState) {
        const thinButtonsStateObj = JSON.parse(thinButtonsState);
        for (let buttonState of thinButtonsStateObj) {
            if (buttonState.selected) {
                thinButtonsMap.get(buttonState.id).style.backgroundColor = selectedThinbuttonsColor;
            } else {
                thinButtonsMap.get(buttonState.id).style.backgroundColor = defaultThinbuttonsColor;
            }
        }
    }

    // Ripristina lo stato dei bottoni quadrati
    const squareButtonsState = localStorage.getItem('matrixPrev');
    if (squareButtonsState) {
        const squareButtonsStateObj = JSON.parse(squareButtonsState);
        squareButtonsStateObj.forEach(buttonState => {
            matrix[buttonState.y][buttonState.x].style.backgroundColor = buttonState.color;
        });
    }

    // Ripristina le mosse rimanenti
    leftMoves = parseInt(localStorage.getItem('leftMovesPrev'), 10);
}

export function handleRestartIconClick(){
    initializeLeftMoves();
    resetColor();
    loadThinButtonsStartConfig();
}

export function handleUndoIconClick(){
    restoreState();
    fillThinButtons();
    displayLeftMoves();
}

export async function initializeLeftMoves() {
    try {
        const response = await fetch(leftMovesPath);
        const movesData = await response.json();
        leftMoves = movesData.leftMoves;
        displayLeftMoves();
    } catch (error) {
        console.error('Si è verificato un errore:', error);
    }
}

function displayLeftMoves() {
    const movesLeftDiv = parent.document.getElementById('movesLeftLabel');
    movesLeftDiv.textContent = leftMoves;
}

export async function initializeFinalConfig() {
    try {
        // Ottieni i dati dal file JSON
        const response = await fetch(finalColorConfigPath);
        const data = await response.json();

        // Resetta finalConfigMatrix
        finalConfigMatrix = [];

        // Itera sui dati
        for (let item of data) {
            // Se la riga corrispondente all'indice y non esiste ancora, creala
            if (!finalConfigMatrix[item.x]) {
                finalConfigMatrix[item.x] = [];
            }

            // Aggiungi il colore alla posizione corrispondente nella matrice
            finalConfigMatrix[item.x][item.y] = item.color === "default" ? defaultSquarebuttonsColor : item.color;
        }

        
    } catch (error) {
        console.error('Si è verificato un errore:', error);
    }
}

function checkColorsMatch() {

    //fai il controllo solo se rimangono un certo numero di mosse 
    if(leftMoves < 5){
        // Assicurati che matrix e finalConfigMatrix abbiano la stessa dimensione
        if (matrix.length !== finalConfigMatrix.length) {
            return false;
        }

        // Itera su ciascun elemento della matrice
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i].length !== finalConfigMatrix[i].length) {
                return false;
            }

            for (let j = 0; j < matrix[i].length; j++) {
                // Ottieni il colore dell'elemento in matrix
                let matrixColor = matrix[i][j].style.backgroundColor;

                // Ottieni il colore corrispondente in finalConfigMatrix
                let finalConfigColor = finalConfigMatrix[i][j];

                // Se i colori non corrispondono, restituisci false
                if (matrixColor !== finalConfigColor) {
                    
                    return false;
                }
            }
        }

        //stampa su console per ora
        console.log("Passed!!")

        //riempi i bottoni sottili
        fillThinButtonsAtEnd();

        //effettua la richiesta al server per registrare sul db che l'utente ha completato il livello
        handleLevelCompletion();

        // Se tutti i colori corrispondono, restituisci true
        return true;

    }
    
}

async function handleLevelCompletion(){

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

    fetch('/api/passed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            levelNumber: levelNumber,
            levelNation: levelNation,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Imposta il cookie
        var date = new Date();
        date.setTime(date.getTime() + (10 * 1000)); // 10 secondi
        var expires = "; expires=" + date.toUTCString();
        document.cookie = `justPassed=${levelNumber}` + expires + "; path=/";

        parent.document.querySelector('#content').classList.add('blur-effect');
        parent.document.querySelector('.level-completion-div').style.display = 'flex';

        // Reindirizza l'utente alla pagina dei livelli
        //window.top.location.href = `/journey/${levelNation}`;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}





