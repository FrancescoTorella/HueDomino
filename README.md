# ProgettoLTW
Group project about web programming 
Prima di entrare nei dettagli, per l'avvio e accesso al sito è necessario un setup preliminale del database, realizzato in Postgres SQL per la creazione del database e l'avvio del server in locale.
Per ciò abbiamo lasciato un file "dump.sql" che si può eseguire così da creare il database in locale.
I passi con guida in pgAdmin4 per il setup:
1) creare un server e nominarlo HueDomino  "pgAdmin -> tasto destro su Servers -> Register -> Name = HueDomino -> Connection Host name = localhost" -> Password = HueDomino -> Save
2) All'interno del server appena creato, creare un Database, nominarlo HueDomino, con Owner postgres, "pgAdmin su server in Databases tasto destro -> Create -> Database -> nome = HueDomino -> Save
3) Creato il database, copiare dump.sql e incollarlo nel database, "pgAdmin sul database HueDomino tasto destro -> Query Tool ->incollare il dump -> cliccare su Execute Script "tasto"
4) Fatto ciò il database è creato, dentro la cartella HueDomino del sorgente eseguire da terminale npm install.
5) Da ora in poi per avviare il server è sufficiente eseguire da terminale node server.js per avviare il server.
6) Poi su qualunque browser con il server avviato, cercare sulla barra http://localhost:3000/
Il progetto riguarda la creazione di un sito web su un gioco da noi realizzato. Il gioco ha due modalità principali, la modalità Viaggio e una secondaria, la modalità Creatore.
