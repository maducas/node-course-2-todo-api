const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {ObjectID} = require('mongodb');

//this will remove all todos
/*
Todo.remove({}).then( (result) => {
    console.log(result);
});
*/

/*
Todo.findByIdAndRemove('59e117b265eaeb0ce4228644').then( (todo) => {
    console.log(todo);
});
*/

/*
Todo.findOneAndRemove({ _id: '59e117b265eaeb0ce4228644'}).then( (todo) => {
    console.log(todo);
});
*/