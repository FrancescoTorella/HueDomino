
import { defaultSquarebuttonsColor, defaultThinbuttonsColor,rows,cols } from './constants.js';
import{ matrix, thinButtonsMap } from './data.js';

//Tiene traccia delle combinazioni di colori
let colorCombinations = {};

//Tiene traccia dello stato del mouse
let mouseDown = false;

//colore dei bottoni sottili selezionati
let selectedThinbuttonsColor = 'white';

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
        if (pulsingButton === null) {
            this.classList.add('pulsing');
            pulsingButton = button;
        } else {
            // Altrimenti, rimuovi la classe 'pulsing' dal bottone che sta pulsando
            pulsingButton.classList.remove('pulsing');
            

           

            //se il bottone cliccato è vicino al bottone pulsante allora invoca fillArea
            let ic = button.getAttribute('data-row');
            let jc = button.getAttribute('data-col');

            let ip = pulsingButton.getAttribute('data-row');
            let jp = pulsingButton.getAttribute('data-col');
            pulsingButton = null;
            console.log(ic,jc,ip,jp);
            if(ic==ip+1 && jc==jp || ic==ip && jc==jp+1 || ic==ip-1 && jc==jp || ic==ip && jc==jp-1){
                let oldColor1 = matrix[ic][jc].style.backgroundColor;
                let oldColor2 = matrix[ip][jp].style.backgroundColor;
                if(oldColor1 != oldColor2){
                    fillArea(ic, jc, oldColor2,1);
                    fillArea(ip, jp, oldColor1,1);
                    fillThinButtons();
                }
            }
        }

        // Impedisci che l'evento si propaghi al document
        event.stopPropagation();
    };
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

export async function loadColorCombinations() {
    const response = await fetch('color-combinations.json');
    const data = await response.json();

    for (let combination of data) {
        let color1 = combination.color1.toLowerCase().trim();
        let color2 = combination.color2.toLowerCase().trim();
        let result = combination.result.toLowerCase().trim();

        colorCombinations[`${color1}${color2}`] = result;
        colorCombinations[`${color2}${color1}`] = result;
    }
}



//Funzione principale per l'espanzione del colore
export function fillArea(i, j, color,maxCells = 1024) {
    console.log(i,j);
    let visited = new Set();
    let queue = [{i: i, j: j, distance: 0}];

    while (queue.length > 0) {
        let {i, j, distance} = queue.shift();

        if (!visited.has(matrix[i][j])) {
            visited.add(matrix[i][j]);

            let oldColor = matrix[i][j].style.backgroundColor;
            let newColor = combineColors(oldColor, color);


            // Se il colore corrente è uguale al nuovo colore, continua al prossimo ciclo

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
    console.log(parseInt(i1),parseInt(j1),parseInt(i2),parseInt(j2));
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
        let i1 = parseInt(button.getAttribute('data-row1'));
        let j1 = parseInt(button.getAttribute('data-col1'));
        let i2 = parseInt(button.getAttribute('data-row2'));
        let j2 = parseInt(button.getAttribute('data-col2'));

        if( matrix[i1][j1].style.backgroundColor !== matrix[i2][j2].style.backgroundColor){
            button.style.backgroundColor = selectedThinbuttonsColor;
        }else{
            //alrimenti imposta il colore del bottone sottile con il colore dei due bottoni
            button.style.backgroundColor = matrix[i1][j1].style.backgroundColor;
        }
    });
}