const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'Data.json');

// Middleware om statische bestanden te serveren
app.use(express.static(__dirname));

// Middleware om JSON-body's te parsen
app.use(bodyParser.json());

// Route om berichten op te slaan
app.post('/saveMessage', (req, res) => {
  const { user, ai } = req.body;

  // Lees bestaande data
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Server error');
    }

    let jsonData = [];
    if (data) {
      jsonData = JSON.parse(data);
    }

    // Voeg nieuw bericht toe aan de data
    jsonData.push({ user, ai });

    // Schrijf de data terug naar het bestand
    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Server error');
      }

      res.send('Message saved successfully');
    });
  });
});

// Start de server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
