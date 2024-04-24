
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


// Variabile per tenere traccia del bottone che sta pulsando
let pulsingButton = null;

// Funzione per gestire il click del bottone
export function handleButtonClick(button) {
   
    button.onclick = function(event) {
        // Se nessun altro bottone sta pulsando, fai pulsare questo bottone


        if(selectedColor === null){
            if (pulsingButton === null) {
                this.classList.add('pulsing');
                pulsingButton = button;
            } else {
                // Altrimenti, rimuovi la classe 'pulsing' dal bottone che sta pulsando
                pulsingButton.classList.remove('pulsing');
                
    
                
    
                //se il bottone cliccato è vicino al bottone pulsante allora invoca fillArea
                let ic = Number(button.getAttribute('data-row'));
                let jc = Number(button.getAttribute('data-col'));
    
                let ip = Number(pulsingButton.getAttribute('data-row'));
                let jp = Number(pulsingButton.getAttribute('data-col'));
                pulsingButton = null;
                if(ic==ip+1 && jc==jp || ic==ip && jc==jp+1 || ic==ip-1 && jc==jp || ic==ip && jc==jp-1){

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
                }
            }
        }else{
            let i = button.getAttribute('data-row');
            let j = button.getAttribute('data-col');
            fillArea(i,j,selectedColor);
            fillThinButtons();
        }

        

        // Impedisci che l'evento si propaghi al document
        event.stopPropagation();
        

    }
}



//annulla l'effetto di pulsing se viene premuta una qualunque altra parte dello schermo
export function handleDocumentClick() {
    // Trova tutti i bottoni che hanno la classe 'pulsing'
    let pulsingButtons = document.querySelectorAll('.pulsing');

    // Rimuovi la classe 'pulsing' da tutti i bottoni
    pulsingButtons.forEach(function(button) {
        button.classList.remove('pulsing');
    });
}

function getJsonData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore HTTP: " + response.status);
            }
            return response.json();
        });
}


export async function fillButtons(filename, matrix) {
    try {
        const response = await fetch(filename);
        const data = await response.json();

        const buttonColors = await getJsonData(filename);

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                const button = matrix[i][j];
                const color = buttonColors.find(bc => bc.coordinates[0] === i && bc.coordinates[1] === j).color;
                if (button && color) {
                    matrix[i][j].style.backgroundColor = color;
                }
            }
        }
    } catch (error) {
        console.error('Si è verificato un errore:', error);
    }
}

export async function loadThinButtonsStartConfig(filename) {
    try {
        const response = await fetch(filename);
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
        const response = await fetch('color-combinations.json');
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

//Funzione per colorare insieme di bottoni sottili
export function fillThinButtons(){
    // Seleziona i bottoni sottili dalla mappa thinButtonsMap
    const thinButtons = Array.from(thinButtonsMap.values());

    thinButtons.forEach(button => {
        //se il bottone non è nero, allora prendi i colori dei bottoni quadrati adiacenti
        if(button.style.backgroundColor !== selectedThinbuttonsColor){
            let i1 = parseInt(button.getAttribute('data-row1'));
            let j1 = parseInt(button.getAttribute('data-col1'));
            let i2 = parseInt(button.getAttribute('data-row2'));
            let j2 = parseInt(button.getAttribute('data-col2'));

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
    selectedColor = this.style.backgroundColor;
}

export function handleEraserIconClick() {
    selectedColor = null;
}
