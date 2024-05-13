document.addEventListener('DOMContentLoaded', function() {
    var tutorialImage = document.getElementById('tutorialImage');
    var tutorialVideo = document.getElementById('tutorialVideo');
    var worldBox = document.getElementById('worldBox');
    var sky = document.getElementById('sky');
    var slogan = document.getElementById('slogan');
    var isMouseOver = false;
    var worldText = document.getElementById('worldText');
    var tutorialText = document.getElementById('tutorialText');


    tutorialImage.addEventListener('mouseover', function() {
        tutorialVideo.style.display = 'flex';
        slogan.style.display = 'none';
        sky.style.display = 'none';
        worldBox.style.display = 'none';
        tutorialImage.style.display = 'none';
        worldText.style.display = 'none';
        tutorialText.style.display = 'none';
        tutorialVideo.currentTime = 0;
        isMouseOver = true; 
    });

    tutorialVideo.addEventListener('mouseout', function() {
        tutorialVideo.style.display = 'none';
        slogan.style.display = 'flex';
        sky.style.display = 'flex';
        worldBox.style.display = 'flex';
        tutorialImage.style.display = 'flex';
        worldText.style.display = 'flex';
        tutorialText.style.display = 'flex';
        isMouseOver = false;
        tutorialVideo.currentTime = 0; 
    });

    document.addEventListener('click', function() {
        if (isMouseOver) {
            tutorialVideo.style.display = 'none';
            slogan.style.display = 'flex';
            sky.style.display = 'flex';
            worldBox.style.display = 'flex';
            tutorialImage.style.display = 'flex';
            worldText.style.display = 'flex';
            tutorialText.style.display = 'flex';
            isMouseOver = false;
            tutorialVideo.currentTime = 0; 
        }
    });

    worldBox.addEventListener('click', function() {
        window.location.href = '/viaggio/viaggio.html';
    });
});



//per aggiustare l'animazione dell'areoplano
function adjustBackgroundSize() {
    // Ottieni la larghezza e l'altezza della viewport
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // Ottieni l'elemento .sky-background
    var skyBackground = document.querySelector('.sky-background');

    // Se la larghezza della viewport non è almeno il doppio dell'altezza
    if (width < 1.8 * height) {
        // Imposta background-size a cover
        skyBackground.style.backgroundSize = 'cover';
    } else {
        // Altrimenti, imposta background-size a contain
        skyBackground.style.backgroundSize = 'contain';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Il tuo codice esistente...

    // Chiama adjustBackgroundSize quando la pagina viene caricata
    adjustBackgroundSize();

    // Chiama adjustBackgroundSize quando la pagina viene ridimensionata
    window.addEventListener('resize', adjustBackgroundSize);
});