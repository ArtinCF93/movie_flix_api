<h1>MovieFlix API</h1>
<hr>

https://quiet-headland-10477.herokuapp.com/

Description: A movie app enables registered users to view displayed movies along with genre, director and movie details while creating and modifying their own favorite movie lists.

Usage: After navigating to the website, the opening prompt will appear. Navigate to /login to login with your details. You will be asked for your credentials every time you login. You can see the list of movies with all their details (movie description, genre, director) once you login. You can also create your favorite movie list which you can later modify (add/delete movies to/from your list). Users can also deregister by deleting their profiles on the app.

Test credentials: 
[
{"_id":"621c0371b3e62c8fc677fe37"},
"Name":"Test",
"Username":"Testuser",
"Password":"$2b$10$Z5NqDcY5rl9/rMtQbyWws.v/F9vZEZVfD1ECNhq2MrJpSIvUVH4U6",
"Email":"test@gmail.com",
"Birthday":{"$date":{"$numberLong":"662688000000"}},
"FavoriteMovies":[]
]

Password: Testing


<h1>Features and Endpoints</h1>
<hr>

GET: ‘/movies’ returns a list of all movies from database

GET ‘/movies/:Title’ returns a single movie’s data based on the title provided in the parameter.

GET ‘/genres’ returns a list of all genres from database

GET ‘/genres/:id’ returns a single genre’s data based on the genre _id provided in the parameter

GET ‘/directors’ returns a list of all directors from database

GET ‘/directors/:id’ returns a single director's data based on the director _id provided in the parameter

GET ‘/users’ returns a list of all users from database

GET ‘/users/:Username’ returns a single user’s data based on the Username provided in the parameter.

POST ‘/users’ creates a new user based on the details provided in a json body object as such;
{
            "Name": "Ben Turner",
            "Username": "BenTurner",
            "Password": "Password",
            "Email": "benturner@gmail.com"
 }
PUT ‘/users/:Username’ updates a specific user’s details.User is specified based on the Username provided in the parameter. Details are updated based on the information provided in a json body object, the same as above.

POST ‘/users/:Username/movies/:id’ adds a movie to the user’s favorite list. Sends the specified movie based on the id,  to the specified user based on the Username parameter.

DELETE  ‘/users/:Username/movies/:id’ deletes a movie from the user’s favorite list. Deletes the specified movie based on the id parameter, from the specified user based on the Username parameter.

DELETE ‘user/:Username’ deletes a single user’s data based on the Username provided in the parameter.


