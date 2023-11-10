const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const app = express();
const cors = require("cors");
const port = 3030;
const ip = "192.168.0.104";
class qr {
  constructor(qrcode, username) {
    this.qrcode = qrcode;
    this.username = username;
  }
}
app.use(bodyParser.json());
app.use(cors());
const db = new sqlite3.Database('database.db');


// Create a users table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT,
      password TEXT,
      teacher INTEGER DEFAULT 0
    )
  `);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY,
      username TEXT,
      date TEXT,
      time TEXT,
      qrcode INTEGER,
      subject TEXT
    )
  `);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS subject (
      id INTEGER PRIMARY KEY,
      subject TEXT,
      teacher TEXT,
      qrcode INTEGER
    )
  `);
});





app.post('/signup', async (req, res) => {
  const { username, password, teacher } = req.body;
  // console.log(req.body);
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  if (teacher == 1) {
    console.log("teacher is 1")
    
    db.run(
      'INSERT INTO users (username, password,teacher) VALUES (?, ?, ?)',
      [username, hashedPassword, teacher],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'User registration failed' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  } else {
    console.log("teacher is 0 ")
    db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'User registration failed' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get(
    'SELECT id, username, password, teacher FROM users WHERE username = ?',
    [username],
    async (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!row) {
        return res.status(401).json({ error: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, row.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      res.json({ message: 'Login successful', user: { id: row.id, username: row.username, teacher:row.teacher } });
    }
  );
});


app.post("/setqrcode", (req, res) => {
  const { username, password, teacher, subject } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  if (teacher == 1) {
    db.get(
      'SELECT id, username, password FROM users WHERE username = ? and teacher = 1',
      [username],
      async (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (!row) {
          return res.status(401).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, row.password);

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Incorrect password' });
        }
        const qrcode = Math.floor(Math.random() * 1000000);
        // hold the qrcode in ram and destroy after 5 minutes
        // add the qrcode to the database
        db.run(
          'INSERT INTO subject (subject, teacher, qrcode) VALUES (?, ?, ?)',
          [subject, username, qrcode],
          (err) => {
            if (err) {
              return res.status(500).json({ error: 'User registration failed' });
            }
          
          }
        );

        res.json({ message: 'Qr setted', user: { id: row.id, username: row.username } });
      }
    );
  } else {
    return res.status(401).json({ error: 'User not found' });
  }


})

app.post("/attendances", (req, res) => {
  const {username, password,subject,qr} = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  db.get(
    'SELECT id, username, password FROM users WHERE username = ?',
    [username],
    async (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!row) {
        return res.status(401).json({ error: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, row.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      db.get(
        "SELECT qrcode FROM subject WHERE subject = ?",[subject],
          async (err, row) => {
            if (row.qrcode == qr) {
              db.run(
                'INSERT INTO attendance (username, date, time, qrcode, subject) VALUES (?, ?, ?, ?, ?)',
                [username, new Date().toLocaleDateString(), new Date().toLocaleTimeString(), qr, subject],
                (err) => {
                  if (err) {
                    return res.status(500).json({ error: 'User registration failed' });
                  }
                  res.status(201).json({ message: 'attendace marked', user:  row.username  ,subject:subject});
                }
              );
            }
          
          }
        )
      
    }
  );


});


app.post("/getqrcode", async(req, res) => {
  const { username, password, subject } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  } else {

    db.get(
      'SELECT id, username, password FROM users WHERE username = ? ',
      [username],
      async (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (!row) {
          return res.status(401).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, row.password);

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Incorrect password' });
        }
        db.get(
          'SELECT qrcode FROM subject WHERE subject = ?',
          [subject],
          async (err, row) => {
            if (err) {
              return res.status(500).json({ error: 'Internal server error' });
            }

            if (!row) {
              return res.status(401).json({ error: 'Internal server error' });
            }
            res.status(200).json({ qr: row.qrcode, message: "Succesful" })
          }
        );

      }
    );
  }
})


app.post('/removeqr', (req, res) => {
  const { username, password, teacher, subject } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  if (teacher == 1) {
    db.get(
      'SELECT id, username, password FROM users WHERE username = ?',
      [username],
      async (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (!row) {
          return res.status(401).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, row.password);

        if (!passwordMatch) {
          return res.status(401).json({ error: 'Incorrect password' });
        }
        db.run(
          'DELETE FROM subject WHERE subject = ?',
          [subject],
          (err) => {
            if (err) {
              return res.status(500).json({ error: 'User registration failed' });
            }
            res.status(201).json({ message: 'User registered successfully' });
          }
        );
        res.status(200).json({ message: 'qr session destroyed' });
      }
    );
  } else {
    return res.status(401).json({ error: 'User not found' });
  }
})

app.listen(port, ip , () => {
  console.log(`Server is running on http://${ip}:${port}`);
});
