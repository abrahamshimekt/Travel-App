const mongoose = require('mongoose');
const db = mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {       
}).then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Failed to connect to the database', err);
});     

module.exports = db;

