from flask import Flask,request,url_for,redirect,render_template

app2=Flask(__name__)

@app2.route("/", methods=["GET","POST"])
def index():
    if request.method == "POST":
        print request.form
        '''
        addresses = {
            'address1':request.form['address1'],
            'address2':request.form['address2']
        }
        '''
        return redirect(url_for('directions'))
    else:
        return render_template("autotest.html")

@app2.route("/directions/", methods=["GET", "POST"])
def directions(addresses):
    return render_template("directions.html")



if __name__=="__main__":
    app2.debug=True
    app2.run()

