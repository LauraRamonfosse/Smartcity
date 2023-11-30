DROP TABLE IF EXISTS book CASCADE;

CREATE TABLE book (
    isbn VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL CHECK (title ~ '^[A-Za-zÀ-ÖØ-öø-ÿ - 0-9]+$'),
    description VARCHAR NOT NULL CHECK (description ~ '^[A-Za-zÀ-ÖØ-öø-ÿ0-9.,;:!?() -]+$'),
    country VARCHAR NOT NULL CHECK (country ~ '^[A-Za-zÀ-ÖØ-öø-ÿ -]+$'),
    genre VARCHAR NOT NULL CHECK (genre ~ '^[A-Za-zÀ-ÖØ-öø-ÿ -]+$'),
    released_year INTEGER NOT NULL CHECK (released_year >= 0),
    pages INTEGER NOT NULL CHECK (pages >= 0),
    publishing_house VARCHAR NOT NULL CHECK (publishing_house ~ '^[A-Za-zÀ-ÖØ-öø-ÿ - &. 0-9]+$'),
    img_path VARCHAR
);

INSERT INTO book (isbn, title, description, country, genre, released_year, pages, publishing_house, img_path) VALUES 
('978-2-1234-5680-3', 'Le Seigneur des Anneaux', 'Le Seigneur des Anneaux (The Lord of the Rings) est un roman en trois volumes de J. R. R. Tolkien paru en 1954 et 1955. Lhistoire reprend certains personnages introduits dans Le Hobbit, premier roman de lunivers de Tolkien paru quatre ans plus tôt, mais lhistoire sen trouve beaucoup plus complexe et mature. Elle raconte la quête entreprise par le hobbit Frodon Sacquet qui doit détruire lAnneau unique, un anneau maléfique qui permet à Sauron, le Seigneur des ténèbres, de régner sur la Terre du Milieu et de réduire en esclavage ses peuples.', 'Angleterre', 'Fantasy', 1954, 423, 'Allen & Unwin', 'none'),
('978-2-1234-5681-0', 'Le Hobbit', 'Le Hobbit (The Hobbit) est un roman de fantasy de l écrivain britannique J. R. R. Tolkien. Il raconte les aventures du hobbit Bilbo (ou Bilbon), entraîné malgré lui par le magicien Gandalf et une compagnie de treize nains dans leur voyage vers la Montagne Solitaire, à la recherche du trésor gardé par le dragon Smaug. Tolkien commence à écrire Le Hobbit en 1930 à la demande de ses propres enfants, sans penser à le publier. Il continue à écrire diverses aventures se déroulant dans le même univers, pour aboutir finalement à la rédaction du Seigneur des anneaux, dont Le Hobbit est le prélude.', 'Angleterre', 'Fantasy', 1937, 310, 'Allen & Unwin', 'none'),
('978-0-4515-2493-5', '1984', '1984 (Nineteen Eighty-Four) est le plus célèbre roman de George Orwell, publié en 1949. Il décrit une Grande-Bretagne trente ans après une guerre nucléaire entre lEst et lOuest censée avoir eu lieu dans les années 1950 et où sest instauré un régime de type totalitaire fortement inspiré à la fois du stalinisme et de certains éléments du nazisme. La liberté dépression et de pensée y est niée, et il est fait un grand usage de la novlangue (langage officiel qui vise à empêcher toute critique de Big Brother, le chef du Parti et de lÉtat), afin de réécrire lhistoire et de réduire le lexique.', 'Angleterre', 'Science-fiction', 1949, 328, 'Secker & Warburg', 'none'),
('978-2-1234-5682-7', 'Le Trône de Fer', 'Le Trône de fer (A Song of Ice and Fire) est une série de romans de fantasy de George R. R. Martin, dont le premier tome est paru en 1996. Martin a commencé à lécrire en 1991 et le premier volume est paru en 1996 chez Bantam Books. Prévue à lorigine comme une trilogie, la série compte désormais cinq volumes publiés et deux autres sont attendus. Dautres tomes sont également attendus pour conclure la saga. Le cinquième volume, A Dance with Dragons, est paru le 12 juillet 2011 aux États-Unis et le 12 octobre 2011 en France.', 'États-Unis', 'Fantasy', 1996, 694, 'Bantam Spectra', 'none'),
('978-2-1234-5683-4', 'Le Nom du Vent', 'Le Nom du vent (The Name of the Wind) est un roman de fantasy de Patrick Rothfuss, le premier de la série Chronique du tueur de roi. Il est paru en 2007 aux États-Unis et en 2009 en France. Le roman est un succès critique et commercial, et a été traduit dans une trentaine de langues. Il a reçu le prix Quill du meilleur roman de fantasy ou de science-fiction en 2007, ainsi que le prix Imaginales du meilleur roman étranger en 2010.', 'États-Unis', 'Fantasy', 2007, 672, 'DAW Books', 'none'),
('978-2-1234-5684-1', 'Le Livre des Radieux', 'Le Livre des Radieux (The Stormlight Archive) est une série de romans de fantasy écrite par Brandon Sanderson. Le premier tome, intitulé La Voie des rois, est paru en 2010 aux États-Unis et en 2014 en France. Le deuxième tome, Les Sables de duc, est paru en 2014 aux États-Unis et en 2016 en France. Le troisième tome, Oathbringer, est paru en 2017 aux États-Unis et en 2019 en France. Le quatrième tome, Rhythm of War, est paru en 2020 aux États-Unis et en 2021 en France.', 'États-Unis', 'Fantasy', 2010, 1280, 'Tor Books', 'none'),
('978-0-06-112008-4', 'To Kill a Mockingbird', 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature. The plot and characters are loosely based on Lee s observations of her family, her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was ten.', 'United States', 'Fiction', 1960, 281, 'J.B. Lippincott & Co.', 'none'),
('978-0-06-231500-7', 'The Great Gatsby', 'The Great Gatsby is a novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922. The story explores the experiences of the elusive Jay Gatsby and his love for the beautiful Daisy Buchanan.', 'United States', 'Fiction', 1925, 180, 'Charles Scribner s Sons', 'none'),
('978-0-679-64299-3', 'One Hundred Years of Solitude', 'One Hundred Years of Solitude is a landmark 1967 novel by Colombian author Gabriel García Márquez that tells the multi-generational story of the Buendía family in the fictional town of Macondo. The novel is often cited as one of the greatest achievements in literature of the 20th century.', 'Colombia', 'Magic Realism', 1967, 417, 'Harper & Row', 'none');

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
    country varchar NOT NULL check (country ~* '^[A-Za-zÀ-ÖØ-öø-ÿ -]+$'),
    phone_number varchar,
    news_letter boolean NOT NULL,
    profile_picture_path varchar
);


