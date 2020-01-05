import mysql.connector

fitness_db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="",
    database="fitness_tracker"
)

mycursor = fitness_db.cursor()

mycursor.execute("SELECT * FROM `users` WHERE `first_name` = 'James' ")

user_details = []

for db in mycursor:
    user_details.append(db)


full_name = user_details[0][0] + " " + user_details[0][1]

gender = user_details[0][2]
age = user_details[0][3]
height = user_details[0][4]
current_weight = user_details[0][5]
goal_weight = user_details[0][6]

if gender == "M":
    gender = "Male"


print(full_name)
print(gender + ", " + str(age) + " Years Old")

print("\nHeight: " + str(height) + "cm")
print("\nCurrent Weight: " + str(current_weight) + "lbs")
print("Goal Weight: " + str(goal_weight) + "lbs")
