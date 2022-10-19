const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors());

const { sequelize, User, Reservation } = require('./models');

// Test that the server is running
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Get all users
app.get('/users', async (req, res) => {
    res.json(await User.findAll());
});

// Get a user by id
app.get('/users/:id', async (req, res) => {
    res.json(await User.findByPk(req.params.id));
});

// Create a user
app.post('/users', async (req, res) => {
    res.json(await User.create(req.body));
});

// Update a user
app.put('/users/:id', async (req, res) => {
    const u = await User.findByPk(req.params.id);
    await u.update(req.body);
    res.json(u);
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    const u = await users.findByPk(req.params.id);
    await u.destroy();
    res.json(u);
});

// Get all reservations of a user
app.get('/users/:id/reservations', async (req, res) => {
    const u = await User.findByPk(req.params.id);
    res.json(await u.getReservations());
});

// Get all reservations
app.get('/reservations', async (req, res) => {
    res.json(await Reservation.findAll({
        include: [{model: User, as: "User"}],
        attributes: {exclude: ['userId', 'UserId']}
    }));
});

// Get a reservation by id
app.get('/reservations/:id', async (req, res) => {
    res.json(await Reservation.findByPk(req.params.id));
});

// Create a reservation
app.post('/reservations', async (req, res) => {
    res.json(await Reservation.create(req.body));
});

// Update a reservation
app.put('/reservations/:id', async (req, res) => {
    const r = await Reservation.findByPk(req.params.id);
    await r.update(req.body);
    res.json(r);
});

// Delete a reservation
app.delete('/reservations/:id', async (req, res) => {
    const r = await Reservation.findByPk(req.params.id);
    await r.destroy();
    res.json(r);
});

//export default app;
module.exports = app;