from flask import Flask,request,url_for,redirect,render_template

app=Flask(__name__)

@app.route("/", methods=["GET","POST"])
def index():
    if request.method == "POST":
        addresses = {
            'address1':request.form['address1'],
            'address2':request.form['address2']
        }
        return redirect(url_for('directions', addresses=addresses))
    else:
        return render_template("main.html")



@app.route("/directions/<addresses>", methods=["GET", "POST"])
def directions(addresses):
    return render_template("directions.html", addresses=addresses)


if __name__=="__main__":
    app.debug=True
    app.run()
