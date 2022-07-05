let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

// Designing a Schema. Must create a variable out of it. Variable = mongoose.Schema({})
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Genre'  
  },
    Director: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Director'
    },
    ImagePath: String,
    Featured: Boolean
  });
  
  let userSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{type: String, required: true}]
  });

  userSchema.statics.hashPassword = function(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    console.log(hash);
    return hash;
  };
  
  userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
  };


  let directorSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Bio: {type: String, required: true},
    Birth: {type: Date, required: true},
    Death: {type: Date}
    });
  
  let genreSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true}
    });
  
  // Creates models out of the above designed schema. One line for each.
  // First paramter for the ( , ) is set as the name of the schema, while the second is used to refer to which schema is being used.
  // Any title will be returned on the other side lowercase and pluralized; ex. Movie will be returned as db.movies
  let Movie = mongoose.model('Movie', movieSchema);
  let User = mongoose.model('User', userSchema);
  let Genre = mongoose.model('Genre', genreSchema);
  let Director = mongoose.model('Director', directorSchema);
  
  // Exporting the models based on variables outlined above. module.exports.(variable name)
  module.exports.Movie = Movie;
  module.exports.User = User;
  module.exports.Director = Director;
  module.exports.Genre = Genre;

  //test