$(document).ready(function(){
    var animationCompleted = false; // Variabile per tenere traccia se l'animazione è stata completata
    var currentContent = "#statistiche";

    function checkWidth() {
        if ($(window).width() < 700) { // Se la larghezza dello schermo è inferiore a 700px
            if (!animationCompleted) { // Se il contenuto è visibile e l'animazione non è stata completata
                $(".content").hide().css({left: '100%'}); // Nascondi il contenuto
                $(".sidebar").show(); // Mostra la barra laterale
            }
        } else {

            animationCompleted = false; // Imposta la variabile animationCompleted a true

            if(animationCompleted) { // Se l'animazione è stata completata
                $(".sidebar").show().css({left: '0'}); // Mostra la barra laterale
                //$(".content").show().css({left: '0'}); // Mostra il contenuto
            }else{
                $(".sidebar").show().css({left: '0'}); // Mostra la barra laterale
                $(currentContent).show().css({left: '0'});
            }

        }
    }

    checkWidth(); // Esegui la funzione checkWidth all'apertura della pagina

    $(window).resize(function() {
        checkWidth(); // Esegui la funzione checkWidth quando la finestra viene ridimensionata
    });

    $(".sidebar a").click(function(event){
        event.preventDefault(); // Previene l'azione predefinita del click
        var id = $(this).attr('href'); // Ottieni l'ID dell'elemento cliccato
        currentContent= id;
        if ($(window).width() < 700) { // Se la larghezza dello schermo è inferiore a 700px
            $(".sidebar").css({left: '0'}).animate({left: '-100%'}, 500, function() { // Anima la barra laterale spostandola a sinistra
                $(this).hide(); // Nascondi la barra laterale dopo che l'animazione è completata
                animationCompleted = true; // Imposta la variabile animationCompleted a true
            });
            $(".content").hide(); // Nascondi tutti i contenuti
            $(id).show().animate({left: '0'}, 500); // Mostra il contenuto corrispondente e anima il suo ritorno
        }
        $(".content").hide(); // Nascondi tutti i contenuti
        $(id).show().css({left: '0'}); // Mostra il contenuto corrispondente e anima il suo ritorno

    });

    $(".back-button").click(function(){ // Quando si fa clic sul pulsante "Indietro"
        if ($(window).width() < 700) { // Se la larghezza dello schermo è inferiore a 700px // Imposta la variabile animationCompleted a false
            
            $(".content").css({left: '0'}).animate({left: '100%'},500, function() {
                $("content").hide();
            }); // Nascondi tutti i contenuti
            //$(".content").hide(); // Nascondi tutti i contenuti
            $(".sidebar").show().css({left: '-100'}).animate({left: '0'});
            animationCompleted = false;
        }
    });
});