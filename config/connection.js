const mongoose = require('mongoose');

//connecting mongoose to the mongodb database

mongoose.connect('mongodb://localhost:27017/thoughts_with_friendsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//exporting the connection

module.exports = mongoose.connection;