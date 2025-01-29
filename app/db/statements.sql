CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags JSON, -- JSON array for tags
  type TEXT NOT NULL, 
  imgSrc TEXT NULL, 
  date TEXT NOT NULL, 
  author TEXT NOT NULL,
  properties JSON NULL -- JSON object for key-value properties
);

ALTER TABLE entries
RENAME COLUMN text to description;

INSERT INTO entries (title, description, tags, type, imgSrc, date, author, properties) VALUES
(
  "Fireball Spell Guide",
  "An in-depth guide on casting Fireball, one of the most popular spells in Dungeons & Dragons.",
  '["Magic", "Spell", "Fireball", "Dnd"]',
  "Spell",
  "fireball.jpg",
  "2023-12-23T12:00:00.000Z",
  "Admin",
  '{"Damage": "8d6", "Area": "20ft Radius", "Effects": "Explosion"}'
),
(
  "Monster Manual Entry: Kobold",
  "Details about Kobold, their behavior, and combat tactics.",
  '["Monster", "Dnd"]',
  "Monster",
  "kobold.jpg",
  "2023-12-22T10:00:00.000Z",
  "Admin",
  '{"Frequency": "common", "Size": "small", "Alignment": "Neutral Evil"}'
);

DELETE FROM entries
WHERE id IN (20);