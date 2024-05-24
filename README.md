# ProgettoLTW
Benvenuto nel repository ufficiale di HueDomino. Il progetto riguarda un sito web su un videogioco, basato su 2 modalità, la modalità principale di gioco, Journey e Creator. Il tema del sito è pixel-art.
Il gioco si basa su una logica originale, dove lo scopo è colorare le immagini "inizialmente prive di colore", con un set di mosse limitate e ben definite.
Creator invece è una modalità creativa dove è possibile realizzare dei livelli, giocarci e condividerli con i propri amici.
Per l'avvio e accesso al sito è necessario un setup preliminale del database, realizzato in Postgres SQL "opzionale installare pgAdmin4".
La guida per creare il database in locale:

0) Ovviamente scaricare il repository.
1) Creare un server e nominarlo HueDomino  "in pgAdmin -> tasto destro su Servers -> Register -> Name = HueDomino -> Connection Host name = localhost -> Password = HueDomino -> Save"
2) All'interno del server appena creato, creare un Database, nominarlo HueDomino, con Owner postgres, "in pgAdmin su server in Databases tasto destro -> Create -> Database -> nome = HueDomino -> Save"
3) Creato il database, copiare dump.sql e incollarlo nel database, "in pgAdmin sul database HueDomino tasto destro -> Query Tool ->incollare il dump -> cliccare su Execute Script 'tasto per eseguire' "
4) Fatto ciò il database è creato, dentro la cartella HueDomino del sorgente eseguire da terminale <npm install>.
5) D'ora in poi per avviare il server è sufficiente nella cartella HueDomino eseguire da terminale il comando <node server.js> per lanciare il server.
6) Poi su qualunque browser con il server avviato, cercare sulla barra <http://localhost:3000/>

Un colorato saluto da:
Federico Zaza,
Francesco Torella,
Camilla Sed.