INSERT INTO account (username, email_address, password, role, country, phone_number, news_letter, profile_picture_path) VALUES 
('Xx_DarkSasuke_xX', 'gougougagak@gougou.gak', 'password', 'user', 'France', '0123456789', true, null),
('Tevin', 'azgzgz@hotmail.com', '$2b$10$NoPg1zzNKCDXiGxqXfU00.HG.wYDVr12sFNqVn9bIqfLgkf.ANhuK', 'user', 'France', '0123456789', false, null),
('CarlosMarcos', 'carlos.marcos@hotmail.fr', 'password', 'user', 'France', '0123456789', true, null),
('truc', 'truc.coucou@bidule.chose', '$2b$10$7Dw1zrF1WMpgTp5dIW3dOOPLGiaBS/T5dZKGlq9gNYJCz8LzsFTDe', 'admin', 'Belgium', '+42 420/66.76.86', true, null),
('freddy', 'freddy.mercury@rhapsodia.song', '$2b$10$vht5LespLG4dFE/a6UMpEOy82GWqPjqbgNl1AUac6uWXggSXeROrm', 'user', 'Belgium', '+88 123/18.14.88', false, null);

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
('2021-04-01 12:00:00', 5, 'Super livre', 'J''ai adoré ce livre, je le recommande à tout le monde !', 420, 20, 1, '978-2-1234-5680-3'),
('2021-04-01 12:00:00', 4, 'Très bon livre', 'J''ai bien aimé ce livre, je le recommande à tout le monde !', 52, 368, 1, '978-2-1234-5681-0'),
('2021-04-01 12:00:00', 3, 'Bon livre', 'J''ai bien aimé ce livre, je le recommande à tout le monde !', 678, 387, 1, '978-0-4515-2493-5'),
('2021-04-01 12:00:00', 2, 'Mauvais livre', 'J''ai pas aimé ce livre, je le recommande à tout le monde !', 387, 38, 1, '978-2-1234-5682-7'),
('2021-04-01 12:00:00', 1, 'Très mauvais livre', 'J''ai détesté ce livre, je le recommande à tout le monde !', 45, 5, 1, '978-2-1234-5683-4'),
('2021-04-01 12:00:00', 5, 'Super livre', 'J''ai adoré ce livre, je le recommande à tout le monde !', 54, 453, 1, '978-2-1234-5684-1'),
('2021-04-01 12:00:00', 4, 'Très bon livre', 'J''ai bien aimé ce livre, je le recommande à tout le monde !', 5, 2, 1, '978-2-1234-5680-3'),
('2021-04-01 12:00:00', 3, 'Bon livre', 'J''ai bien aimé ce livre, je le recommande à tout le monde !', 354, 387, 1, '978-2-1234-5681-0'),
('2021-04-01 12:00:00', 2, 'Mauvais livre', 'J''ai pas aimé ce livre, je le recommande à tout le monde !', 7880, 321, 1, '978-0-4515-2493-5'),
('2021-04-01 12:00:00', 1, 'Très mauvais livre', 'J''ai détesté ce livre, je le recommande à tout le monde !', 783, 354, 1, '978-2-1234-5682-7'),
('2021-04-01 12:00:00', 5, 'Super livre', 'J''ai adoré ce livre, je le recommande à tout le monde !', 354, 354, 1, '978-2-1234-5683-4'),
-- commentaire philosophique sur le livre 1984
('2021-04-01 12:00:00', 5, 'Littéralement 1984', 'Ca en dit long sur la société... On vit dans une société', 354, 354, 1, '978-2-1234-5684-1'),
('2021-04-01 12:00:00', 3, 'Bon livre', 'J''ai bien aimé ce livre, je le recommande à tout le monde !', 354, 354, 1, '978-2-1234-5680-3'),
('2021-04-01 12:00:00', 2, 'Mauvais livre', 'J''ai pas aimé ce livre, je le recommande à tout le monde !', 354, 354, 1, '978-2-1234-5681-0'),
('2021-04-01 12:00:00', 1, 'Très mauvais livre', 'J''ai détesté ce livre, je le recommande à tout le monde !', 354, 354, 1, '978-0-4515-2493-5'),
('2021-04-01 12:00:00', 5, 'Super livre', 'J''ai adoré ce livre, je le recommande à tout le monde !', 354, 354, 1, '978-2-1234-5682-7');

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

