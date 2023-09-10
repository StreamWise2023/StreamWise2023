'''
import csv
import datetime


keywords = ['слово1', 'слово2', 'слово3']
user_id = 'xxx'
A = []

with open('file.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        if row[0] in keywords and row[1] == user_id:
            A.append(row[2])

SP = []
SP1 = []

for time in A:

    date_time_obj = datetime.datetime.strptime(str(time), '%Y-%m-%d %H:%M:%S%z')
    SP.append(date_time_obj.date())
    SP1.append(date_time_obj.time())



#for i in range(len(SP)):
    #time_strings[i] = time_strings[i].replace(':', '')

####

times = SP
new_times = []

for time in times:
    hour, minute, second = time.split(":")
    new_hour = str(int(hour) + 1).zfill(2)
    new_time = f"{new_hour}:{minute}:{second}"

    for other_time in times:
        if new_time in [other_time, time]:
            new_times.append(time)
            break
####
print(new_times)
######################
'''

import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
from datetime import datetime

import csv
import datetime

user_id = 'xxx'
movies = ['Movie A', 'Movie B', 'Movie C', 'Movie D', 'Movie E']
# times = ['12:00', '14:30', '16:45', '19:15', '21:30']


A = []

with open('file.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        if row[0] in movies and row[1] == user_id:
            A.append(row[2])

SP = []
times = []

for time in A:
    date_time_obj = datetime.datetime.strptime(str(time), '%Y-%m-%d %H:%M:%S%z')
    SP.append(date_time_obj.date())
    times.append(date_time_obj.time())

times_encoded = [datetime.strptime(time, '%H:%M').timestamp() for time in times]

label_encoder = LabelEncoder()
movies_encoded = label_encoder.fit_transform(movies)

regression_model = LinearRegression()

regression_model.fit(movies_encoded.reshape(-1, 1), np.array(times_encoded).reshape(-1, 1))


def predict_time(movie):
    movie_encoded = label_encoder.transform([movie])
    time_predicted = regression_model.predict(np.array(movie_encoded).reshape(-1, 1))
    return datetime.fromtimestamp(float(time_predicted[0])).strftime('%H:%M')


movie_name = 'Movie B'
predicted_time = predict_time(movie_name)
print(f"time {predicted_time}.")





