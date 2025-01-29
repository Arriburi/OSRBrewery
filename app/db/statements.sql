CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags JSON, -- JSON array for tags
  type TEXT NOT NULL, 
  imgSrc TEXT, 
  date TEXT NOT NULL, 
  author TEXT NOT NULL,
  properties JSON -- JSON object for key-value properties
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
  '{"damage": "8d6", "area": "20ft radius", "effects": "explosion"}'
),
(
  "Monster Manual Entry: Kobold",
  "Details about Kobold, their behavior, and combat tactics.",
  '["Monster", "Dnd"]',
  "Monster",
  "kobold.jpg",
  "2023-12-22T10:00:00.000Z",
  "Admin",
  '{"frequency": "Common", "size": "Small", "alignment": "Neutral Evil"}'
);

DELETE FROM entries
WHERE id IN (14);