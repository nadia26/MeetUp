from flask import Flask,request,url_for,redirect,render_template

app=Flask(__name__)

@app.route("/", methods=["GET","POST"])
def index():
	if request.method == "POST":
		print request.form
		addresses = {
			'address1': request.form['address1'],
			'address2': request.form['address2']
		}
		return redirect(url_for('results', addresses=addresses))
   	else:
   		return render_template("main.html")

@app.route("/results/<addresses>", methods=["GET","POST"])
def results(addresses):
	return render_template("results.html")

@app.route("/suggestions", methods=["GET","POST"])
def suggestions(mspot,ptype):
        #mspot will be the address that they are meeting at
        #ptype=
        return render_template("suggestions.html")
        
if __name__=="__main__":
   app.debug=True
   app.run()
