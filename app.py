from flask import Flask,request,url_for,redirect,render_template, session
from pymongo import MongoClient
from functools import wraps
import json
from mongo_utils import register, authenticate, add_date, get_dates

app=Flask(__name__)
addresses = {}
@app.route("/register", methods=["GET","POST"])
def signup():
    if request.method == "POST":
        ## print(request.form)
        password = request.form['password']
        username = request.form['username']
        register(username, password)
        session['user'] = username
        return redirect(url_for('index'))
    return render_template("register.html")

@app.route("/date",methods=['GET','POST','DELETE','PUT'])
def date():
    method = request.method
    json = request.get_json()
    if method == "POST":
        add_date(json, session['user'])
    print "back in app"
    return redirect(url_for("meetups"))

@app.route("/", methods=["GET","POST"])
def index():
    if request.method == "POST":
        if request.form["b"] == "search":
            addresses = {
                'address1':request.form['address1'],
                'address2':request.form['address2']
            }
            return redirect(url_for('directions', addresses=addresses))
        elif request.form["b"] == "logout":
            session.pop('user', None)
        elif request.form["b"] == "login":
            if authenticate(request.form["username"], request.form["password"]):
                session["user"] = request.form["username"]
            return redirect(url_for("index"))
    if "user" in session:
        user= session["user"]
    else:
        user = ""
    return render_template("main.html",user=user)

@app.route("/directions/<addresses>", methods=["GET", "POST"])
def directions(addresses):
    # if request.method == "POST":
    return render_template("directions.html", addresses=addresses, user=session['user'])

@app.route("/meetups",methods=["GET","POST"])
def meetups():
    if request.method == "GET":
        dates = [get_dates(session['user'])]
        return render_template("meetups.html", user=session['user'], dates=dates)

if __name__=="__main__":
    app.debug=True
    app.secret_key = "SHH"
    app.run()
