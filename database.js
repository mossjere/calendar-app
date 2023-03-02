const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "events.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE events (
      id TEXT PRIMARY KEY,
      event INTEGER,
      title TEXT,
      start TEXT,
      end TEXT,
      client TEXT,
      doctor TEXT,
      phone TEXT,
      examRoom INTEGER,
      farmCall INTEGER,
      address TEXT,
      notes TEXT,
      duration TEXT
    )`, (err) => {
      if (err) {
        console.log('Table already exists.');
      } else {
        console.log('Table created successfully.');
      }
    });
    db.run(`CREATE TABLE templates (
        id TEXT PRIMARY KEY,
        event INTEGER,
        title TEXT,
        duration TEXT
      )`, (err) => {
        if (err) {
          console.log('Table already exists.');
        } else {
            db.run(`INSERT INTO templates (title, duration, id)
                VALUES (?, ?, ?)`, ["Teeth Float", "01:00", "1"], (err) => {
                if (err) {
                    console.log('Template already exists.');
                } else {
                    console.log('Template saved successfully.');
                }
            });
            db.run(`INSERT INTO templates (title, duration, id)
                VALUES (?, ?, ?)`, ["Vaccinate", "00:30", "2"], (err) => {
                if (err) {
                    console.log('Template already exists.');
                } else {
                    console.log('Template saved successfully.');
                }
            });
            db.run(`INSERT INTO templates (title, duration, id)
                VALUES (?, ?, ?)`, ["Farm Call", "01:30", "3"], (err) => {
                if (err) {
                    console.log('Template already exists.');
                } else {
                    console.log('Template saved successfully.');
                }
            });
            db.run(`INSERT INTO templates (title, duration, id)
                VALUES (?, ?, ?)`, ["X-ray", "00:30", "4"], (err) => {
                if (err) {
                    console.log('Template already exists.');
                } else {
                    console.log('Template saved successfully.');
                }
            });
            db.run(`INSERT INTO templates (title, duration, id)
                VALUES (?, ?, ?)`, ["Lameness", "01:00", "5"], (err) => {
                if (err) {
                    console.log('Template already exists.');
                } else {
                    console.log('Template saved successfully.');
                }
            });
          console.log('Table created successfully.');
        }
      });
      db.run(`CREATE TABLE waitList (
        id TEXT PRIMARY KEY,
        event INTEGER,
        title TEXT,
        start TEXT,
        end TEXT,
        client TEXT,
        phone TEXT,
        examRoom INTEGER,
        farmCall INTEGER,
        address TEXT,
        notes TEXT,
        duration TEXT
      )`, (err) => {
        if (err) {
          console.log('Table already exists.');
        } else {
          console.log('Table created successfully.');
        }
      });
  }
});

module.exports = db;
