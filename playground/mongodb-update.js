//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //this code is identical to the code above. It uses ES6 variable destructuring

//other ES6 desctructuring example
/*
var user = {name: 'andrew', age: 25};
var {name} = user; 
console.log(name);
*/

//new objectid creation (like field _id generated by MongoDB)
/*
var obj = new ObjectID();
console.log(obj);
*/

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    /*
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('59e01ac70740a51336b1de52')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false    
    }).then( (result) => {
        console.log(result);
    });  
    */
       
    db.collection('Users').findOneAndUpdate({
        name: 'Isabelle'
    }, {
        $set: {
            name: 'Marielle'
        },
        $inc: {
            age: 1
        }        
    }, {
        returnOriginal: false    
    }).then( (result) => {
        console.log(result);
    });  
    
    /*
    db.collection('Users').findOneAndUpdate({
        name: 'Isabelle'
    }, {
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false    
    }).then( (result) => {
        console.log(result);
    });  
    */
 
    //db.close();
});