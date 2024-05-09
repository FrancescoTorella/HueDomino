document.addEventListener('DOMContentLoaded', function() {
    var iconContainers = document.querySelectorAll('.mode-title-container');
    var dropdownMenu = document.querySelector('#dropdownHeaderMenu');
    var pageContainer = document.querySelector('#pageContentContainer');
    var dropdownImage = dropdownMenu.querySelector('.mode-icon');
    var menuIcon = document.getElementById('menuIcon');
    var menuContainer = document.getElementById('writtenModesDropdownContainer');
    var menu = document.querySelector('.dropdown-header-menu');
    var menuIsOpen = false;
    var dropdownText = document.getElementById('dropdown-text');
    var dropdownMenuHTML = `
    <div class="column">
        <a href="/journey/italy"><p>Italy</p></a>
        <a href="/journey/usa"><p>USA</p></a>
        <a href="/journey/japan"><p>Japan</p></a>
        <a href="/journey/iceland"><p>Iceland</p></a>
    </div>
    <div class="column">
        <a href="/journey/australia"><p>Australia</p></a>
        <a href="/journey/france"><p>France</p></a>
        <a href="/journey/argentina"><p>Argentina</p></a>
        <a href="/journey/canada"><p>Canada</p></a>
    </div>
`;

    var hideDropdownMenu = function() {
        /* Verifica se il mouse è ancora sopra #dropdownMenu prima di nasconderlo */
        if (!dropdownMenu.matches(':hover')) {
            menu.classList.add('closing');
            menuIsOpen = false;
            setTimeout(function() {
                if (!menuIsOpen) {
                    dropdownMenu.style.display = 'none'; /* Nasconde completamente il menu a tendina */
                    pageContainer.style.filter = 'none'; /* Rimuove il filtro di sfocatura */
                }
            }, 500); // 500ms è la durata della tua animazione
        }
    };

    iconContainers.forEach(function(iconContainer) {
        iconContainer.addEventListener('mouseenter', function() {
            if (!menuIsOpen) {
                dropdownMenu.style.display = 'block'; 
                pageContainer.style.filter = 'blur(5px)'; /* Applica un filtro di sfocatura al contenuto della pagina */
                menu.classList.remove('closing');
                menuIsOpen = true;

            /* Cambia l'immagine nel menu a tendina in base all'elemento su cui il mouse è passato sopra */
            var iconLabelElement = iconContainer.querySelector('.mode-title');
            if (iconLabelElement) {
                var iconLabel = iconLabelElement.textContent;
                if (iconLabel === 'Mondi') {
                    var iconLabelElementRect = iconLabelElement.getBoundingClientRect();
                    var marginLeft = iconLabelElementRect.left;
                    dropdownText.innerHTML = `
                    <div style="display: flex; justify-content: flex-start; margin-left: ${marginLeft}px; flex-wrap: wrap;">
                        ${dropdownMenuHTML}
                    </div>
            `;
                }
                else if (iconLabel === 'Login') {
                    var iconLabelElementRect = iconLabelElement.getBoundingClientRect();
                    var marginLeft = iconLabelElementRect.left;
                    dropdownText.innerHTML = `
                    <div style="display: flex; justify-content: flex-start; margin-left: ${marginLeft}px; flex-wrap: wrap;">
                        <div class="column">
                            <a href="/login"><p>Accedi</p></a>
                            <a href="/signin"><p>Registrati</p></a>
                        </div>
                    </div>
                `; 
                 }
                 else if (iconLabel === 'Profile') {
                    var iconLabelElementRect = iconLabelElement.getBoundingClientRect();
                    var marginLeft = iconLabelElementRect.left;
                    dropdownText.innerHTML = `
                    <div style="display: flex; justify-content: flex-start; margin-left: ${marginLeft}px; flex-wrap: wrap;">
                        <div class="column">
                            <a href="/profile#statistiche"><p>Statistiche</p></a>
                            <a href="/profile#impostazioni"><p>Impostazioni</p></a>
                            <a href="/profile#amici"><p>Amici</p></a>
                            <a href="/profile#avatar"><p>Avatar</p></a>
                            <a href="/profile#medaglie"><p>Medaglie</p></a>
                            <a href="/profile#livelli"><p>Livelli</p></a>
                        </div>
                    </div>
                `;
                 }
            }
        }
        });

        iconContainer.addEventListener('mouseleave', hideDropdownMenu);

        window.addEventListener('resize', function() {
            if (menuIsOpen) {
                var iconLabelElement = iconContainer.querySelector('.mode-title');
                if (iconLabelElement) {
                    var iconLabelElementRect = iconLabelElement.getBoundingClientRect();
                    var marginLeft = iconLabelElementRect.left;
                    var dropdownDiv = dropdownText.querySelector('div');
                    if (dropdownDiv) {
                        if (iconLabelElement.textContent === 'Mondi') {
                            dropdownDiv.style.marginLeft = marginLeft + 'px';
                        } else if (iconLabelElement.textContent === 'Login') {
                            dropdownDiv.style.marginLeft = marginLeft + 'px';
                        } else if (iconLabelElement.textContent === 'Profile') {
                            dropdownDiv.style.marginLeft = marginLeft  - 10 + 'px';
                        }
                    }
                }
            }
        });
    });

    /* Nasconde #dropdownMenu quando il mouse esce da esso */
    dropdownMenu.addEventListener('mouseleave', hideDropdownMenu);

    menuIcon.addEventListener('click', function() {
        var modeTitles = menuContainer.querySelectorAll('.mode-title');
    
        // Se il menu è aperto
        if (menuContainer.classList.contains('menu-container-open')) {
            // Chiudi il menu
            menuContainer.classList.add('menu-container-closing');
            // Aggiungi la classe 'fade-out' alle scritte
            modeTitles.forEach(function(modeTitle) {
                modeTitle.classList.add('fade-out');
            });
            // Ascolta l'evento animationend
            menuContainer.addEventListener('animationend', function() {
                // Solo dopo che l'animazione è terminata, rimuovi le classi
                menuContainer.classList.remove('menu-container-open');
                menuContainer.classList.remove('menu-container-closing');
                // Rimuovi la classe 'fade-out' dalle scritte
                modeTitles.forEach(function(modeTitle) {
                    modeTitle.classList.remove('fade-out');
                });
            }, { once: true }); // L'evento sarà rimosso dopo essere stato gestito una volta
            // Rimuovi la classe 'change' dall'icona del menu
            menuIcon.classList.remove('change');
        } else {
            // Altrimenti, apri il menu
            menuContainer.classList.remove('menu-container-closing');
            menuContainer.classList.add('menu-container-open');
            // Aggiungi la classe 'change' all'icona del menu
            menuIcon.classList.add('change');
        }
    });

    window.addEventListener('resize', function() {
        var dropdownMenu = document.getElementById('dropdownHeaderMenu');
        var dropdownContainer = document.getElementById('writtenModesDropdownContainer');
        if (window.innerWidth < 900) {
            dropdownMenu.style.display = 'none';
        }
    });

    window.addEventListener('resize', function() {
        var dropdownContainer = document.getElementById('writtenModesDropdownContainer');
        if (window.innerWidth > 900) {
            dropdownContainer.style.display = 'none';
        } 
    });

    window.addEventListener('scroll', function() {
        var header = document.querySelector('header');
        var dropdown = document.querySelector('.dropdown-header-menu');
        if (window.scrollY > 0) {
            header.classList.add('semi-transparent');
            dropdown.style.backgroundColor = 'rgba(100, 100, 100, 0.6)';
        } else {
            header.classList.remove('semi-transparent');
            dropdown.style.backgroundColor = 'rgba(100, 100, 100, 1)';
        }
    });

    window.addEventListener('load', async function() {
        // Cerca il cookie 'sessionId'
        const sessionId = document.cookie.split(';').find(item => item.trim().startsWith('sessionId='));
    
        if (sessionId) {
            // Estrai l'ID della sessione dal cookie
            const sessionIdValue = sessionId.split('=')[1];
    
            try {
                // Fai una richiesta al server per ottenere i dettagli della sessione
                const response = await fetch('/session/' + sessionIdValue);
                const session = await response.json();
    
                // Stampa i dettagli della sessione sulla console
                console.log('Dettagli della sessione:', session);
                const userId = session.user_id;
                const profileImagePath = '../immagini_profilo/user' + userId + '/profile.png';
                $('#loginButton').replaceWith('<div id="profileContainer" class="mode-title"><img id="profileImage" class="mode-title"><p class="mode-title" style="display: none;">Profile</p></div>');
                $.ajax({
                    type: 'HEAD',
                    url: profileImagePath,
                    success: function() {
                        // Se la richiesta ha successo, il percorso dell'immagine esiste
                        // Imposta l'attributo 'src' dell'immagine del profilo
                        $('#profileImage').attr('src', profileImagePath);
                        $('#profileImage').addClass('mode-title');
                    },
                    error: function() {
                        // Se la richiesta fallisce, il percorso dell'immagine non esiste
                        // Imposta l'attributo 'src' dell'immagine del profilo su un'immagine segnaposto
                        $('#profileImage').attr('src', '../immagini_profilo/default.png');
                        $('#profileImage').addClass('mode-title');
                    }
                });
                $('#profileImage').css({
                    'width': '2.5vw',  // Imposta la larghezza dell'immagine
                    'height': '2.5vw',  // Imposta l'altezza dell'immagine
                    'border-radius': '50%',  // Rende l'immagine circolare
                    'object-fit': 'cover'  // Assicura che l'immagine copra completamente l'area del cerchio
                });
                $('#profileImage').attr('onclick', 'window.location.href = "/profile"');
                var newElementSmall = $('<p>').text('Profilo').addClass('mode-title');
                $('#loginButtonSmall').empty().append(newElementSmall);
                $('#loginButtonSmall').attr('href', '/profile');
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('Il cookie sessionId non è stato trovato');
        }
    });
});