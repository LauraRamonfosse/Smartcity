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


DROP TABLE IF EXISTS review CASCADE;

CREATE TABLE review(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    date timestamp NOT NULL,
    rating integer NOT NULL check (rating >= 0),
    title varchar NOT NULL,
    content varchar NOT NULL,
    likesCounter integer NOT NULL check (likesCounter >= 0),
    dislikesCounter integer NOT NULL check (dislikesCounter >= 0),
    user_id integer references account(id),
    book_id varchar references book(isbn)
);

-- Ajoutez une nouvelle revue en utilisant une sous-requête pour obtenir l'ID de l'utilisateur
-- Ajouter plusieurs revues
INSERT INTO review (date, rating, title, content, likesCounter, dislikesCounter, user_id, book_id)
VALUES 
    (CURRENT_TIMESTAMP, 5, 'Une excellente expérience', 'J''ai vraiment apprécié cette expérience.', 10, 2, (SELECT id FROM account WHERE username = 'Xx_DarkSasuke_xX'), 1),
    (CURRENT_TIMESTAMP, 4, 'Une expérience décente', 'J''ai trouvé cette expérience plutôt agréable.', 8, 1, (SELECT id FROM account WHERE username = 'Tevin'), 1),
    (CURRENT_TIMESTAMP, 2, 'Décevant', 'Je n''ai pas du tout apprécié cette expérience.', 3, 5, (SELECT id FROM account WHERE username = 'CykaBlyat_17'), 1);


DROP TABLE IF EXISTS message CASCADE;

CREATE TABLE message(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content varchar NOT NULL,
    date timestamp NOT NULL, --- check (timestamp = current timestamp)
    likesCounter integer NOT NULL check (likesCounter >= 0),
    dislikesCounter integer NOT NULL check (dislikesCounter >= 0),
    review_id integer references review(id),
    user_id integer references account(id)
);

-- Ajouter plusieurs messages
INSERT INTO message (content, date, likesCounter, dislikesCounter, review_id, user_id)
VALUES 
    ('C''était vraiment génial!', CURRENT_TIMESTAMP, 5, 0, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'Xx_DarkSasuke_xX') LIMIT 1), (SELECT id FROM account WHERE username = 'Xx_DarkSasuke_xX')),
    ('Je suis d''accord, c''était une expérience agréable.', CURRENT_TIMESTAMP, 3, 1, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'Tevin') LIMIT 1), (SELECT id FROM account WHERE username = 'Tevin')),
    ('Désolé d''entendre ça, peut-être que la prochaine fois sera meilleure.', CURRENT_TIMESTAMP, 2, 4, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'CykaBlyat_17') LIMIT 1), (SELECT id FROM account WHERE username = 'CykaBlyat_17')),
    ('Absolument incroyable! J''ai adoré chaque instant de cette expérience.', CURRENT_TIMESTAMP, 10, 0, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'CykaBlyat_17') LIMIT 1), (SELECT id FROM account WHERE username = 'CykaBlyat_17')),
    ('Une expérience exceptionnelle! Je recommande vivement à tous.', CURRENT_TIMESTAMP, 8, 1, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'CykaBlyat_17') LIMIT 1), (SELECT id FROM account WHERE username = 'CykaBlyat_17')),
    ('C''était tout simplement parfait. Rien à redire, juste du bonheur!', CURRENT_TIMESTAMP, 7, 0, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'CykaBlyat_17') LIMIT 1), (SELECT id FROM account WHERE username = 'CykaBlyat_17')),
    ('Je n''aurais pas pu rêver mieux. Une expérience à couper le souffle!', CURRENT_TIMESTAMP, 9, 0, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'CykaBlyat_17') LIMIT 1), (SELECT id FROM account WHERE username = 'CykaBlyat_17')),
    ('Bravo! Cette expérience a dépassé toutes mes attentes. À refaire sans hésitation.', CURRENT_TIMESTAMP, 10, 0, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'CykaBlyat_17') LIMIT 1), (SELECT id FROM account WHERE username = 'CykaBlyat_17')),
    ('Inoubliable! Je suis encore sous le charme de cette expérience extraordinaire.', CURRENT_TIMESTAMP, 9, 0, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'CykaBlyat_17') LIMIT 1), (SELECT id FROM account WHERE username = 'CykaBlyat_17')),
    ('Du début à la fin, tout était impeccable. Une expérience à savourer pleinement.', CURRENT_TIMESTAMP, 8, 0, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'CykaBlyat_17') LIMIT 1), (SELECT id FROM account WHERE username = 'CykaBlyat_17')),
    ('Je suis comblé! Cette expérience restera gravée dans ma mémoire.', CURRENT_TIMESTAMP, 7, 0, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'CykaBlyat_17') LIMIT 1), (SELECT id FROM account WHERE username = 'CykaBlyat_17')),
    ('Un grand merci pour cette expérience exceptionnelle. Tout était parfait!', CURRENT_TIMESTAMP, 9, 0, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'CykaBlyat_17') LIMIT 1), (SELECT id FROM account WHERE username = 'CykaBlyat_17')),
    ('Si je pouvais donner plus de 5 étoiles, je le ferais. Une expérience qui mérite d''être applaudie!', CURRENT_TIMESTAMP, 10, 0, (SELECT id FROM review WHERE user_id = (SELECT id FROM account WHERE username = 'CykaBlyat_17') LIMIT 1), (SELECT id FROM account WHERE username = 'CykaBlyat_17'));
