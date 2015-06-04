from flask import Flask,request,url_for,redirect,render_template, session
from pymongo import MongoClient
from functools import wraps
from mongo_utils import register, authenticate

app=Flask(__name__)

@app.route("/register", methods=["GET","POST"])
def signup():
    if request.method == "POST":
        print(request.form)
        password = request.form['password']
        username = request.form['username']
        register(username, password)
        session['user'] = username
        return redirect(url_for('index'))
    return render_template("register.html")

@app.route("/", methods=["GET","POST"])
def index():
    if request.method == "POST":
        if request.form["b"] == "search":
            addresses = {
                'address1':request.form['address1'],
                'address2':request.form['address2']
            }
            return redirect(url_for('directions', addresses=addresses))
        elif request.form["b"] == "login":
            if authenticate(request.form["username"], request.form["password"]):
                session["user"] = request.form["username"]
            return redirect(url_for("index"))
    else:
        return render_template("main.html",user=session['user'])

@app.route("/directions/<addresses>", methods=["GET", "POST"])
def directions(addresses):
    return render_template("directions.html", addresses=addresses)

if __name__=="__main__":
    app.debug=True
    app.secret_key = "SHH"
    app.run()
