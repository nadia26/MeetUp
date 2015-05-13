from flask import Flask,request,url_for,redirect,render_template

app=Flask(__name__)

@app.route("/", methods=["GET","POST"])
def index():
    if request.method == "POST":
        print request.form
        addresses = {
            'address1':request.form['address1'],
            'address2':request.form['address2']
        }
        return redirect(url_for('results', addresses=addresses))
    else:
        return render_template("main.html")

@app.route("/results/<addresses>", methods=["GET","POST"])
def results(addresses):
    return render_template("results.html", addresses=addresses)

##This route is just for transit maps testing
@app.route("/transit", methods=["GET"])
def transit():
        return render_template("transit_maps.html")

@app.route("/test", methods=["GET","POST"])
def test():
        return render_template("test.html")

@app.route("/suggestions/<mspot>", methods=["GET","POST"])
def suggestions(mspot):
        return render_template("suggestions.html")


if __name__=="__main__":
    app.debug=True
    app.run()
