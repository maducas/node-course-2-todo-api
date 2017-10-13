var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    //in postman, use URL: localhost:3000/todos
    //JSON sent in postman: 
    /*
    {
	"text": "This is from postman"
    }
    */
    var todo = new Todo({
        //create the new todo from what was received from Postman
        text: req.body.text
    });
    todo.save().then( (doc) => {
        res.send(doc); //send the document back
    }, (e) => {
        res.status(400).send(e); //send the error back
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};

//get Todos from the DB and send the to the display
app.get('/todos', (req, res) => {
    Todo.find().then( (todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
})
/******************************* */
/*
var newTodo = new Todo({
    text: 'Cook dinner'
});
*/

/*
var newTodo = new Todo( {
    text: 'Go to grocery store',
    completed: false
    //{ completedAt: 1500}
});
*/
/*
newTodo.save().then((doc) => {
    console.log('Saved todo', doc);
}, (e) => {
    console.log(e);
});
*/

/*
var otherTodo = new Todo({
    text: 'Call distributel',
    completed: false,
    completedAt: 123
 }); 

otherTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log(e);
});
*/


/*
var firstUser = new User({
    email: "ma_ducas@hotmail.com"
});

firstUser.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log(e);
});
*/