from flask import Flask, render_template
import mysql.connector
import datetime

app = Flask(__name__)

fitness_db = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="",
        database="fitness_tracker"
    )


def get_current_date():

    number_of_day = {
        "Monday": "1",
        "Tuesday": "2",
        "Wednesday": "3",
        "Thursday": "4",
        "Friday": "5",
        "Saturday": "6",
        "Sunday": "7"

    }

    date_today = datetime.datetime.now()

    current_year = date_today.year
    current_month = date_today.strftime("%B")
    current_day = date_today.strftime("%A")
    current_day_number = str(date_today.day)

    day_number = number_of_day[current_day]

    week_number = int(datetime.date(current_year, date_today.month, date_today.day).strftime("%V"))

    if current_day_number[:-1] == 1:
        current_day_number = str(current_day_number) + "st"

    elif current_day_number[:-1] == 2:
        current_day_number = str(current_day_number) + "nd"

    elif current_day_number[:-1] == 3:
        current_day_number = current_day_number + "rd"

    elif current_day_number[:-1] == 11 or current_day_number[:-1] == 12 or current_day_number[:-1] == 13:
        current_day_number = current_day_number + "th"

    else:
        current_day_number = current_day_number + "th"

    # print(str(current_day) + ", " + str(current_day_number) + " " + str(current_month) + " " + str(current_year))
    # print(week_number)
    # print(day_number)

    current_date = [str(day_number), str(week_number), str(current_day), str(current_day_number), str(current_month),
                    str(current_year)]

    print(current_date)

    return current_date


def get_profile_details():

    my_profile = fitness_db.cursor()
    my_profile.execute("SELECT * FROM `users` WHERE `first_name` = 'James' AND `last_name` = 'Grimes'")

    user_details = []

    for db in my_profile:
        user_details.append(db)

    return user_details


profile = get_profile_details()
date = get_current_date()


@app.route("/")
def index():
    return render_template('landing.html')


@app.route("/fitness")
def fitness():
    return render_template('fitness.html', details=profile, date_settings=date)


@app.route("/profile")
def edit_profile():
    return render_template('profile.html', details=profile, date_settings=date)


if __name__ == '__main__':
    app.run(debug=True)

