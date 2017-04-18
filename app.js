const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const sqlite3    = require('sqlite3').verbose();
const db         = new sqlite3.Database('db.sqlite3');

const app        = express();


//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Static path
app.use(express.static(path.join(__dirname, 'public')));


//Routes
// app.post('/data',(req, res, next)=> {
//     db.all('select * from fruit', (err, results)=> {
//     res.send(results);     
//     });
    
// });

app.get('/openfridge', (req, res)=> {
    
    var tableName = req.query.id;
    
    db.all('select * from ' + tableName, (err, results)=> {
        res.send(results); 
        // console.log(results);
    });
});

app.post('/save', (req, res)=> {
    var tableName = req.body.id;
    var itemToAdd = req.body.val;
    var stmt = db.prepare("INSERT INTO " + tableName + " VALUES (?)");
    stmt.run(itemToAdd);
    stmt.finalize();
    // console.log("tableName: " + tableName + " itemToAdd: " + itemToAdd );
});

app.listen(3000, function() {
    console.log('Server runs on port 3000');
});