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

    //deleteMany
    /*
    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then( (result) => {
        console.log(result);
    });
    */
    //deleteOne
    /*
    db.collection('Todos').deleteOne({text: 'Eat lunch'}).then( (result) => {
        console.log(result);
    });
    */
    //findOneAndDelete
    /*
    db.collection('Todos').findOneAndDelete({completed: false}).then( (result) => {
        console.log(result);
    });  
    */      
    
    //db.collection('Users').findOneAndDelete({name: /.*Ducas.*/}).then( (result) => {
    //        console.log(result);
    //});    
               

    db.collection('Users').findOneAndDelete({_id: new ObjectID('59e01cff0740a51336b1df44')}).then( (result) => {
            console.log(result);
    }); 
    
    //db.close();
});