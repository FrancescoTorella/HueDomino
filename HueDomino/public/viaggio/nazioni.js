var currentIndex = 0;



function mouseOverEffect() {
    this.style.opacity = '1';
    this.style.filter = 'blur(0px)';
}

function mouseOutEffect() {
    this.style.opacity = '0.4';
    this.style.filter = 'blur(4px)';
}





document.addEventListener("DOMContentLoaded", function() {
    const nations = document.querySelectorAll('.nation');
    const body = document.body; // Ottieni un riferimento all'elemento <body> del documento
    var totalNations = nations.length;

    function setupCarousel(){
        var prec; var succ;
        if(currentIndex == 0)
            prec = nations.length - 1;
        else
            prec = currentIndex - 1;
        if(currentIndex == nations.length - 1)
            succ = 0;
        else
            succ = currentIndex + 1;
        // Nascondi tutte le nazioni tranne quelle con data-index 0, 1 e 7

        if(currentIndex != 0 && currentIndex != nations.length - 1) {
            nations.forEach(nation => {
                const index = parseInt(nation.getAttribute('data-index'));
                const nationTitle = nation.querySelector('.nation-title'); // Ottieni un riferimento all'elemento nation-title

                if (index == currentIndex) {
                    nation.style.transform = 'translateX(0%) scale(1)'; // Centrale
                    nation.style.display = 'flex';
                    nation.style.opacity = '1';
                    nation.style.filter = 'blur(0px)';
                    nation.removeEventListener('mouseover', mouseOverEffect);
                    nation.removeEventListener('mouseout', mouseOutEffect);
                    //Cambio lo sfondo
                    const nationId = nation.getAttribute('id');
                    body.style.backgroundImage = `url('/viaggio/${nationId}/${nationId}Background.png')`;
                    body.style.backgroundSize = 'cover'; // Imposta l'immagine di sfondo per coprire l'intero elemento body
                    nationTitle.style.display = 'flex';

                } else if (index == succ) {
                    nation.style.transform = 'translateX(30%) scale(0.2)'; // Destra
                    nation.style.display = 'flex';
                    nation.style.opacity = '0.4';
                    nation.style.filter = 'blur(4px)';
                    nation.addEventListener('mouseover', mouseOverEffect);
                    nation.addEventListener('mouseout', mouseOutEffect);
                    nationTitle.style.display = 'none'; // Nascondi il titolo della nazione
                   
                } else if (index == prec ) {
                    nation.style.transform = 'translateX(-30%) scale(0.2)'; // Sinistra
                    nation.style.display = 'flex';
                    nation.style.opacity = '0.4';
                    nation.style.filter = 'blur(4px)';
                    nation.addEventListener('mouseover', mouseOverEffect);
                    nation.addEventListener('mouseout', mouseOutEffect)
                    nationTitle.style.display = 'none'; // Nascondi il titolo della nazione
                    
                } else {
                    nation.style.display = 'none';
                }
            });
        }
        
        else if(currentIndex == 0) {
            nations.forEach(nation => {
                const index = parseInt(nation.getAttribute('data-index'));
                const nationTitle = nation.querySelector('.nation-title'); // Ottieni un riferimento all'elemento nation-title

                if (index == currentIndex) {
                    nation.style.transform = 'translateX(100%) scale(1)'; // Centrale
                    nation.style.display = 'flex';
                    nation.style.opacity = '1';
                    nation.style.filter = 'blur(0px)';
                    nation.removeEventListener('mouseover', mouseOverEffect);
                    nation.removeEventListener('mouseout', mouseOutEffect);
                    //Cambio lo sfondo
                    const nationId = nation.getAttribute('id');
                    body.style.backgroundImage = `url('/viaggio/${nationId}/${nationId}Background.png')`;
                    body.style.backgroundSize = 'cover'; // Imposta l'immagine di sfondo per coprire l'intero elemento body
                    nationTitle.style.display = 'flex';
                    
                } else if (index == succ) {
                    nation.style.transform = 'translateX(130%) scale(0.2)'; // Destra
                    nation.style.display = 'flex';
                    nation.style.filter = 'blur(4px)';
                    nation.style.opacity = '0.4';
                    nation.addEventListener('mouseover', mouseOverEffect);
                    nation.addEventListener('mouseout', mouseOutEffect);
                    nationTitle.style.display = 'none'; // Nascondi il titolo della nazione
                    
                } else if (index == prec ) {
                    nation.style.transform = 'translateX(-230%) scale(0.2)'; // Sinistra
                    nation.style.display = 'flex';
                    nation.style.filter = 'blur(4px)';
                    nation.style.opacity = '0.4';
                    nation.addEventListener('mouseover', mouseOverEffect);
                    nation.addEventListener('mouseout', mouseOutEffect);
                    nationTitle.style.display = 'none'; // Nascondi il titolo della nazione
                    
                } else {
                    nation.style.display = 'none';
                }
            });
        }

        else if(currentIndex == nations.length - 1) {
            nations.forEach(nation => {
                const index = parseInt(nation.getAttribute('data-index'));
                const nationTitle = nation.querySelector('.nation-title'); // Ottieni un riferimento all'elemento nation-title

                if (index == currentIndex) {
                    nation.style.transform = 'translateX(-100%) scale(1)'; // Centrale
                    nation.style.display = 'flex';
                    nation.style.opacity = '1';
                    nation.style.filter = 'blur(0px)';
                    nation.removeEventListener('mouseover', mouseOverEffect);
                    nation.removeEventListener('mouseout', mouseOutEffect);
                    //Cambio lo sfondo
                    const nationId = nation.getAttribute('id');
                    body.style.backgroundImage = `url('/viaggio/${nationId}/${nationId}Background.png')`;
                    body.style.backgroundSize = 'cover'; // Imposta l'immagine di sfondo per coprire l'intero elemento body
                    nationTitle.style.display = 'flex';

                } else if (index == succ) {
                    nation.style.transform = 'translateX(230%) scale(0.2)'; // Destra
                    nation.style.display = 'flex';
                    nation.style.filter = 'blur(4px)';
                    nation.style.opacity = '0.4';
                    nation.addEventListener('mouseover', mouseOverEffect);
                    nation.addEventListener('mouseout', mouseOutEffect);  
                    nationTitle.style.display = 'none';

                } else if (index == prec ) {
                    nation.style.transform = 'translateX(-130%) scale(0.2)'; // Sinistra
                    nation.style.display = 'flex';
                    nation.style.filter = 'blur(4px)';
                    nation.style.opacity = '0.4';
                    nation.addEventListener('mouseover', mouseOverEffect);
                    nation.addEventListener('mouseout', mouseOutEffect);
                    nationTitle.style.display = 'none';

                } else {
                    nation.style.display = 'none';
                }
            });
        }

    }

    


    function handleScroll(event) {
        event.preventDefault();
        if (event.deltaY > 0) {
            currentIndex = (currentIndex + 1) % totalNations; // Scorri verso destra/basso
        } else {
            currentIndex = (currentIndex - 1 + totalNations) % totalNations; // Scorri verso sinistra/alto
        }
        setupCarousel();
    }

    const nationsContainer = document.querySelector('.nations-container');
    nationsContainer.addEventListener('click', function(event) {
        let target = event.target.closest('.nation'); // Ottieni l'elemento nazione più vicino che è stato cliccato
        if (!target || !nationsContainer.contains(target)) return; // Se non è una nazione, esci

        const index = parseInt(target.getAttribute('data-index'));
        if (index !== currentIndex) { // Agisci solo se la nazione cliccata non è quella centrale
            event.preventDefault(); // Impedisce il reindirizzamento alla pagina della nazione laterale
            currentIndex = index;
            setupCarousel();
        }
    });

    
    window.addEventListener('wheel', handleScroll, { passive: false });
    setupCarousel(); // Imposta il carousel al caricamento della pagina
});


