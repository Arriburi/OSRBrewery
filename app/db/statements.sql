CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  tags JSON, -- JSON array for tags
  type TEXT NOT NULL, 
  imgSrc TEXT, 
  date TEXT NOT NULL, 
  author TEXT NOT NULL,
  properties JSON -- JSON object for key-value properties
);

DROP TABLE entries


INSERT INTO entries (title, text, tags, type, imgSrc, date, author, properties) VALUES
(
  "Fireball Spell Guide",
  "An in-depth guide on casting Fireball, one of the most popular spells in Dungeons & Dragons.",
  '["magic", "spell", "fireball", "dnd"]',
  "Spell",
  "fireball.jpg",
  "2023-12-23T12:00:00.000Z",
  "Admin",
  '{"damage": "8d6", "area": "20ft radius", "effects": "explosion"}'
),
(
  "Monster Manual Entry: Goblin",
  "Details about Goblins, their behavior, and combat tactics.",
  '["monster", "goblin", "dnd"]',
  "Monster",
  "goblin.jpg",
  "2023-12-22T10:00:00.000Z",
  "Admin",
  '{"frequency": "Common", "size": "Small", "alignment": "Neutral Evil"}'
);

