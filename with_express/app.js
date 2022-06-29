const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtKey = 'jwtKey';

// use body-parser for fetch request body
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// use crypto
// const crypto = require('crypto');
// var key = 'password';
// var algo = 'ase256';

const userModel = require('./Models/users');
app.use('/assets', express.static('assets'));
app.set('view engine', 'ejs');
app.listen(3000);

// connect mongoose
mongoose.connect('mongodb+srv://root:root@cluster0.hucjxrl.mongodb.net/test_node?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log('Connected to Mongo DB!')})
.catch(() => { console.log('Not Connect to Mongo DB!') });

// global middleware
const checkUrlMiddleware = function(req, res, next) {
    console.log('Current url is: ', req.originalUrl);
    next();
};
// use middleware as globally
app.use(checkUrlMiddleware);
app.get('/', function(req, res) {
    res.render('home');
    // res.send("Hello, This is from express.");
});

app.get('/profile/:name', function(req, res) {
    let data = {
        id: 1,
        email: "Prakash@techinfini.com",
        address: "Indore",
        skills: [
            'PHP', "Node Js", "Mysql", "JavaScript", "Jquery", "HTML"
        ]
    };
    res.render('profile', {
        name: req.params.name,
        data: data
    });
});

app.get('/login', function(req, res) {
    console.log(req.query);
    res.render('login');
});
app.post('/login', function(req, res) {
    userModel.findOne({email: req.body.email})
    .then((result) => {
        jwt.sign({result}, jwtKey, {expiresIn: '120s'}, (err, token) => {
            res.status(201).json({result, token});
        });
    });
    console.log(req.query);
});

// api for get all users data
app.get('/getUserList', (req, res) => {
 userModel.find().select('email').then((result) => {
     res.status(201).json(result);
     console.log(result);
 });
});

// api for create a user data
app.post('/createUser', (req, res) => {
    // let cipher = crypto.createCipher(algo, key);
    // let encryptedPassword = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
    // console.log(encryptedPassword)
    let createdUser = new userModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
    });
    createdUser.save().then((result) => {
        jwt.sign({result}, jwtKey, {expiresIn: '120s'}, (err, token) => {
            res.status(201).json({result, token});
        })
    })
    .catch((err) => {
        console.log(err);
    });
});

// api for delete a user by id
app.delete('/deleteUser/:id', function(req, res) {
    let deleteUser = userModel.deleteOne({_id: req.params.id})
    .then((result) => {
        if (result.deletedCount >= 1) {
            res.status(200).json(result);
        } else {
            res.status(200).json({
                "acknowledged": false,
                "deletedCount": 0,
                "message": 'Fetching error, please try again!'
            });
        }
    })
    .catch((err) => {
        res.status(200).json({
            "acknowledged": false,
            "deletedCount": 0,
            "message": 'Fetching error, please try again!'
        });
    });
});

// api for update a user by id
app.put('/updateUser/:id', function(req, res) {
    let userData = {
        "name": req.body.name,
        "email": req.body.email,
        "address": req.body.address
    };
    console.log(userData);
    // userModel.updateOne({_id: req.params.id},{$set: {"name": req.body.name}})
    userModel.updateOne({_id: req.params.id},{$set: userData})
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(200).json({
            "acknowledged": false,
            "deletedCount": 0,
            "message": 'Fetching error, please try again!'
        })
    })
});

// api for search data
app.get('/search/:data', verifyJwtToken, function(req, res) {
    $nameData = new RegExp(req.params.name, 'i');
    userModel.find({name: $nameData})
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(200).json({
            "acknowledged": false,
            "deletedCount": 0,
            "message": 'Fetching error, please try again!'
        })
    })
});

// verify jwt token
function verifyJwtToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');     // split from space send like Bearer abcdefghxyz
        req.token = bearer[1];
        jwt.verify(req.token, jwtKey, (err, authData) => {
            if(err) {
                res.send({
                    "message": "Please provided right token!"
                });
                // throw err;
            }
            else {
                next();
            }
        })
    } else {
        res.send({
            "message": "Token not provided!"
        });
    }
}