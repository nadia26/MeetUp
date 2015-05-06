from flask import Flask, request, url_for, redirect, render_template

app = Flask(__name__)



@app.route("/", methods=["GET", "POST"] )
def index():
    if request.method == "POST":
        print "post"
        addresses = [ request.form['address1'], request.form['address2'] ]
        print addresses
        return redirect(url_for('results', addresses=addresses))
    else:
        print "get"
        return render_template("main.html")



@app.route("/results/<addresses>", methods=["GET", "POST"] )
def results(addresses):
    print "results"
    print addresses
    return render_template("results.html", addresses = addresses)


if __name__ == "__main__":
    app.debug = True
    app.run()
