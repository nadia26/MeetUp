from flask import Flask,request,url_for,redirect,render_template

app=Flask(__name__)

@app.route("/", methods=["GET","POST"])
def index():
    if request.method == "POST":
        #print request.form
        addresses = {
            'address1':request.form['address1'],
            'address2':request.form['address2']
        }
        return redirect(url_for('directions', addresses=addresses))
    else:
        return render_template("main.html")



@app.route("/auto", methods=["GET", "POST"])
def auto():
    return render_template("autotest.html")


@app.route("/directions/<addresses>", methods=["GET", "POST"])
def directions(addresses):
    return render_template("directions.html", addresses=addresses)


@app.route("/test/<addresses>", methods=["GET", "POST"])
def test(addresses):
    return render_template("test2.html", addresses=addresses)


if __name__=="__main__":
    app.debug=True
    app.run()
