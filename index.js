const app = require('./app');
const { sequelize, users } = require('./models');

app.listen(3000, async () => {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    console.log("Connected to the database");
    console.log('Server started on port 3000');
});