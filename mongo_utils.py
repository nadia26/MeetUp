from pymongo import MongoClient
conn = MongoClient()
db = conn["meetup"]

def register(uname, pword):
	db.accounts.insert({"username":uname,"password":pword})

def authenticate(uname,pword):
	user = db.accounts.find_one({"username":uname,"password":pword})
	if user:
		return True
	return False