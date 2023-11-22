CREATE TABLE book (
    isbn VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL CHECK (title ~ '^[A-Za-zÀ-ÖØ-öø-ÿ -]+$'),
    description VARCHAR NOT NULL CHECK (description ~ '^[A-Za-zÀ-ÖØ-öø-ÿ0-9.,;:!?() -]+$'),
    country VARCHAR NOT NULL CHECK (country ~ '^[A-Za-zÀ-ÖØ-öø-ÿ -]+$'),
    genre VARCHAR NOT NULL CHECK (genre ~ '^[A-Za-zÀ-ÖØ-öø-ÿ -]+$'),
    released_year INTEGER NOT NULL CHECK (released_year >= 0),
    pages INTEGER NOT NULL CHECK (pages >= 0),
    publishing_house VARCHAR NOT NULL CHECK (publishing_house ~ '^[A-Za-zÀ-ÖØ-öø-ÿ -]+$'),
    img_path VARCHAR
);

CREATE TABLE actor (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL CHECK (name ~ '^[A-Za-zÀ-ÖØ-öø-ÿ -]+$')
);

CREATE TABLE role (
    id_book VARCHAR REFERENCES book(isbn) DEFERRABLE INITIALLY IMMEDIATE,
    id_actor INTEGER REFERENCES actor(id) DEFERRABLE INITIALLY IMMEDIATE,
    title VARCHAR NOT NULL CHECK (title ~ '^[A-Za-zÀ-ÖØ-öø-ÿ -]+$'),
    PRIMARY KEY(id_book, id_actor)
);
-- PROJET API

DROP TABLE IF EXISTS account CASCADE;

CREATE TABLE  account(
    id  integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username  varchar UNIQUE NOT NULL,
    email_adress varchar UNIQUE NOT NULL check (email_adress ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password varchar NOT NULL,
    role varchar NOT NULL,
    country varchar,
    phone_number varchar,
    news_letter boolean NOT NULL,
    profile_picture_path varchar NOT NULL
);


INSERT INTO account (username, email_adress, password, role, country, phone_number, news_letter, profile_picture_path) VALUES 
('Xx_DarkSasuke_xX', 'gougougagak@gougou.gak', 'password', 'user', 'France', '0123456789', true, 'none'),
('Tevin', 'azgzgz@hotmail.com', '$2b$10$NoPg1zzNKCDXiGxqXfU00.HG.wYDVr12sFNqVn9bIqfLgkf.ANhuK', 'user', 'France', '0123456789', false, 'none'),
('CykaBlyat_17', 'cyka@hotmail.be', '$2b$10$8SD4JuJ3jE/Qxp55rYk2UuxxCW.GcDMH9zhW2sAQyziV7.gJcWOVG', 'admin', 'Belgique', '0488386818', false, 'none'),
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
