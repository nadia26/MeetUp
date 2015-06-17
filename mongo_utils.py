from pymongo import MongoClient
conn = MongoClient()
db = conn["meetup"]

def register(uname, pword, address):
	db.accounts.insert({"username":uname,"password":pword,"address":address,"dates":[]})

def authenticate(uname,pword):
	user = db.accounts.find_one({"username":uname,"password":pword})
	if user:
		return True
	return False

def add_date(date, uname):
	dates = db.accounts.find_one_and_update({"username":uname},{'$addToSet':{'dates':date}})
	print dates
	if dates:
                print "succesfully added date"
		return True
	return False

def get_dates(uname):
	dates = db.accounts.find_one({'username':uname})['dates']
	return dates
