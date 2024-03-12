const mongoose = require('mongoose');
const connectDb = () => {
    mongoose.connect(process.env.DBURL).then(() => {
        console.log("Database connection established");
    }).catch(err => {
        console.log("Error connecting database");
        console.error(err);
    })
}

module.exports = connectDb;