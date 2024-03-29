Ho aggiunto la possibilità di salvare una configurazione delle barriere, tuttavia per fare tutto ciò ho dovuto utilizzare il tool Node.js 
e alcune sue librerie, vi lascio le istruzioni:

Installazione di Node.js: Per installare Node.js, dovresti andare sul sito ufficiale di Node.js (https://nodejs.org/) e scaricare 
  l'installer per il tuo sistema operativo. Dopo aver scaricato l'installer, segui le istruzioni per installare Node.js. Una volta
  scaricato vai sul terminale e scrivi:
  node -v

Installazione dei moduli Node.js: Abbiamo installato vari moduli Node.js utilizzando npm, il gestore di pacchetti di Node.js. 
  Ecco i comandi che abbiamo usato:
  - npm install csv-writer: per installare csv-writer, che ti permette di scrivere dati in un file CSV.
  - npm install body-parser: per installare body-parser, che ti permette di analizzare il corpo delle richieste HTTP in Express.
  - npm install csv-parser: per installare csv-parser, che ti permette di leggere dati da un file CSV.

Esecuzione del codice: Per eseguire il tuo codice server, apri un terminale nella directory del tuo progetto e esegui il comando: 
  node server.js 
  Questo avvierà il tuo server su http://localhost:3000. Per fermare il server, premi CTRL + C nel terminale. 
  Per collegarti al sito devi assicurarti che il server sia in esecuzione e digitare http://localhost:3000 sulla barra di ricerca del
  browser.

Non è detto che node.js ci serva per tutta la durata del progetto, per ora è necessario semplicemente per salvare le configurazioni e
rendere più veloce lo sviluppo. Suppongo comunque che node.js sarà uno dei prossimi argomenti del corso.

La pagina può essere usata nel solito modo, volendo se troviamo una configurazione di barriere promettente salviamo il file csv da qualche
altra parte, comunque premendo il tasto "Carica Configurazione" è possibile caricare la configurazione che è attualmente salvata sul csv.

Mentre con il tasto Salva Configurazione l'attuale disposizione delle barriere viene salvata
ATTENZIONE: PREMENDO SALVA CONFIGURAZIONE I DATI SUL FILE CSV VENGONO IN AUTOMATICO SOVRASCRITTI PERCIO CONVIENE SALVARE LE CONFIGURAZIONI
IN LOCALE DA QUALCHE PARTE

Scrivetemi se qualcosa non è chiaro :) 