INSERT INTO comment (content, date, likes_counter, dislikes_counter, review_id, user_id) VALUES 
('Tu as vraiment raison ! Mais je trouve que le livre est un peu trop long', '2021-04-01 12:00:00', 69, 420, 1, 2),
('Je ne suis pas d accord avec toi, je trouve que le livre est très bien', '2021-04-01 12:00:00', 420, 69, 1, 2),
('c''est ouf, je trouve que le livre est très bien', '2021-04-01 12:00:00', 540, 387, 1, 2),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 738, 12, 2, 2),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 231, 8376, 3, 2),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 354, 21, 4, 2),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 345, 21, 5, 2),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 0, 0, 6, 2),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 354, 354, 7, 2),
('Je suis claqué au sol en progra, et react pu la merde, oui je suis un rageu', '2021-04-01 12:00:00', 50, 6, 1, 2),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 35, 1, 8, 2),
('Ils sont vraiment trop longs ces livres', '2021-04-01 12:00:00', 438, 384, 9, 2),
('Cette lecture est une merveille de la littérature', '2021-04-01 12:00:00', 34, 384, 10, 2),
('L''histoire est vraiment trop longue', '2021-04-01 12:00:00', 34, 384, 11, 2),
('on vit vraiment dans une société!! on devient adulte quand on se rend compte qu''on prefere le joker a batman! Et que le joker est un symbole de la lutte des classes! Pauvre bruce wayne, il est tellement riche qu''il ne peut pas comprendre la souffrance des pauvres! Prolétaire de tous les pays, unissez vous!#vivelanarchie #vivelarevolution', '2021-04-01 12:00:00', 1936, 19, 12, 2),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 34, 384, 13, 2),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 34, 384, 14, 2),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 34, 384, 15, 2),
('Je suis d accord avec toi, le livre est vraiment trop long', '2021-04-01 12:00:00', 34, 384, 16, 2);