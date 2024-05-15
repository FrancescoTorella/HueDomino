
// //Import
//import * as f from'./functions.js';
import{ matrix, thinButtonsMap } from './data.js';
import { defaultSquarebuttonsColor, defaultThinbuttonsColor,rows,cols } from './constants.js';
import * as f from './functions.js';



document.addEventListener("DOMContentLoaded", async function() {

    

    const buttonGrid = document.getElementById("buttonGrid");

    //aggiungi evento di click al documento per annullare l'effetto di pulsing
    parent.document.addEventListener("click",f.handleDocumentClick);
    await f.loadColorCombinations();
    await f.initializeLeftMoves();
    await f.initializeFinalConfig();

    //Crea una griglia di bottoni quadrati e bottoni sottili a seconda del numero di righe e colonne
    for (let i = 0; i < rows; i++) {
        // Crea una riga della matrice
        let row = [];

        //crea i bottoni quadrati e i bottoni sottili orizzontali per una riga

        //crea una riga per bottoni quadrati e sottili verticali
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("big-row");
        for (let j = 0; j < cols; j++) {
            //crea un bottone quadrato
            const button = document.createElement("div");
            button.classList.add("square-button");

            //assegna l'evento di gestione del click
            f.handleButtonClick(button);

            //assegna le coordinate al bottone
            button.setAttribute('data-row', i);
            button.setAttribute('data-col', j);
            

            //aggiungilo alla riga
            rowDiv.appendChild(button);

            // Imposta il colore di default per il bottone
            button.style.backgroundColor = defaultSquarebuttonsColor;

            // Aggiungi il bottone alla matrice
            row.push(button);

            //se non è l'ultima colonna crea un bottone sottile verticale
            if (j < cols - 1) {
                const thinButton = document.createElement("div");
                thinButton.classList.add("thin-button");
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

                //aggiungilo alla riga
                rowDiv.appendChild(thinButton);
            }
        }

        //aggiungi la riga alla matrice
        matrix.push(row);

        //aggiungi la riga al div della griglia
        buttonGrid.appendChild(rowDiv);

        //se non è l'ultima riga crea una riga di bottoni sottili orizzontali
        if (i < rows - 1) {
            //crea un div per i bottoni sottili orizzontali
            const horizontalThinButtonsDiv = document.createElement("div");
            horizontalThinButtonsDiv.classList.add("thin-row");
            //crea i bottoni sottili orizzontali per una riga
            for (let j = 0; j < cols; j++) {
                const thinButton = document.createElement("div");
                thinButton.classList.add("thin-button");
                thinButton.classList.add("horizontal-thin-button");

                // Assegna un ID al bottone sottile in base alle coordinate dei bottoni quadrati adiacenti
                thinButton.id = 'h-border-' + i + '-' + j +'-' + (i+1) + '-' + j;

                // Imposta il colore di default per il bottone sottile
                thinButton.style.backgroundColor = defaultThinbuttonsColor;

                // Aggiungi il bottone sottile alla mappa
                thinButtonsMap.set(thinButton.id, thinButton);

                // Assegna due coppie di attributi per indicare le coordinate dei bottoni quadrati adiacenti
                thinButton.setAttribute('data-row1', i);
                thinButton.setAttribute('data-col1', j);
                thinButton.setAttribute('data-row2', i + 1);
                thinButton.setAttribute('data-col2', j);
                
                //aggiungilo alla riga
                horizontalThinButtonsDiv.appendChild(thinButton);
            }

            //aggiungi il div dei bottoni sottili orizzontali al div della griglia
            buttonGrid.appendChild(horizontalThinButtonsDiv);
        }
    }


    let firstColorDiv = parent.document.getElementById('firstColorDiv');
    firstColorDiv.addEventListener("click", f.handleColorDivClick);

    let secondColorDiv = parent.document.getElementById('secondColorDiv');
    secondColorDiv.addEventListener("click", f.handleColorDivClick);

    let thirdColorDiv = parent.document.getElementById('thirdColorDiv');
    thirdColorDiv.addEventListener("click", f.handleColorDivClick);

    //assegna evento all'eraser
    let eraser = parent.document.getElementById('eraseIcon');
    eraser.addEventListener("click", f.handleEraserIconClick);

    //assegna evento a reload
    let restart = parent.document.getElementById('restartIcon');
    restart.addEventListener("click", f.handleRestartIconClick);

    //assegna evento ad undo
    let undo = parent.document.getElementById('undoIcon');
    undo.addEventListener("click",f.handleUndoIconClick);
    

    f.loadThinButtonsStartConfig();

});

