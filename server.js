const express = require('express');
const app = express();

const { sequelize, User } = require('./models');

app.use(express.json());

// Test that the server is running
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// Get a user by id
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await User.create({ name, email });
        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }  
});

app.listen(3000, async () => {
    await sequelize.sync({ force: true });
    console.log("Database & tables synced!");
    console.log('Server started on port 3000');
});