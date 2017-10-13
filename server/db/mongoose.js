var mongoose = require('mongoose');
//specify that we will use the standard JS promise library
mongoose.Promise = global.Promise;
//connect to our local DB
mongoose.connect('mongodb://localhost:27017/TodoApp', {useMongoClient: true});

module.exports = {mongoose};
