var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var path = require('path');

//Middleware
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

USERS = [];

var userId = 1;

//GET Request
app.get('/users', (req,res) => {
    res.send(JSON.stringify(USERS));
})

//POST Request
app.post('/users', (req, res) => {
if(req.body.email && req.body.username && req.body.password && req.body.profession){
    var user = {
        id : userId,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        profession : req.body.profession
    }

    USERS.push(user);
    res.send('Records have been inserted and your id is ' +userId);
    userId += 1;
} else {
    res.send('Please fill all the details');
}
});


//PUT Request
app.put('/users', (req, res)=>{
    var userEmail = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var profession = req.body.profession;
   for(var i=0; i < USERS.length; i++){
       if(USERS[i].email === userEmail){
           console.log('Match Found');
           if(username && password && profession){
           USERS[i].username = username;
           USERS[i].password = password;
           USERS[i].profession = profession;
           res.send('Records Updated');
           } else if (username) {
            USERS[i].username = username;
            res.send('Username Updated');
           } else if(password) {
               USERS[i].password = password;
               res.send('Password Updated');
           } else if(profession) {
               USERS[i].profession = profession;
               res.send('Profession Updated');
           }
       } else {
           console.log('Match Not FPund');
       }
   }
});


//DELETE Request
app.delete('/users', (req,res) => {
    var userEmail = req.body.email;
    USERS.forEach((user)=> {
        if(user.email === userEmail){
            console.log(user.id)
            USERS.splice(user.id-1, 1);
            res.send('Deleted the requested object');
        }
    })
})




//Server Port
app.listen(3000, ()=> {
    console.log('Server is running at port 3000');
})
