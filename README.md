<h1>MovieFlix API</h1>

https://quiet-headland-10477.herokuapp.com/

Description: A movie app enables registered users to view displayed movies along with genre, director and movie details while creating and modifying their own favorite movie lists.

Usage: After navigating to the website, the opening prompt will appear. Navigate to /login to login with your details. You will be asked for your credentials every time you login. You can see the list of movies with all their details (movie description, genre, director) once you login. You can also create your favorite movie list which you can later modify (add/delete movies to/from your list). Users can also deregister by deleting their profiles on the app.

Test credentials: 

Username: Testuser

Password: Testing


<h1>Features and Endpoints</h1>

<table class="table">
		<thead class="thead-dark">
		  <tr>
			<th scope="col">HTTP Method</th>
			<th scope="col">End Point URL</th>
			<th scope="col">Request</th>
			<th scope="col">Response</th>
			<th scope="col">Format of Response</th>
		  </tr>
		</thead>
		<tbody>
		  <tr>
			<th scope="row">GET</th>
			<td>' / '</td>
			<td>NA</td>
			<td>"Welcome to Mobflix"</td>
			<td>Text</td>
		  </tr>
		  <tr>
			<th scope="row">GET</th>
			<td>' /movies '</td>
			<td>NA</td>
			<td>List of all Movies</td>
			<td>JSON</td>
		  </tr>
		  <tr>
			<th scope="row">GET</th>
			<td>' /movies/:Title '</td>
			<td>Title of Movie</td>
			<td>A JSON object holding data of a single Movie,<br>
				Example:<br>
				{<br>
						"_id": "6141668d44b7a5a6f647d8e0",<br>
						"Title": "Shrek",<br>
						"Description": "Once upon a time, in a far away swamp,
						there lived an ogre named Shrek (Mike Myers) whose precious 
						solitude is suddenly shattered by an invasion of annoying fairy 
						tale characters. They were all banished from their kingdom by the 
						evil Lord Farquaad (John Lithgow). Determined to save their 
						home -- not to mention his -- Shrek cuts a deal with Farquaad and 
						sets out to rescue Princess Fiona (Cameron Diaz) to be Farquaad's bride. 
						Rescuing the Princess may be small compared to her deep, dark secret.",<br>
						"Genre": "6147e412921e904877666dd8",<br>
						"Director": "6147f37d921e904877666df7",<br>
						"ImagePath": "https://en.wikipedia.org/wiki/Shrek#/media/File:Shrek.jpg",<br>
						"Featured": false<br>
						"Actors": [],<br>
				}</td>
			<td>JSON</td>
		  </tr>
		  <tr>
			<th scope="row">GET</th>
			<td>' /genres '</td>
			<td>NA</td>
			<td>List of all Genres</td>
			<td>JSON</td>
		  </tr>
		  <tr>
			<th scope="row">GET</th>
			<td>' /genres/:Name '</td>
			<td>Name of Genre</td>
			<td>A JSON object holding data of a single Genre,<br>
				Example:<br>
					{<br>
						"_id": "6147cf3d921e904877666dbe",<br>
						"Name": "Fantasy",<br>
						"Description": "Fantasy is a genre of speculative fiction set in a
						fictional universe, often inspired by real world myth and folklore."<br>
					}</td>
			<td>JSON</td>
		  </tr>
		  <tr>
			<th scope="row">GET</th>
			<td>' /directors '</td>
			<td>NA</td>
			<td>List of all Directors</td>
			<td>JSON</td>
		  </tr>
		  <tr>
			<th scope="row">GET</th>
			<td>' /directors/:Name '</td>
			<td>Name of Director</td>
			<td>A JSON object holding data of a single Director,<br>
				Example:<br>
					{<br>
						"_id": "6147a5e1dc868250994ebe38",<br>
						"Name": "George Lucas",<br>
						"Bio": "George Lucas  is an American film director, producer,
						screenwriter, and entrepreneur. Lucas is best known for creating
						the Star Wars and Indiana Jones franchises and founding Lucasfilm,
						LucasArts, and Industrial Light & Magic. He served as chairman of
						Lucasfilm before selling it to The Walt Disney Company in 2012.",<br>
						"Birth": "1944-05-14T07:00:00.000Z"<br>
					}</td>
			<td>JSON</td>
		  </tr>
		  <tr>
			<th scope="row">GET</th>
			<td>' /users '</td>
			<td>NA</td>
			<td>List of all Users</td>
			<td>JSON</td>
		  </tr>
		  <tr>
			<th scope="row">GET</th>
			<td>' /users/:Username '</td>
			<td>Username of specific User</td>
			<td>A JSON object holding data of a single User,<br>
				Example:<br>
					{<br>
						"_id": "6147f8a9921e904877666e15",<br>
						"Name": "Gloria Lopez",<br>
						"Username": "GloriusGirl11",<br>
						"Birthday": "1994-07-16T00:00:00.000Z",<br>
						"Email": "Gloria_Lopez@Gmail.com",<br>
						"FavoriteMovies": [<br>
							""<br>
						]<br>
					}</td>
			<td>JSON</td>
		  </tr>
		  <tr>
			<th scope="row">POST</th>
			<td>' /users '</td>
			<td>Name: req.body.Name,<br>
				Username: req.body.Username,<br>
				Email: req.body.Email,<br>
				Birthday: req.body.Birthday</td>
			<td>If Username already exists; req.body.Username + ' already exists' will be returned. 
				If successful creation, a newly created JSON object holding data of a single User.</td>
			<td>JSON</td>
		  </tr>
		  <tr>
			<th scope="row">PUT</th>
			<td>' /users:Username '</td>
			<td>Name: req.body.Name,<br>
				Username: req.body.Username,<br>
				Email: req.body.Email,<br>
				Birthday: req.body.Birthday</td>
			<td>An Updated JSON Object with the requested body input.</td>
			<td>JSON</td>
		  </tr>
		  <tr>
			<th scope="row">PUT</th>
			<td>' /users/:Username/movies/:MovieID '</td>
			<td>Username of User, ID of Movie</td>
			<td>Addition of JSON object of a single movie to the "FavoriteMovies" array</td>
			<td>JSON ObjectId</td>
		  </tr>
		  <tr>
			<th scope="row">DELETE</th>
			<td>' /users/:Username/movies/:MovieID '</td>
			<td>Username of User, ID of Movie</td>
			<td>Deletion of JSON object of single move from the </td>
			<td>NA</td>
		  </tr>
		  <tr>
			<th scope="row">DELETE</th>
			<td>' /users/:Username '</td>
			<td>Username of User</td>
			<td>Deletion of indicated user</td>
			<td>NA</td>
		  </tr>
		</tbody>
	  </table>
