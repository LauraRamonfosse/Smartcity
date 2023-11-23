DROP TABLE IF EXISTS book CASCADE;

CREATE TABLE book (
    isbn VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL CHECK (title ~ '^[A-Za-zÀ-ÖØ-öø-ÿ - 0-9]+$'),
    description VARCHAR NOT NULL CHECK (description ~ '^[A-Za-zÀ-ÖØ-öø-ÿ0-9.,;:!?() -]+$'),
    country VARCHAR NOT NULL CHECK (country ~ '^[A-Za-zÀ-ÖØ-öø-ÿ -]+$'),
    genre VARCHAR NOT NULL CHECK (genre ~ '^[A-Za-zÀ-ÖØ-öø-ÿ -]+$'),
    released_year INTEGER NOT NULL CHECK (released_year >= 0),
    pages INTEGER NOT NULL CHECK (pages >= 0),
    publishing_house VARCHAR NOT NULL CHECK (publishing_house ~ '^[A-Za-zÀ-ÖØ-öø-ÿ - &]+$'),
    img_path VARCHAR
);

INSERT INTO book (isbn, title, description, country, genre, released_year, pages, publishing_house, img_path) VALUES 
('978-2-1234-5680-3', 'Le Seigneur des Anneaux', 'Le Seigneur des Anneaux (The Lord of the Rings) est un roman en trois volumes de J. R. R. Tolkien paru en 1954 et 1955. Lhistoire reprend certains personnages introduits dans Le Hobbit, premier roman de lunivers de Tolkien paru quatre ans plus tôt, mais lhistoire sen trouve beaucoup plus complexe et mature. Elle raconte la quête entreprise par le hobbit Frodon Sacquet qui doit détruire lAnneau unique, un anneau maléfique qui permet à Sauron, le Seigneur des ténèbres, de régner sur la Terre du Milieu et de réduire en esclavage ses peuples.', 'Angleterre', 'Fantasy', 1954, 423, 'Allen & Unwin', 'none'),
('978-2-1234-5681-0', 'Le Hobbit', 'Le Hobbit (The Hobbit) est un roman de fantasy de l écrivain britannique J. R. R. Tolkien. Il raconte les aventures du hobbit Bilbo (ou Bilbon), entraîné malgré lui par le magicien Gandalf et une compagnie de treize nains dans leur voyage vers la Montagne Solitaire, à la recherche du trésor gardé par le dragon Smaug. Tolkien commence à écrire Le Hobbit en 1930 à la demande de ses propres enfants, sans penser à le publier. Il continue à écrire diverses aventures se déroulant dans le même univers, pour aboutir finalement à la rédaction du Seigneur des anneaux, dont Le Hobbit est le prélude.', 'Angleterre', 'Fantasy', 1937, 310, 'Allen & Unwin', 'none'),
('978-0-4515-2493-5', '1984', '1984 (Nineteen Eighty-Four) est le plus célèbre roman de George Orwell, publié en 1949. Il décrit une Grande-Bretagne trente ans après une guerre nucléaire entre lEst et lOuest censée avoir eu lieu dans les années 1950 et où sest instauré un régime de type totalitaire fortement inspiré à la fois du stalinisme et de certains éléments du nazisme. La liberté dépression et de pensée y est niée, et il est fait un grand usage de la novlangue (langage officiel qui vise à empêcher toute critique de Big Brother, le chef du Parti et de lÉtat), afin de réécrire lhistoire et de réduire le lexique.', 'Angleterre', 'Science-fiction', 1949, 328, 'Secker & Warburg', 'none'),
('978-2-1234-5682-7', 'Le Trône de Fer', 'Le Trône de fer (A Song of Ice and Fire) est une série de romans de fantasy de George R. R. Martin, dont le premier tome est paru en 1996. Martin a commencé à lécrire en 1991 et le premier volume est paru en 1996 chez Bantam Books. Prévue à lorigine comme une trilogie, la série compte désormais cinq volumes publiés et deux autres sont attendus. Dautres tomes sont également attendus pour conclure la saga. Le cinquième volume, A Dance with Dragons, est paru le 12 juillet 2011 aux États-Unis et le 12 octobre 2011 en France.', 'États-Unis', 'Fantasy', 1996, 694, 'Bantam Spectra', 'none'),
('978-2-1234-5683-4', 'Le Nom du Vent', 'Le Nom du vent (The Name of the Wind) est un roman de fantasy de Patrick Rothfuss, le premier de la série Chronique du tueur de roi. Il est paru en 2007 aux États-Unis et en 2009 en France. Le roman est un succès critique et commercial, et a été traduit dans une trentaine de langues. Il a reçu le prix Quill du meilleur roman de fantasy ou de science-fiction en 2007, ainsi que le prix Imaginales du meilleur roman étranger en 2010.', 'États-Unis', 'Fantasy', 2007, 672, 'DAW Books', 'none'),
('978-2-1234-5684-1', 'Le Livre des Radieux', 'Le Livre des Radieux (The Stormlight Archive) est une série de romans de fantasy écrite par Brandon Sanderson. Le premier tome, intitulé La Voie des rois, est paru en 2010 aux États-Unis et en 2014 en France. Le deuxième tome, Les Sables de duc, est paru en 2014 aux États-Unis et en 2016 en France. Le troisième tome, Oathbringer, est paru en 2017 aux États-Unis et en 2019 en France. Le quatrième tome, Rhythm of War, est paru en 2020 aux États-Unis et en 2021 en France.', 'États-Unis', 'Fantasy', 2010, 1280, 'Tor Books', 'none');

