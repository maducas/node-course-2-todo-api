const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//create a new todo (Posman -> POST command )
app.post('/todos', (req, res) => {
    //in postman, use URL: localhost:3000/todos
    //OR use Heroku URL
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

//get all Todos from the DB and send to the display
app.get('/todos', (req, res) => {
    Todo.find().then( (todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

//get a Todo by specifying it's ID after /todos/ in the address
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
        res.status(400).send();
    }) //this will catch invalid ids (for ex. too many characters)        
});

//delete a todo by specifying it's ID
app.delete('/todos/:id', (req, res) => { 
    //get ID
    var id = req.params.id; //59e0f038ea00a80cdc9e6877
    //validate ID -> not valid? return 404
    if (!ObjectID.isValid(id)) {
        //404 - send back empty body
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then( (todo) => {
        //if no document found with this id, it will return null
        if (!todo) {
            //return console.log('Id not found');
            return res.status(404).send();
        }
        res.send({todo});
        //console.log('Todo by ID', todo);
    }).catch((e) => {
        res.status(400).send();
    }) //this will catch invalid ids (for ex. too many characters)          
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    //this will put in body variable only the required properties.
    //we don't want the user to update property completedAt. 
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        //404 - send back empty body
        return res.status(404).send();
    }  
    
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then( (todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch( (e) => {
        res.status(400).send();
    })
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