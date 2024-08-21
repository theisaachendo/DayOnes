import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'DayOnes.db';
const database_version = '1.0';
const database_displayname = 'SQLite DayOnes Database';
const database_size = 200000;

let db;

export const initDB = async () => {
  try {
    db = await SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size
    );
    console.log('Database opened');
    await createTables();
  } catch (error) {
    console.error('Error opening database:', error);
  }
};

const createTables = async () => {
  try {
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS Users (
        UserID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserName TEXT NOT NULL UNIQUE,
        FullName TEXT,
        Email TEXT,
        Phone TEXT,
        PasswordHash TEXT,
        Role TEXT CHECK(Role IN ('artist', 'fan')),
        InstagramHandle TEXT,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS Posts (
        PostID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER NOT NULL,
        Content TEXT,
        ImageURL TEXT,
        LikesCount INTEGER DEFAULT 0,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS Comments (
        CommentID INTEGER PRIMARY KEY AUTOINCREMENT,
        PostID INTEGER NOT NULL,
        UserID INTEGER NOT NULL,
        CommentText TEXT,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (PostID) REFERENCES Posts(PostID),
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS DirectMessages (
        MessageID INTEGER PRIMARY KEY AUTOINCREMENT,
        SenderID INTEGER NOT NULL,
        ReceiverID INTEGER NOT NULL,
        MessageText TEXT,
        SentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (SenderID) REFERENCES Users(UserID),
        FOREIGN KEY (ReceiverID) REFERENCES Users(UserID)
      );
    `);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

export const addUser = async (user) => {
  const { userName, fullName, email, phone, password, role, instagramHandle } = user;
  try {
    await db.executeSql(
      `INSERT INTO Users (UserName, FullName, Email, Phone, PasswordHash, Role, InstagramHandle)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userName, fullName, email, phone, password, role, instagramHandle]
    );
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Add more functions for inserting posts, comments, and messages as needed.
