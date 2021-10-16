// must require all modules, and frameworks
const { Router, request } = require('express');
let express = require('express');
let morgan = require('morgan');
let uuid = require('uuid');
let app = express();
let mongoose = require('mongoose');
// const bcrypt = require('bcrypt');


// Cross-Origin Resource Sharing
let cors = require('cors');

let allowedOrigins = ['http://localhost:3000', 'https://quiet-headland-10477.herokuapp.com/', 'http://localhost:1234', 'https://en.wikipedia.org'];

app.use(cors(
//  {
//  origin: (origin, callback) => {
//    if(!origin) return callback(null, true);
//    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
//      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
//      return callback(new Error(message ), false);
//    }
//    return callback(null, true);
//  }
//}

));

app.use(express.json());

// /.models.js is the file that refers to the created models. Is used as a module now. 
let Models = require('./models.js');
let auth = require('./auth.js')(app);
let passport = require('passport');
let passportFile = require('./passport.js');
let {check, validationResult} = require('express-validator');


// these refer to the models created in the models.js
const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

// make this statement to connect to the database you want to grab the data from.
// in this case, the database is called movieFlixDB
// mongoose.connect('mongodb://localhost:27017/movieFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect( process.env.CONNECTION_URI || 'mongodb://localhost:27017/movieFlixDB' , { useNewUrlParser: true, useUnifiedTopology: true });


app.use(morgan('common'));

app.use(express.static('public'));



app.get('/', function (request, response) {
  response.send('Welcome to Mobflix!');
});

// Getting a list of movies from Database
app.get('/movies',
//        passport.authenticate('jwt', {session: false}), 
        function (request, response) {
  Movies.find() //must include a .then and .catch
    .then(function(movies){ //.then is dedicated for the resonse upon a fullfillment
      response.status(201).json(movies);
    })
    .catch(function(err){ //.catch is dedicated for an error response for a failure
      console.error(err);
      response.status(500).send('Error: ' + err);
    });
});


// Getting a specific movie from Database
app.get('/movies/:Title', passport.authenticate('jwt', {session: false}),function (request, response) {
Movies.findOne({Title: request.params.Title})
    .then(function(movies){
      response.status(201).json(movies);
    })
    .catch(function(err){
      console.error(err);
      response.status(500).send('Error: ' + err);
    });
});


// Getting all genre from Database
app.get('/genres', passport.authenticate('jwt', {session: false}),function (request, response) {
  Genres.find()
      .then(function(genre){
        response.status(201).json(genre);
      })
      .catch(function(err){
        console.error(err);
        response.status(500).send('Error: ' + err);
      });
  });


// Getting a specific genre from Database
app.get('/genres/:Name', passport.authenticate('jwt', {session: false}), function (request, response) {
  Genres.findOne({Name: request.params.Name})
      .then(function(genre){
        response.status(201).json(genre);
      })
      .catch(function(err){
        console.error(err);
        response.status(500).send('Error: ' + err);
      });
  });


// Getting all directors from database
app.get('/directors', passport.authenticate('jwt', {session: false}), function (request, response) {
  Directors.find()
      .then(function(director){
        response.status(201).json(director);
      })
      .catch(function(err){
        console.error(err);
        response.status(500).send('Error: ' + err);
      });
  });


// Getting a specific director from Database
app.get('/directors/:Name', passport.authenticate('jwt', {session: false}), function (request, response) {
  Directors.findOne({Name: request.params.Name})
      .then(function(director){
        response.status(201).json(director);
      })
      .catch(function(err){
        console.error(err);
        response.status(500).send('Error: ' + err);
      });
  });


// return a list of users
app.get('/users', function (request, response) {
  Users.find()
    .then(function(users){
      response.status(201).json(users);
    })
    .catch(function(err){
      console.error(err);
      response.status(500).send('Error: ' + err);
    });
});

// return a specifc user
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), function (request, response) {
  Users.findOne({Username: request.params.Username})
    .then(function(users){
      response.status(201).json(users);
    })
    .catch(function(err){
      console.error(err);
      response.status(500).send('Error: ' + err);
    });
});


// Create a new user
app.post('/users', 
  //check([field in req.body to validate], [error message if validation fails]).[validation method]();
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ],
    (req, res) => {

      let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);

      Users.findOne({ Username: req.body.Username })
        .then((user) => {
          if (user) {
            return res.status(400).send(req.body.Username + ' already exists');
          } else {
            Users
              .create({
                Name: req.body.Name,
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthday: req.body.Birthday
              })
              .then((user) =>{res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            })
          }
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        });
    });


// update a user details
app.put('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, 
    { $set:
      {
        Name: req.body.Name,
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// adding a favorite movie to user list
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $pull: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Delete a user by name
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});




const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});