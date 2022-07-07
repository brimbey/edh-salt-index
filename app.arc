@app
edh-salt-index

@aws
# profile default
region us-west-2
runtime nodejs16.x
architecture arm64

@http
/api/import
	method get
	src /api/import
/api/card
	method get
	src /api/card
/api/leaderboard
	method get
	src /api/leaderboard
/api/persist
	method post
	src /api/persist

@static
folder build
spa true

@tables
data
	category *String
	id **String

@tables-indexes
data
	category *String
	salt **Number
	name bySalt

data
	category *String
	id *String
	name byId