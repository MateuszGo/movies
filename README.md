# movies
json REST api for movies

API written using node.js and mongoDB, tested with Postman
Endpoints:

	Show movies list (sorted desc. by rating)
		URL: /movies
		Method: GET
		Params: none
		Success Response:
			Code: 200
			Content: JSON array of movie objects
		Error Response:
			Code: 503
			Content: {"errorMessage": "Database maintenance"}
		


