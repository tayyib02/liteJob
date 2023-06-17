const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
console.log('Uncaught exception! 🥲 shutting down...');
console.log(err.name, err.message);
process.exit(1);

});

dotenv.config({ path: './.env' });
const app = require('./index');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connection successfull!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
console.log('Unhandled rejection! shutting down...');
console.log(err.name, err.message);

server.close(() => {
process.exit(1);
});
});