DROP TABLE IF EXISTS produit CASCADE;
CREATE TABLE produit (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nom varchar,
    prix float
);

INSERT INTO produit (nom, prix) VALUES
('Playstation 4', 400),
('Xbox One', 399.99),
('Nintendo Switch', 349.99);

DROP TABLE IF EXISTS client CASCADE;

CREATE TABLE client(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nom varchar,
    prenom varchar,
    adresse varchar,
    password varchar
);

INSERT INTO client (nom, prenom, adresse, password) VALUES ('Poirier', 'Tevin', '11, rue du Faubourg National 95150 TAVERNY', 'motdepasse');

DROP TABLE IF EXISTS manager CASCADE;

CREATE TABLE manager(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nom varchar,
    password varchar
);

INSERT INTO manager (nom, password) VALUES ('John', 'password');

DROP TABLE IF EXISTS achat CASCADE;

CREATE TABLE achat (
   id_produit integer REFERENCES produit(id) DEFERRABLE INITIALLY IMMEDIATE,
   id_client integer REFERENCES client(id) DEFERRABLE INITIALLY IMMEDIATE,
   quantite integer,
   "date" date,
   PRIMARY KEY(id_client, id_produit, "date")
);

-- PROJET API

DROP TABLE IF EXISTS account CASCADE;

CREATE TABLE  account(
    id  integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username  varchar UNIQUE NOT NULL,
    emailAdress varchar UNIQUE NOT NULL check (emailAdress ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password varchar NOT NULL,
    role varchar NOT NULL,
    country varchar,
    phoneNumber varchar,
    newsLetter boolean NOT NULL,
    profilePicturePath varchar NOT NULL
);


INSERT INTO account (username, emailAdress, password, role, country, phoneNumber, newsLetter, profilePicturePath) VALUES 
('Xx_DarkSasuke_xX', 'gougougagak@gougou.gak', 'password', 'user', 'France', '0123456789', true, 'none'),
('Tevin', 'azgzgz@hotmail.com', '$2b$10$NoPg1zzNKCDXiGxqXfU00.HG.wYDVr12sFNqVn9bIqfLgkf.ANhuK', 'user', 'France', '0123456789', false, 'none'),
('CarlosMarcos', 'carlos.marcos@hotmail.fr', 'password', 'user', 'France', '0123456789', true, 'none');


-- CREATE TABLE review(
--     id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     date timestamp NOT NULL,
--     rating integer NOT NULL check (rating >= 0),
--     title varchar(50) NOT NULL,
--     content varchar NOT NULL,
--     likesCounter integer NOT NULL check (likesCounter >= 0),
--     dislikesCounter integer NOT NULL check (dislikesCounter >= 0),
--     user_id integer references account(id),
--     book_id integer references book(id)
-- );

-- CREATE TABLE message(
--     id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     content varchar NOT NULL,
--     date timestamp NOT NULL,
--     likesCounter integer NOT NULL check (likesCounter >= 0),
--     dislikesCounter integer NOT NULL check (dislikesCounter >= 0),
--     review_id integer references Review(id)
-- );