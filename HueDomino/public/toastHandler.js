
console.log = function(message) {
    localStorage.setItem('flashMessage', message);
};

// Salva "prova" come messaggio flash
// localStorage.setItem('flashMessage', 'prova');


document.addEventListener('DOMContentLoaded', function() {
    
    // All'inizio di ogni pagina, controlla se esiste un messaggio flash
    var flashMessage = localStorage.getItem('flashMessage');

    if (flashMessage) {
        // Se esiste un messaggio flash, mostra un toast di Bootstrap
        // toastHandler.js
        var toast = $(`
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" style="position: fixed; top: 4px; right: 4px; z-index: 9999; width: 350px; border: 5px solid darkslategray; border-radius: 0;">
                <div class="toast-header" style="background-color: khaki;">
                    <span style="display: inline-block; width: 20px; height: 20px; background-color: purple; margin-right: 5px;"></span>
                    <strong class="mr-auto" style="font-size: 1.5em;">Hue Domino</strong>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" style="position: absolute; right: 10px; font-size: 1.5em; width: 30px; border: 3px solid black">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body" style="font-size: 1.2em; background-color: rgba(255, 255, 0, 0.3);">
                    ${flashMessage}
                </div>
                
            </div>
        `);

        
        $('body').append(toast);
        toast.toast('show');

        setTimeout(function() {
            toast.toast('hide');
        }, 5000);

        toast.on('hidden.bs.toast', function() {
            toast.remove();
        });

        // Rimuove il messaggio flash dal localStorage
        localStorage.removeItem('flashMessage');
    }
});

