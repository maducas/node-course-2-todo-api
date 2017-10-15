var mongoose = require('mongoose');
//specify that we will use the standard JS promise library
mongoose.Promise = global.Promise;
//connect to our local DB, if no DB is set on process.env.MONGODB_URI
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {useMongoClient: true});

module.exports = {mongoose};
