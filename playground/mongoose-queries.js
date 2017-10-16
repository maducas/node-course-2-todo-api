const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {ObjectID} = require('mongodb');

var id = '59e0e653e076be100892550a';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

Todo.find({
    _id: id
}).then( (todos) => {
    console.log('Todos ', todos);
});

Todo.findOne({
    _id: id
}).then( (todo) => {
    console.log('Todo ', todo);
});    

Todo.findById(id).then( (todo) => {
    //if no document found with this id, it will return null
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by ID', todo);
}).catch((e) => console.log(e)); //this will catch invalid ids (for ex. too many characters)

var userID = '59e0f038ea00a80cdc9e6877';
User.findById(userID).then( (user) => {
    //if no document found with this id, it will return null
    if (!user) {
        return console.log('User Id not found');
    }
    console.log('User by ID ', user);
}).catch((e) => console.log(e)); //this will catch invalid ids (for ex. too many characters)
