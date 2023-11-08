const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const app = express();
const cors = require("cors");
const port = 3000;
class qr {
  constructor(qrcode,username){
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

app.post('/signup', async (req, res) => {
  const { username, password,teacher } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
}
  const hashedPassword = await bcrypt.hash(password, 10);
  
  if (teacher == 1){
    db.run(
      'INSERT INTO users (username, password,teacher) VALUES (?, ?, ?)',
      [username, hashedPassword,teacher],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'User registration failed' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  }else{
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

      res.json({ message: 'Login successful', user: { id: row.id, username: row.username } });
    }
  );
});


app.post("/getqrcode",(req,res) => {
    const { username, password,teacher } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    if (teacher == 1){
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
        qr = new qr(qrcode,username);
        setTimeout(function(){
          qr = null;
        },300000);
        qr.qrcode = qrcode;
        res.json({s:s,message: 'Login successful', user: { id: row.id, username: row.username } });
      }
    );
    }else{
        return res.status(401).json({ error: 'User not found' });
    }

})

app.listen(port,"192.168.0.104", () => {
  console.log(`Server is running on http://${"192.168.0.104"}:${port}`);
});
