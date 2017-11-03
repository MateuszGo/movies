# movies
API written using node.js, express.js and mongoDB, tested with Postman.
Deployed to Heroku on address: https://mgmovies.herokuapp.com/
Database initially populated with 3 movies.

Endpoints:

	Show movies list (sorted desc. by rating)
		URL: /movies
		Method: GET
		Params: none
		Success Response:
			Code: 200
			Content: [{
        		"title": "fivyt",
        		"rating": 4.2,
        		"director": "dfsfdsfdsfdsf",
        		"createdAt": "2017-11-02T11:43:43.094Z",
        		"actors": [
            		"dfasdasd",
            		"sdfdsfdsfds"
        		],
        		"id": "59fb04ef963732030c4ad802"
    		},
    		{
        		"title": "fivy",
        		"rating": 3.32,
        		"director": "dfsfdsfdsfdsf",
        		"createdAt": "2017-11-02T11:47:09.670Z",
        		"actors": [
            		"dfasdasd",
            		"sdfdsfdsfds"
        		],
        		"id": "59fb05bd643a590313904677"
    		}]
		Error Response:
			Code: 503
			Content: {"errorMessage": "Database maintenance"}
		Sample Call:
			curl -X GET \
  			https://mgmovies.herokuapp.com/movies \
  			-H 'cache-control: no-cache' \

  	Add new movie
  		URL: /movies
  		Method: POST
  		Params:
  			Required:
  				title : String (3-50 characters, only letters allowed)
  				rating : Number
  				director : String
  				actors : [String]
  		Success Response:
  			Code: 201
  			Content:
  				{
    				"title": "Rocky",
    				"rating": 8.21,
    				"director": "John Avildsen",
    				"createdAt": "2017-11-03T09:58:28.494Z",
    				"actors": [
       					"Sylvester Stallone",
        				"Talia Shire"
    				],
    				"id": "59fc3dc4281e1d0012c16699"
				}
		Error Response:
			Code: 400
			Content (on title field removal):
				{"errorMessage": "Movie validation failed: title: Path `title` is required."}
			OR (on wrong title format):
				{"errorMessage": "Movie validation failed: title: Title should be between 3-50 characters long and include only letters"}
		Sample Call:
			curl -X POST \
  			https://mgmovies.herokuapp.com/movies \
  			-H 'cache-control: no-cache' \
  			-H 'content-type: application/json' \
  			-d '{
    			"title": "Rocky",
    			"rating": 8.21,
    			"director": "John Avildsen",
    			"actors": ["Sylvester Stallone", "Talia Shire"]
			}'
			OR
			curl -X POST \
  			https://mgmovies.herokuapp.com/movies \
  			-H 'cache-control: no-cache' \
  			-H 'content-type: application/x-www-form-urlencoded' \
  			-d 'director=John%20Avildsen&actors%5B0%5D=Sylvester%20Stallone&actors%5B1%5D=Talia%20Shire&title=Rocky&rating=8.21'

  	Remove movie
  		URL: /movies/{id}
  		Method: DELETE
  		URL params:
  			{id} = 24-digit HEX value
  		Success Response:
  			Code: 204
  			Content: {}
  		Error Response:
  			Code: 400
  			Content: {"errorMessage": "Improper id"}
  		Sample Call:
  			curl -X DELETE \
  			https://mgmovies.herokuapp.com/movies/59fc3d36281e1d0012c16697 \
  			-H 'cache-control: no-cache' \






		


