document.addEventListener('DOMContentLoaded', function() {
	
    // Ascolta per cambiamenti di dimensione della finestra
    window.addEventListener('resize', adjustRightBoxSize);


    // Chiamata iniziale per impostare le dimensioni al caricamento della pagina
    adjustRightBoxSize();
  
});



 // Funzione per aggiustare la dimensione del right box
 function adjustRightBoxSize() {
    const pageContainer = document.querySelector('.page-container');
    const rightBox = document.querySelector('.right-box-container');
    const leftBox = document.querySelector('.left-box-container');
    const mapContainer = document.querySelector('.map-container');
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    if(height > 1.15*(width)){
        leftBox.style.display = "none";
        rightBox.style.overflow = "hidden";
        mapContainer.style.width = "100%";
        pageContainer.style.overflow = "hidden";
        rightBox.style.gridColumn = "1 / -1";
        rightBox.style.gridRow = "1 / -1";
        if(height > 2*(width)){
            var newHeight = (width / height *2) * 100;
            pageContainer.style.height = newHeight + "vh";
        }
        else{
            pageContainer.style.height = "99vh";
        }
    } else {
        leftBox.style.display = "flex"; // or the original value
        rightBox.style.overflow = "visible"; // or the original value
        mapContainer.style.width = "80%"; // or the original value
        pageContainer.style.overflow = "visible"; // or the original value
        rightBox.style.gridColumn =  "right";
        leftBox.style.gridColumn = "left";
    }

}


