let mouseDown = false;

// Dichiarazione e inizializzazione della variabile currentColor
let currentColor = 'white';


// Dichiarazione della variabile selectedColor
let selectedColor = null;

// Dichiarazione dell'array selectedButtons
let selectedButtons = [];
// Crea una matrice vuota
let matrix = [];
const rows = 32;
const cols = 32;

// Variabile globale per la modalità di selezione
let selectionMode = false;

// Variabile globale per la modalità di selezione del bordo
let borderSelectionMode = 'top';


document.addEventListener("DOMContentLoaded", function() {
    const buttonGrid = document.getElementById("buttonGrid");
    

    

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            const button = document.createElement("button");
            button.classList.add("grid-button");
            buttonGrid.appendChild(button);
            row.push(button);
    
            if (j < cols - 1) {
                const thinButton = document.createElement("button");
                thinButton.classList.add("vertical-thin-button");
                buttonGrid.appendChild(thinButton);
            }
        }
        matrix.push(row);
    
        if (i < rows - 1) {
            const horizontalThinButtonsDiv = document.createElement("div");
            horizontalThinButtonsDiv.classList.add("horizontal-thin-buttons-area");
    
            for (let j = 0; j < cols; j++) {
                const thinButton = document.createElement("button");
                thinButton.classList.add("horizontal-thin-button");
                horizontalThinButtonsDiv.appendChild(thinButton);
            }
    
            buttonGrid.appendChild(horizontalThinButtonsDiv);
        }
    }
    
        

    

    // Aggiungi un gestore di eventi per il rilascio del clic
    document.addEventListener("mouseup", function() {
        mouseDown = false;
    });
    
    // Supponendo che il tuo pulsante di reset abbia l'id "resetButton"
    document.getElementById('resetButton').addEventListener('click', function() {
        // Supponendo che i tuoi bottoni abbiano la classe "button"
        var buttons = document.getElementsByClassName('grid-button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = 'white';
            buttons[i].dataset.color = 'white';
            // Ripristina il bordo del bottone
            buttons[i].style.border = buttons[i].dataset.originalBorder;
        }
        // Svuota l'array selectedButtons
        selectedButtons = [];
    });

    // Quando selezioni un colore
    document.getElementById('blueButton').addEventListener('click', function() {
        // Disattiva la modalità di selezione
        selectionMode = false;
        // Imposta il colore selezionato
        selectedColor = 'blue';
    });

    document.getElementById('redButton').addEventListener('click', function() {
        // Disattiva la modalità di selezione
        selectionMode = false;
        // Imposta il colore selezionato
        selectedColor = 'red';
    });

    // Quando selezioni il verde
    document.getElementById('greenButton').addEventListener('click', function() {
        // Disattiva la modalità di selezione
        selectionMode = false;
        // Imposta il colore selezionato
        selectedColor = 'green';
    });

    // Quando selezioni "Modalità di selezione"
    document.getElementById('selectButton').addEventListener('click', function() {
        // Attiva la modalità di selezione
        selectionMode = true;
        // Imposta il colore selezionato su null
        selectedColor = null;
    });

    // Quando selezioni "bordo superiore"
    document.getElementById('topSelectionMode').addEventListener('click', function() {
        borderSelectionMode = 'top';
    });
    
    // Quando selezioni "bordo inferiore"
    document.getElementById('bottomSelectionMode').addEventListener('click', function() {
        borderSelectionMode = 'bottom';
    });
    
    // Quando selezioni "bordo sinistro"
    document.getElementById('leftSelectionMode').addEventListener('click', function() {
        borderSelectionMode = 'left';
    });
    
    // Quando selezioni "bordo destro"
    document.getElementById('rightSelectionMode').addEventListener('click', function() {
        borderSelectionMode = 'right';
    });
    
    
});


// Definisci la funzione fillArea alla fine del tuo codice
function fillArea(i, j, color) {
    // Crea un set per i bottoni visitati
    let visited = new Set();

    // Crea una coda e aggiungi il bottone iniziale
    let queue = [{i: i, j: j}];

    // Mentre la coda non è vuota
    while (queue.length > 0) {
        // Rimuovi un bottone dalla coda
        let {i, j} = queue.shift();

        // Se il bottone non è stato selezionato e non è stato visitato
        if (!selectedButtons.includes(matrix[i][j]) && !visited.has(matrix[i][j])) {
            // Aggiungi il bottone ai bottoni visitati
            visited.add(matrix[i][j]);

            // Cambia il suo colore
            let oldColor = matrix[i][j].style.backgroundColor;
            let newColor = combineColors(oldColor, color);
            matrix[i][j].style.backgroundColor = newColor;

            // Aggiungi tutti i bottoni adiacenti alla coda
            if (i > 0) queue.push({i: i - 1, j: j});
            if (j > 0) queue.push({i: i, j: j - 1});
            if (i < rows - 1) queue.push({i: i + 1, j: j});
            if (j < cols - 1) queue.push({i: i, j: j + 1});
        }
    }
}

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

