document.addEventListener('DOMContentLoaded', function() {
    // Funzione per aggiustare la dimensione del right box
    function adjustRightBoxSize() {
        const rightBox = document.querySelector('.right-box-container');
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (width <= 600) {
            rightBox.style.top = "25vh"
            rightBox.style.width = "95vw"
        } else if (width > 600 && width <= 800) {
            rightBox.style.width = "90vw";
            rightBox.style.top = "25vh"
        } else if (width >= 800 && width <= 900) {
            rightBox.style.width = "90vw";
            rightBox.style.top = "25vh"
        }else if (width >900 && width <= 1000) { 
            rightBox.style.width = "90vw";
            rightBox.style.top = "25vh"
        }else if (width > 1000 && width <= 1500) {
            rightBox.style.top = "20vh"
            rightBox.style.width = "60vw";
        }else if (width > 1500 && width <= 2000) {
            rightBox.style.width = "50vw"; 
            rightBox.style.top = "20vh"
        }else if (width > 2000 && width <= 2500) {
            rightBox.style.width = "50vw";
            rightBox.style.top = "20vh"
        }else if (width > 2500 && width <= 3000) {
            rightBox.style.width = "45vw";
            rightBox.style.top = "20vh"
        } else {
            rightBox.style.width = "40vw";
            rightBox.style.top = "20vh"
        }
    }

    // Ascolta per cambiamenti di dimensione della finestra
    window.addEventListener('resize', adjustRightBoxSize);

    // Chiamata iniziale per impostare le dimensioni al caricamento della pagina
    adjustRightBoxSize();
});
