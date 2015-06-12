from flask import Flask,request,url_for,redirect,render_template

app2=Flask(__name__)

@app2.route("/", methods=["GET","POST"])
def index():
    if request.method == "POST":
        print "abcdefghijklmnop \n\n\n"
        return render_template("autotest.html")
    else:
        print "asdklga;sdklfjf \n\n\n"
        return render_template("autotest.html")

@app2.route("/directions/", methods=["GET", "POST"])
def directions(addresses):
    
    return render_template("directions.html")



if __name__=="__main__":
    app2.debug=True
    app2.run()

