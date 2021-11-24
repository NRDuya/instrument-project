-- NOTE: I figured we'd want this for the section on SQL
PRAGMA foreign_keys;

-- NOTE: For the SQL assignment, we could have them normalize
-- this database farther. Perhaps they can learn about SERIAL and
-- then go implement a way to change a room_name without losing
-- references by using a FOREIGN KEY into a rooms table with an 
-- int primary key.
DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	artist text NOT NULL,
	album text NOT NULL,
	notes varchar NOT NULL
);


INSERT INTO songs (id, song_title, artist, album, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'Daniel Huang', 'CSC600 Sauced Up', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'),
	(2, 'Jingle Bells', 'Santa Claus', 'Christmas Season', 'E4 E4 E4 G4 E4 E4 E4 G4 E4 G4 C4 D4 E4 G4 G4 G4 F4 F4 F4 F4 F4 F4 E4 E4 E4 E4 E4 D4 D4 E4 D4 F4 G4 C4'),
	(3, 'We Wish You a Merry Christmas', 'Santa Claus', 'Christmas Season', 'D4 G4 G4 A4 G4 Gb4 E4 E4 E4 A4 A4 B4 A4 G4 Gb4 D4 D4 B4 B4 C4 B4 A4 G4 E4 D4 D4 E4 A4 Gb4 G4'),
	(4, 'Happy Birthday', 'Unknown', 'Birthday Season', 'D4 E4 D4 G4 F4 F4 D4 E4 D4 A4 G4 G4 D4 D4 B4 G4 F4 E4 C4 C4 B4 G4 A4 G4'), 
	(5, 'I <3 You', 'Barney', 'Barney & Friends', 'G4 E4 G4 G4 G4 E4 G4 G4 A4 G4 F4 E4 D4 E4 F4 E4 F4 G4 C4 C4 C4 C4 C4 D4 E4 F4 G4 G4 D4 D4 F4 E4 D4 C4');;
