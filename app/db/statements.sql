DROP TABLE IF EXISTS entries;

DELETE FROM entries
WHERE id IN (10, 12, 11, 13);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password_ash TEXT NOT NULL,  
);

INSERT INTO users (email, username, password_hash)
VALUES ('alice@example.com', 'alice', '<bcrypt-hash>');

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


-- Kobold (Monster)
INSERT INTO entries (title, description, tags, type, imgSrc, date, author, properties) VALUES (
  "Kobold Marauder",
  "A cunning reptilian humanoid known for its trap-making and pack tactics. Often found in underground warrens.",
  '["Monster", "Kobold", "Dungeons & Dragons", "Low-Level"]',
  "Monster",
  "kobold.jpg",
  "2023-12-23T12:00:00.000Z",
  "Admin",
  '{
    "Creature Type": "Humanoid", 
    "Size": "Small",
    "Armour Class": "12",
    "Hit Dice": "2d8",
    "Attacks": "Dagger/Sling",
    "Damage": "1d4/1d4",
    "Intelligence": "Average",
    "Alignment": "Lawful Evil",
    "Level/XP": "1/15"
  }'
);

-- Leviathan (Monster - Missing Some Properties)
INSERT INTO entries (title, description, tags, type, imgSrc, date, author, properties) VALUES (
  "Leviathan of the Deep",
  "An ancient sea behemoth capable of swallowing ships whole. Often summoned by desperate coastal cults.",
  '["Monster", "Leviathan", "Aquatic", "Boss"]',
  "Monster",
  "leviathan.jpg",
  "2023-12-23T12:00:00.000Z",
  "Admin",
  '{
    "Creature Type": "Elemental",
    "Size": "Gargantuan",
    "Armour Class": "18",
    "Hit Dice": "20d20",
    "Special Attacks": "Whirlpool Swallow",
    "Magic Resistance": "30%",
    "Alignment": "Neutral",
    "Level/XP": "20/10,000"
  }'
);

-- Lostdream (Adventure)
INSERT INTO entries (title, description, tags, type, imgSrc, date, author, properties) VALUES (
  "Sands of Oblivion",
  "A desert survival adventure where players search for a mythical oasis that erases memories.",
  '["Adventure", "Desert", "Survival", "Puzzle"]',
  "Adventure",
  "Lostdream.jpg",
  "2023-12-23T12:00:00.000Z",
  "Admin",
  NULL
);

-- mrRonsky (NPC - Other Type)
INSERT INTO entries (title, description, tags, type, imgSrc, date, author, properties) VALUES (
  "Captain Ronsky",
  "A flamboyant mosquetter-turned-guide who knows every tavern and secret passage in the city.",
  '["Other", "NPC", "Guide", "Comic Relief"]',
  "Other",
  "mrRonsky.png",
  "2023-12-23T12:00:00.000Z",
  "Admin",
  NULL
);

-- Plantify (Spell - Missing Components)
INSERT INTO entries (title, description, tags, type, imgSrc, date, author, properties) VALUES (
  "Plantify",
  "Conjures a giant venus flytrap that grapples enemies. Responds to the caster's mental commands.",
  '["Spell", "Conjuration", "Plant", "Control"]',
  "Spell",
  "plantify.jpg",
  "2023-12-23T12:00:00.000Z",
  "Admin",
  '{
    "School": "Conjuration",
    "Level": "4",
    "Range": "60 ft",
    "Duration": "Concentration, up to 1 min",
    "Casting Time": "1 action"
  }'
);

-- Seribua (NPC - Minimal Properties)
INSERT INTO entries (title, description, tags, type, imgSrc, date, author, properties) VALUES (
  "Lady Seribua",
  "A charismatic wizard who trades magical favors for... unconventional payments. Knows every forbidden spell.",
  '["Other", "NPC", "Wizard", "Quest Giver"]',
  "Other",
  "seribua.png",
  "2023-12-23T12:00:00.000Z",
  "Admin",
  NULL
);

-- Sezeletemple (Adventure Location)
INSERT INTO entries (title, description, tags, type, imgSrc, date, author, properties) VALUES (
  "Temple of the Fallen Elves",
  "A ruined citadel containing deadly guardian constructs and the last surviving elven soulforge.",
  '["Adventure", "Dungeon", "Elven", "Artifact"]',
  "Adventure",
  "sezeletemple.jpg",
  "2023-12-23T12:00:00.000Z",
  "Admin",
  NULL
);

-- Waterattack (Adventure - No Properties)
INSERT INTO entries (title, description, tags, type, imgSrc, date, author, properties) VALUES (
  "Tides of Vengeance",
  "A coastal city defense scenario against sahuagin raiders led by a storm giant outcast.",
  '["Adventure", "Naval", "Siege", "Epic"]',
  "Adventure",
  "waterattack.jpg",
  "2023-12-23T12:00:00.000Z",
  "Admin",
  NULL
);

-- Crystal Ball (Magic Item)
INSERT INTO entries (title, description, tags, type, imgSrc, date, author, properties) VALUES (
  "Crystal Ball of Scrying",
  "A polished crystal sphere used for divination magic. Allows the user to scry on distant locations or creatures.",
  '["Magic Item", "Divination", "Scrying", "Rare"]',
  "Magic Item",
  "crystalbal.jpg",
  "2023-12-23T12:00:00.000Z",
  "Admin",
  NULL
); 