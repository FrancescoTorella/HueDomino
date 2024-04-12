document.addEventListener('DOMContentLoaded', function() {
    var iconContainers = document.querySelectorAll('.icon-container');
    var dropdownMenu = document.querySelector('#dropdownMenu');
    var pageContainer = document.querySelector('#pageContentContainer');
    var dropdownImage = dropdownMenu.querySelector('.mode-icon');

    var hideDropdownMenu = function() {
        /* Verifica se il mouse è ancora sopra #dropdownMenu prima di nasconderlo */
        if (!dropdownMenu.matches(':hover')) {
            dropdownMenu.style.display = 'none'; /* Nasconde completamente il menu a tendina */
            pageContainer.style.filter = 'none'; /* Rimuove il filtro di sfocatura */
        }
    };

    iconContainers.forEach(function(iconContainer) {
        iconContainer.addEventListener('mouseenter', function() {
            dropdownMenu.style.display = 'block';
            pageContainer.style.filter = 'blur(5px)'; /* Applica un filtro di sfocatura al contenuto della pagina */

            /* Cambia l'immagine nel menu a tendina in base all'elemento su cui il mouse è passato sopra */
            var iconLabel = iconContainer.querySelector('.icon-label').textContent;
            if (iconLabel === 'Creatore') {
                dropdownImage.src = '/src/images/IconaCreatore4.png';
                dropdownImage.dataset.link = '/src/html/creatore.html';
            } else if (iconLabel === 'Duello') {
                dropdownImage.src = '/src/images/IconaDuello3.png';
                dropdownImage.dataset.link = '/src/html/duello.html';
            } else if (iconLabel === 'Sfida Giornaliera') {
                dropdownImage.src = '/src/images/IconaSfidaGiornaliera2.png';
                dropdownImage.dataset.link = '/src/html/sfida_giornaliera.html';
            } else if (iconLabel === 'Viaggio') {
                dropdownImage.src = '/src/images/IconaViaggioGame1.png';
                dropdownImage.dataset.link = '/src/html/viaggio.html';
            }
        });

        iconContainer.addEventListener('mouseleave', hideDropdownMenu);
    });

    /* Nasconde #dropdownMenu quando il mouse esce da esso */
    dropdownMenu.addEventListener('mouseleave', hideDropdownMenu);

    /* Cambia la posizione della finestra quando l'immagine nel menu a tendina viene cliccata */
    dropdownImage.addEventListener('click', function() {
        window.location.href = dropdownImage.dataset.link;
    });
});