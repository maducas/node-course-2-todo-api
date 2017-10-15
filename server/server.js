var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

//get Todos from the DB and send the to the display
app.get('/todos', (req, res) => {
    Todo.find().then( (todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id; //59e0f038ea00a80cdc9e6877
    //valid id using isValid
    if (!ObjectID.isValid(id)) {
        //404 - send back empty body
        return res.status(404).send();
    }
    Todo.findById(id).then( (todo) => {
        //if no document found with this id, it will return null
        if (!todo) {
            //return console.log('Id not found');
            return res.status(404).send();
        }
        res.send({todo});
        //console.log('Todo by ID', todo);
    }).catch((e) => {
        res.status(400).send("");
    }) //this will catch invalid ids (for ex. too many characters)        
});

app.listen(port, () => {
    console.log('Started up at port ' + port);
});

module.exports = {app};
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