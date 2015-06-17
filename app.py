from flask import Flask,request,url_for,redirect,render_template, session
from pymongo import MongoClient
from functools import wraps
import json
from mongo_utils import register, authenticate, add_date, get_dates

app=Flask(__name__)
app.config["SECRET_KEY"] = "7182379192"
addresses = {}
@app.route("/register", methods=["GET","POST"])
def signup():
    print "in register"
    if request.method == "POST":
        password = request.form['password']
        username = request.form['username']
        address = request.form['address']
        print address
        register(username, password,address)
        session['user'] = username
        session['address'] = address
        print session["address"]
        return redirect(url_for('index'))
    return render_template("register.html")

@app.route("/date",methods=['GET','POST','DELETE','PUT'])
def date():
    method = request.method
    json = request.get_json()
    if method == "POST":
        add_date(json, session['user'])
    return redirect(url_for("meetups"))

@app.route("/", methods=["GET","POST"])
def index():
    if "user" in session:
        user = session["user"]
    else:
        session["user"] = ""
    if request.method == "POST":
        if request.form["b"] == "search":
            addresses = {
                'address1':request.form['address1'],
                'address2':request.form['address2'],
                'mode': request.form['mode']
            }
            return redirect(url_for('directions', addresses=addresses))
        elif request.form["b"] == "logout":
            if 'user' in session:
                session.pop('user', None)
            session['user'] = ""
        elif request.form["b"] == "login":
            if authenticate(request.form["username"], request.form["password"]):
                session["user"] = request.form["username"]
            return redirect(url_for("index"))
    
    return render_template("main.html",user=session["user"],address=session["address"])

@app.route("/directions/<addresses>", methods=["GET", "POST"])
def directions(addresses):
    if "user" in session:
        user = session["user"]
    else:
        session["user"] = ""
    return render_template("directions.html", addresses=addresses,user=session["user"])

@app.route("/meetups",methods=["GET","POST"])
def meetups():
    if request.method == "GET":
        dates = [get_dates(session['user'])]
        return render_template("meetups.html", user=session['user'], dates=dates)

if __name__=="__main__":
    app.debug=True
    app.secret_key = "SHH"
    app.run()
