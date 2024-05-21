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
    const nationsContainer = document.querySelector('.page-container');
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

        nations.forEach(nation => {
            const index = parseInt(nation.getAttribute('data-index'));
            const nationTitle = nation.querySelector('.nation-title'); // Ottieni un riferimento all'elemento nation-title

            if (index == currentIndex) {
                nation.style.display = 'flex';
                nation.style.opacity = '1';
                nation.style.filter = 'blur(0px)';
                nation.removeEventListener('mouseover', mouseOverEffect);
                nation.removeEventListener('mouseout', mouseOutEffect);
                //Cambio lo sfondo
                const nationId = nation.getAttribute('id');
                body.style.backgroundImage = `url('/viaggio/${nationId}/${nationId}Background.png')`;
                nationTitle.style.display = 'flex';
                nation.style.gridArea = 'center';
                
            } else if (index == succ) {
                nation.style.display = 'flex';
                nation.style.filter = 'blur(4px)';
                nation.style.opacity = '0.4';
                nation.addEventListener('mouseover', mouseOverEffect);
                nation.addEventListener('mouseout', mouseOutEffect);
                nationTitle.style.display = 'none'; // Nascondi il titolo della nazione
                nation.style.gridArea = 'right';
                
            } else if (index == prec ) {
                nation.style.display = 'flex';
                nation.style.filter = 'blur(4px)';
                nation.style.opacity = '0.4';
                nation.addEventListener('mouseover', mouseOverEffect);
                nation.addEventListener('mouseout', mouseOutEffect);
                nationTitle.style.display = 'none'; // Nascondi il titolo della nazione
                nation.style.gridArea = 'left';
                
            } else {
                nation.style.display = 'none';
            }
        });
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

    nationsContainer.addEventListener('click', function(event) {
        let target = event.target.closest('.nation img'); // Ottieni l'elemento img più vicino che è stato cliccato
    if (!target) return; // Se non è un'immagine, esci

    let nation = target.closest('.nation'); // Ottieni l'elemento nazione più vicino
    if (!nation || !nationsContainer.contains(nation)) return; // Se non è una nazione, esci

    const index = parseInt(nation.getAttribute('data-index'));
    if (index !== currentIndex) { // Agisci solo se la nazione cliccata non è quella centrale
        event.preventDefault(); // Impedisce il reindirizzamento alla pagina della nazione laterale
        currentIndex = index;
        setupCarousel();
    } else {
        // Se è la nazione centrale, reindirizza
        window.location.href = `/journey/${nation.id}`;
    }
    });
    
    window.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowRight':
                currentIndex = (currentIndex + 1) % totalNations; // Scorri verso destra
                break;
            case 'ArrowLeft':
                currentIndex = (currentIndex - 1 + totalNations) % totalNations; // Scorri verso sinistra
                break;
            case 'Enter':
                const centralNation = document.querySelector('.nation[data-index="' + currentIndex + '"]');
                if (centralNation) {
                    window.location.href = `/journey/${centralNation.id}`;
                }
                break;
            default:
                return; // Esci se il tasto premuto non è una freccia destra o sinistra
        }
        setupCarousel();
    });
    

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('resize', adjustSize);
    setupCarousel(); // Imposta il carousel al caricamento della pagina
    adjustSize();
});



function adjustSize(){
    const pageContainer = document.querySelector('.page-container');
    const nationImages = document.querySelectorAll('.nation img');
    const nationTitles = document.querySelectorAll('.nation-title');
    const width = window.innerWidth;
    const height = window.innerHeight;

    if(width > 1.8*height && width < 3.7*height){
        nationImages.forEach(function(nationImage) {
            nationImage.style.width = '25%';
        });
        nationTitles.forEach(function(nationTitle) {
            nationTitle.style.fontSize = '7vw';
        });
    }
    
    else if(width > 3.7*height){
        nationImages.forEach(function(nationImage) {
            nationImage.style.width = '14%';
        });
        nationTitles.forEach(function(nationTitle) {
            nationTitle.style.fontSize = '3vw';
        });
    }
    else{
        if(height > 1.8*width){
            nationImages.forEach(function(nationImage) {
                nationImage.style.width = '65%';
            });
            nationTitles.forEach(function(nationTitle) {
                nationTitle.style.fontSize = '13vw';
            });
        }
        else{
            nationImages.forEach(function(nationImage) {
                nationImage.style.width = '47%';
            });
            nationTitles.forEach(function(nationTitle) {
                nationTitle.style.fontSize = '11vw';
            });
        }
    }
    
}