DROP TABLE IF EXISTS actor CASCADE;

CREATE TABLE actor (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL CHECK (name ~ '^[A-Za-zÀ-ÖØ-öø-ÿ -/.]+$')
);

INSERT INTO actor(name) VALUES
-- Writers and editors names
    ('J. R. R. Tolkien'),
    ('George Orwell'),
    ('George R. R. Martin'),
    ('Patrick Rothfuss'),
    ('Brandon Sanderson');

DROP TABLE IF EXISTS role CASCADE;

CREATE TABLE role (
    id_book VARCHAR REFERENCES book(isbn) DEFERRABLE INITIALLY IMMEDIATE,
    id_actor INTEGER REFERENCES actor(id) DEFERRABLE INITIALLY IMMEDIATE,
    title VARCHAR NOT NULL CHECK (title ~ '^[A-Za-zÀ-ÖØ-öø-ÿ -]+$'),
    PRIMARY KEY(id_book, id_actor)
);

INSERT INTO role (title, id_book, id_actor) VALUES 
-- Writers and editors roles
    ('Auteur', '978-2-1234-5680-3', 1),
    ('Auteur', '978-2-1234-5681-0', 1),
    ('Auteur', '978-0-4515-2493-5', 2),
    ('Auteur', '978-2-1234-5682-7', 3),
    ('Auteur', '978-2-1234-5683-4', 4),
    ('Auteur', '978-2-1234-5684-1', 5);


DROP TABLE IF EXISTS account CASCADE;

