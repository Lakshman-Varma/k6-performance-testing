const express = require('express');

const app = express();

app.use(express.json());

app.post('/auth/login', (req, res) => {

    const { username, password } = req.body;

    if (username === 'Lakshman' && password === 'password123') {
        return res.status(200).json({
            message: 'Login successful',
            token: 'dummy-token-123'
        });
    }

    return res.status(401).json({
        message: 'Invalid username or password'
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

app.get("/", (req, res) => {
    res.send("Welcome to My K6 API");
});