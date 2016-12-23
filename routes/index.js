var express = require('express');
var router = express.Router();

//data bas calling in Reactjs

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('tododb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'tododb' database");
        db.collection('todolist', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'todolist' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});





/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*GET the data of Todos */
router.get('/data', function(req, res) {
  db.collection('todolist', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
});
/*GET the completed Todos List*/
router.get('/dataCompleted', function(req, res) {
  db.collection('completedtodolist', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
});


/*Add Todos intio the datatbase*/
router.post('/addData',(req,res)=>{
   
    db.collection('todolist', function(err, collection) {
        collection.insert(req.body, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
})

/*DELETE Completed todos from the Data base*/
router.delete('/removeCompleted',(req,res)=>{
   console.log("body",req.body)
    db.collection('todolist', function(err, collection) {
        collection.remove({id:JSON.parse(req.body.id)}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
})
/*Insert Completed todos into the datatbase*/
router.post('/completed',(req,res)=>{
    db.collection('completedtodolist',function(err,collection){
        collection.insert(req.body, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    })
})


router.delete('/deleteCompeted',(req,res)=>{
   console.log("body",req.body)
    db.collection('completedtodolist', function(err, collection) {
        collection.remove({id:(req.body.id)}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
})


module.exports = router;

//demo data 
var populateDB = function() {

    var list = [
    {
        text: "this is test todo",
        id:1},
        
    {
        text: "test",
        id:2,
    }];

    db.collection('todolist', function(err, collection) {
        collection.insert(list, {safe:true}, function(err, result) {});
    });

};