CREATE TABLE  account(
    id  integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username  varchar UNIQUE NOT NULL,
    email_address varchar UNIQUE NOT NULL check (email_address ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password varchar NOT NULL,
    role varchar NOT NULL,
    country varchar,
    phone_number varchar,
    news_letter boolean NOT NULL,
    profile_picture_path varchar
);


INSERT INTO account (username, email_address, password, role, country, phone_number, news_letter, profile_picture_path) VALUES 
('Xx_DarkSasuke_xX', 'gougougagak@gougou.gak', 'password', 'user', 'France', '0123456789', true, null),
('Tevin', 'azgzgz@hotmail.com', '$2b$10$NoPg1zzNKCDXiGxqXfU00.HG.wYDVr12sFNqVn9bIqfLgkf.ANhuK', 'user', 'France', '0123456789', false, null),
('CykaBlyat_17', 'cyka@hotmail.be', '$2b$10$8SD4JuJ3jE/Qxp55rYk2UuxxCW.GcDMH9zhW2sAQyziV7.gJcWOVG', 'admin', 'Belgique', '0488386818', false, null),
('CarlosMarcos', 'carlos.marcos@hotmail.fr', 'password', 'user', 'France', '0123456789', true, null),
('john_doe', 'john.doe@example.com', 'hashed_password_1', 'user', 'USA', '+1-123-456-7890', true, null),
('jane_smith', 'jane.smith@example.com', 'hashed_password_2', 'admin', 'Canada', '+1-987-654-3210', false, null),
('bob_jackson', 'bob.jackson@example.com', 'hashed_password_3', 'user', 'UK', '+44-20-1234-5678', true, null),
('user1', 'user1@example.com', 'hashed_password_7', 'user', 'USA', '+1-555-1234', true, NULL),
('user2', 'user2@example.com', 'hashed_password_8', 'user', 'Canada', '+1-555-5678', false, NULL),
('user3', 'user3@example.com', 'hashed_password_9', 'user', 'UK', '+44-20-1234-5678', true, NULL),
('user4', 'user4@example.com', 'hashed_password_10', 'user', 'Australia', '+61-2-1234-5678', false, NULL),
('user5', 'user5@example.com', 'hashed_password_11', 'user', 'Germany', '+49-89-1234-5678', true, NULL),
('user6', 'user6@example.com', 'hashed_password_12', 'user', 'France', '+33-1-1234-5678', true, NULL),
('user7', 'user7@example.com', 'hashed_password_13', 'user', 'Spain', '+34-91-1234-5678', false, NULL),
('user8', 'user8@example.com', 'hashed_password_14', 'user', 'Italy', '+39-02-1234-5678', true, NULL),
('user9', 'user9@example.com', 'hashed_password_15', 'user', 'Brazil', '+55-11-1234-5678', false, NULL),
('user10', 'user10@example.com', 'hashed_password_16', 'user', 'India', '+91-11-1234-5678', true, NULL),
('user11', 'user11@example.com', 'hashed_password_17', 'user', 'China', '+86-10-1234-5678', false, NULL),
('user12', 'user12@example.com', 'hashed_password_18', 'user', 'Japan', '+81-3-1234-5678', true, NULL),
('user13', 'user13@example.com', 'hashed_password_19', 'user', 'South Africa', '+27-11-1234-5678', false, NULL),
('user14', 'user14@example.com', 'hashed_password_20', 'user', 'Russia', '+7-495-1234-5678', true, NULL),
('user15', 'user15@example.com', 'hashed_password_21', 'user', 'Mexico', '+52-55-1234-5678', false, NULL),
('user16', 'user16@example.com', 'hashed_password_22', 'user', 'Argentina', '+54-11-1234-5678', true, NULL),
('user17', 'user17@example.com', 'hashed_password_23', 'user', 'Netherlands', '+31-20-1234-5678', false, NULL),
('user18', 'user18@example.com', 'hashed_password_24', 'user', 'Singapore', '+65-1234-5678', true, NULL),
('user19', 'user19@example.com', 'hashed_password_25', 'user', 'Sweden', '+46-8-1234-5678', false, NULL),
('user20', 'user20@example.com', 'hashed_password_26', 'user', 'Switzerland', '+41-44-1234-5678', true, NULL);

DROP TABLE IF EXISTS review CASCADE;

CREATE TABLE review(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    date timestamp NOT NULL,
    rating integer NOT NULL check (rating >= 0),
    title varchar(50) NOT NULL,
    content varchar NOT NULL,
    likes_counter integer NOT NULL check (likes_counter >= 0),
    dislikes_counter integer NOT NULL check (dislikes_counter >= 0),
    user_id integer references account(id),
    book_id varchar references book(isbn)
);

INSERT INTO review (date, rating, title, content, likes_counter, dislikes_counter, user_id, book_id) VALUES 
('2021-04-01 12:00:00', 5, 'Super livre', 'J''ai adoré ce livre, je le recommande à tout le monde !', 0, 0, 1, '978-2-1234-5680-3'),
('2021-04-01 12:00:00', 4, 'Très bon livre', 'J''ai bien aimé ce livre, je le recommande à tout le monde !', 0, 0, 1, '978-2-1234-5681-0'),
('2021-04-01 12:00:00', 3, 'Bon livre', 'J''ai bien aimé ce livre, je le recommande à tout le monde !', 0, 0, 1, '978-0-4515-2493-5'),
('2021-04-01 12:00:00', 2, 'Mauvais livre', 'J''ai pas aimé ce livre, je le recommande à tout le monde !', 0, 0, 1, '978-2-1234-5682-7'),
('2021-04-01 12:00:00', 1, 'Très mauvais livre', 'J''ai détesté ce livre, je le recommande à tout le monde !', 0, 0, 1, '978-2-1234-5683-4'),
('2021-04-01 12:00:00', 5, 'Super livre', 'J''ai adoré ce livre, je le recommande à tout le monde !', 0, 0, 1, '978-2-1234-5684-1'),
('2021-04-01 12:00:00', 4, 'Très bon livre', 'J''ai bien aimé ce livre, je le recommande à tout le monde !', 0, 0, 1, '978-2-1234-5680-3'),
('2021-04-01 12:00:00', 3, 'Bon livre', 'J''ai bien aimé ce livre, je le recommande à tout le monde !', 0, 0, 1, '978-2-1234-5681-0'),
('2021-04-01 12:00:00', 2, 'Mauvais livre', 'J''ai pas aimé ce livre, je le recommande à tout le monde !', 0, 0, 1, '978-0-4515-2493-5'),
('2021-04-01 12:00:00', 1, 'Très mauvais livre', 'J''ai détesté ce livre, je le recommande à tout le monde !', 0, 0, 1, '978-2-1234-5682-7');

DROP TABLE IF EXISTS comment CASCADE;

CREATE TABLE comment(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content varchar NOT NULL,
    date timestamp NOT NULL,
    likes_counter integer NOT NULL check (likes_counter >= 0),
    dislikes_counter integer NOT NULL check (dislikes_counter >= 0),
    review_id integer references review(id),
    user_id integer references account(id)
);

INSERT INTO comment (content, date, likes_counter, dislikes_counter, review_id) VALUES 
('Tu as vraiment raison ! Mais je trouve que le livre est un peu trop long', '2021-04-01 12:00:00', 0, 0, 1),
('Je ne suis pas d accord avec toi, je trouve que le livre est très bien', '2021-04-01 12:00:00', 0, 0, 1),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 0, 0, 2),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 0, 0, 3),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 0, 0, 4),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 0, 0, 5),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 0, 0, 6),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 0, 0, 7),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 0, 0, 8),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 0, 0, 9);
