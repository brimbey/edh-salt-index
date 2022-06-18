@app
begin-app

@http
/api/deck
	method get
	src /api/deck
/api/card
	method get
	src /api/card
/api/leaderboard
	method get
	src /api/leaderboard
/api/flush
	method get
	src /api/flush
/api/persist
	method post
	src /api/persist

@static
folder build
spa true

@aws
runtime nodejs16.x
