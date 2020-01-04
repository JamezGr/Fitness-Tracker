from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('landing.html')


@app.route("/fitness")
def fitness():
    return render_template('fitness.html')


@app.route("/profile")
def edit_profile():
    return render_template('profile.html')


if __name__ == '__main__':
    app.run(debug=True)
