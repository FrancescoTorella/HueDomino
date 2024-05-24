# Documentazione sul codice:



### Front end



I file del front end si trovano interamente nella cartella public, mentre ciò che non si trova nella cartella public, fa parte del backend.

#### Public:

All'interno di public troviamo:
- una cartella per la modalità viaggio
- una cartella per i file di login e registrazione
- una cartella della modalità creatore
- una cartella della pagina profilo
- il file html della pagina principale 
- i file css contenenti gli stili:
  - main.css: principalemente per l'header
  - main_page.css: principalmente per la pagina principale
  - footer.css per il footer 
- i file javascript per animazioni e meccaniche:
  - header.js: per le animazioni dell'header
  - mainScript.js: per la gif di tutorial e per alcuni adattamenti inerenti alla responsiveness
  - toastHandler.js: per gli avvisi (Toast di bootstrap, vai alla sezione successiva)
  - triggerToast.js: è un modulo contentente una funzione per far apparire un avviso in certe circostanze 

Public contiene anche una le cartelle styles, fonts, icons, images contenenti altri fogli di stile (in particolare bootstrap.css, degli stili per i bottoni), fonts del testo, immagini e icone.

#### Viaggio:

La cartella viaggio contiene tutto quello che è inerente alla modalità viaggio, in particolare contiene una cartella per ognuna delle 8 nazioni, a loro volta le cartelle delle nazioni contengono i livelli. Per motivi di praticità siccome le nazioni contengono file simili abbiamo consegnato solo la cartella italia con le cartelle dei primi tre livelli. 
- Ogni cartella di ogni nazione contiene:
  - sempre font e immagini
  - il file html principale
  - il file mappa_<nome nazione>.js che contiene le animazioni dell'aeroplanino e della mappa 
  - Una cartella di un livello contiene invece:
    - il file JSON contenente la configurazione iniziale della griglia
    - l'immagine di riferimento
    - il file JSON dove sono salvate le combinazioni di colore e i colori primari disponibili
    - il file JSON dove è salvato il riempimento corretto di colore finale (ovvero quello che è necessario raggiungere per completare il livello)
    - il file JSON contenente il numero di mosse disponibili
  - Lo script contenente la logica del gioco si trova sempre nella cartella viaggio all'interno della cartella level, quest'ultima oltre a contenere le solite icone,immagini contiene 5 script:
    - levelAnimations.js: che contiene le animazioni che fanno apparire le immagini di riferimento  e le combinazioni e assegnano gli eventi alle icone dei sidebar
    - levelLoading.js: che carica la griglia di gioco, in particolare essa è caricata all'interno di grid.html che a sua volta è inserito all'interno della pagina principale di gioco (ovvero level.html) tramite un iframe
    - constants.js e data.js contengono costanti e strutture dati globali, in particolare esiste una matrice matrix che contiene le informazioni relative ai pixel della griglia (in modo da accedervi più velocemente) e una mappa thinButtonsMap 
      che contiene le informazioni relative alle barriere tra i pixel.
    - functions.js è un lungo script contenente sia le funzioni che animano il gioco e sia le funzioni che effettuano le richieste per caricare un livello sulla griglia, l'immagine finale, la colorazione finale corretta, le mosse disponibili e         le combinazioni di colore. Inoltre functions.js gestisce altre interazioni con l'utente, ad esempio fa apparire il popup di completamento del livello, popola l'immagine di background, gestisce gli eventi relativi ai bottoni "menu           
      principale" e "prossimo livello" ed effettua una chiamata al server per salvare i dati nel db quando il livello viene completato.
  - Ci sono anche altri fogli di stile all'interno di level:
    - grid.css serve solo per la griglia.
    - level.css è il file di stile principale per la schermata del livello.
  - Inoltre la cartella viaggio contiene anche:
    - nazioni.js: che gestisce il carosello e anche la sua responsiveness
    - loadLevels.js: che carica i livelli completati e i livelli giocabili di ciascun utente
    - mondi.css e viaggio.css: contiene un foglio di stile per cose inerenti principalmente alle mappe delle nazioni

#### Creatore:

Contiene ogni cosa inerente alla modalità creatore, in particolare:
- livelli_utenti: contiene i livelli creati dagli utenti, i file dei livelli sono organizzati nello stesso rispetto ai livelli della modalità viaggio, abbiamo consegnaoto solamente il livello creato durante la presentazione.
- src: contiene il software di creazione, in particolare questo è stata la prima modalità che abbiamo fatto, oltre alle solite icone/immagini contiene:
  - level: è una cartella identica alla cartella level contenente i file del livello, eccetto che ci sono alcuni adattamenti per la modalità creatore, in particolare questa cartella esegue tutti i livelli creati dall'utente o dagli amici       
    dell'utente così come un livelli che deve essere pubblicato
  - level-try: è una cartella contenente i classici 5 file di un livello, è la directory dove vengono salvati i file inerenti ad un livello in corso di creazione.
  - scripts: continene gli script inerenti alla creazione del livello, l'organizzazione dei file è lo stesso che per la modalità di gioco però ci sono meccaniche aggiuntive (ad esempio la selezione delle barriere) per permettere la creazione.
  - index: file html principale della modalità creatore
  - styles.css: foglio di stile principale per la modalità creatore

#### Profilo:

Contiene tutti i file inerenti alla pagina del profilo, all'interazione con gli amici, alle richieste di personalizzazine del profilo, alle richieste di caricamento di dati sull'utente, in particolare troviamo (oltre alle solite icone e immagini) :
- layout.js: che gestisce principalmente l'animazione di scorrimento presente su dispositivi mobili
- loadData.js: che gestisce le richieste al server di dati sull'utente (come le statistiche o gli amici) e riempie alcuni elementi html come la tabella degli amici, la tabella dei livelli completati e la tabella dei livelli creati.
- requestHandler.js: che gestisce invece le richieste al server inerenti alla personalizzazione dell'utente (come il cambio di immagine profilo o cambio descrizione)
- utlis.js: contiene solamente una funzione per ottenere i dati della sessione corrente.
- profilo.css: principale foglio di stile della pagina profilo
- profilo.html: principale file html della pagina profilo

#### Login:

Contiene tutto ciò inerente al login e alla registrazione:
- login.css: foglio di stile
- login.html: file html principale
- login.js: effettua la richiesta di login al server passando i dati
- signin: cartella contenente i file per la registrazione:
  - signin.html: pagina di registrazione
  - register.js: effettua la richiesta al server di registrazione passando i dati



### Back End



routes: contiene tre file inerenti alle gestioni delle richieste lato server, questi file si interfacciano con il database per effettuare controlli o per modificarlo:
  - authRoutes.js: contiene buona parte delle gestioni, ad esempio quelle inerenti all'autenticazione utente, alla registrazione e alle personalizzazioni (ad esempio cambio di immagine profilo), ma anche ad esempio il salvataggio dei livelli 
    superati.
  - creationRoutes.js: contiene invece le gestioni delle richieste inerenti alla modalità creatore, come il salvataggio dei file del livello, e la pubblicazione del livello stesso
  - pageRoutes.js: invia i path dei file statici del front end quando si passa da una pagina all'altra e invia le immagini profilo.

db: contiene un solo modulo di funzioni che interagiscono con il database ognuna associata ad una certa query, queste funzioni sono chiamate da authRoutes.js, creationRoutes.js e pageRoutes.js
utils: contiene un solo modulo con alcune funzioni che eseguono un controllo delle credenziali inserite (come la lunghezza della password o il formato dell'email) 

server.js: configura ed esegue il server, è il file che viene in effetti eseguito per avviare il server. 




# Framework e librerie utilizzate:



### Front end:
Per il front end non abbiamo usato librerie/framework oltre a quelli discussi nel corso.

#### Bootstrap

Abbiamo usato Bootstrap per alcune piccole cose. Ad esempio abbiamo usato il sistema a griglia di bootstrap, utile per la sua responsiveness per fare:
- l'header della pagina profilo (in particolare la resposiveness). 
- la griglia dei livelli completati (sezione "livelli" della pagina profilo); in tal caso abbiamo anche usato le card di bootstrap, però abbiamo comunque usato una classe personalizzata per adattare l'estetica delle card di bootstrap al sito.
- la griglia dei livelli creati (sezione "creatore" della pagina profilo), in modo analogo alla sesione "livelli"
- per creare alcune finestre pop up (non abbiamo usato i meccanismi di popup di bootstrap abbiamo solamente usato la griglia per dividere il contenuto delle finestre), come ad esempio il popup di completamento dei livelli, il popup di rimozione amico e di logout e il popup di pubblicazione del livello creato.
- per il form di login o sign in, ma anche qui abbiamo creato ulteriori classi per aggiungere personalizzazione.

Abbiamo usato lo script di bootstrap per fare invece gli avvisi (quelli che compaiono in alto a destra) in particolare abbiamo usato i "Toast", però anche qui abbiamo personalizzato l'estetica del toast. 

In generale Bootstrap ci è stato utile per migliorare la responsiveness di alcuni elementi, ma è quasi sempre stato necessario aggiungere alcune media queries personalizzate ad hoc per migliorare ulteriormente la responsiveness. Inoltre ogni volta che lo abbiamo usato abbiamo comunque usato classi css personalizzate per adattare l'estetica di bootstrap al nostro front-end. Inoltre anche per la responsiveness in generale abbiamo usato prevalentemente le media queries e le flex-box.

In generale abbiamo usato Javascript e CSS puri per le animazioni del sito.

#### JQuery:

JQUery è stato usato ampiamente da parte nostra, ci è risultato comodo per rendere il codice più leggibile; tuttavia, siccome JQuery è stato affrontato più avanti nel corso rispetto a quando abbiamo cominciato con il progetto, non tutto il codice 
javascript presente è scritto con JQuery; in particolare i file più "vecchi", come ad esempio lo script che contiene la logica di gioco, sono scritti senza JQuery, mentre quelli più nuovi (ad esempio la pagina profilo) lo usano ampiamente.



### Back End:



Per il back-end abbiamo usato Node.js, in particolare le seguetni librerie:
- "express" per la gestione delle richieste HTTP.
- "pg" per le interazioni con il database SQL. 
- "body-parser" come middleware per esaminare le richieste in arrivo al server, che nel nostro caso sono in formato JSON. 

Poi abbiamo importato anche altre librerie di Node.js di secondaria importanza come:
- bcryptjs: per criptare le password all'interno del db.
- uuid: per creare gli id univoci delle sessioni degli utenti
- fs e multer: che servono solamente per salvare le immagini profilo degli utenti tra i file del backend
- path: per il building dei percorsi in modo che non creino problemi di incompatibilità tra sistemi operativi

Le chiamate al server sono effettuate tramite chiamate AJAX, in particolare usando il metodo fetch() oppure il metodo $.ajax di JQuery.



### Dati:



Per il database abbiamo usato postgreSQL, per la visualizzazione e la manipolazione delle tabelle abbiamo usato PGAdmin; nella creazione del database sono risultate molto utili le reminiscenze del corso di basi di dati. 

