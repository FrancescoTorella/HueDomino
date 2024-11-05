# HueDomino

Welcome to the official repository of **HueDomino**. This project is a website for a video game, featuring two main modes: **Journey** and **Creator**. The theme of the site is pixel-art. The game is based on an original logic, where the goal is to color images that are "initially colorless," using a set of limited and well-defined moves. **Creator**, on the other hand, is a creative mode where users can design levels, play them, and share them with friends.

To start and access the website, a preliminary setup of the database is required, created in **Postgres SQL** (installing **pgAdmin4** is optional but recommended). Below is the guide for creating the database locally:

### Database Setup Guide

1. Download the repository, install **node.js**, install **PostgreSQL**, and configure the postgres user with the password `HueDomino`.
2. Create a server and name it **HueDomino** in pgAdmin:
   - Right-click on **Servers** -> **Register**.
   - Set **Name** = `HueDomino`.
   - Set **Connection Host name** = `localhost`.
   - Set **Password** = `HueDomino`.
   - Click **Save**.
3. Within the newly created server, create a database and name it **HueDomino**, with Owner set to postgres:
   - In pgAdmin, right-click on **Databases** under the server -> **Create** -> **Database**.
   - Set **Name** = `HueDomino`.
   - Set **Owner** to `postgres`.
   - Click **Save**.
4. Once the database is created, copy **dump.sql** and paste it into the database:
   - In pgAdmin, right-click on the **HueDomino** database -> **Query Tool**.
   - Paste the dump and click **Execute Script** (the button to run it).

### Running the Server

1. To start the server, go to the **HueDomino** folder and run the following command from the terminal:
   ```bash
   node server.js
