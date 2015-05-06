from flask import Flask,request,url_for,redirect,render_template

app=Flask(__name__)

@app.route("/", methods=["GET","POST"])
def index():
    if request.method == "POST":
        print request.form
        addresses = [
            request.form['address1'],
            request.form['address2']
        ]
        return redirect(url_for('results', addresses=addresses))
    else:
        return render_template("main.html")

@app.route("/results/<addresses>", methods=["GET","POST"])
def results(addresses):
    addresses = "[u'AAAAAA', u'BBBBB']"
addresses = addresses[1:-1]
addresses = addresses.split(', ')
for i in range (len (addresses) ):
    x = addresses[i]
    addresses[i] = x[2:-1]
print addresses
    return render_template("results.html", addresses = addresses)

if __name__=="__main__":
    app.debug=True
    app.run()
