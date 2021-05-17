import mysql.connector
import os
import json


def connect_database():
    mydb = mysql.connector.connect(
        host=os.getenv('DBHOST'),
        user=os.getenv('DBUSER'),
        password=os.getenv('DBPASSWORD'),
        database=os.getenv('DBDATABASE')

    )
    return mydb


def measurements_register(params):
    mydb = connect_database()
    with mydb.cursor() as mycursor:
        query = "INSERT INTO data_device (device_id, temperature, humidity, date_measurement) VALUES (%s, %s, %s, %s);"
        measurements = (params["device_id"], params["temperature"], params["humidity"], params["date_measurement"])
        try:
            mycursor.execute(query, measurements)
            mydb.commit()
            print(mycursor.rowcount, "record inserted.")
        except:
            print("Error inserting the measurement")


def measurements_retriever():
    mydb = connect_database()
    r = []
    with mydb.cursor() as mycursor:
        query = "SELECT device_id, temperature, humidity, date_measurement FROM data_device ORDER BY id DESC;"
        mycursor.execute(query)
        myresult = mycursor.fetchall()
        for device_id, temperature, humidity, date_measurement in myresult:
            r.append(
                {"device_id": device_id, "temperature": temperature, "humidity": humidity, "date": date_measurement})
        mydb.commit()

    result = json.dumps(r, sort_keys=True)
    return result
