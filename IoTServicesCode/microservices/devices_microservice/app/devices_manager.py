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


def devices_register(params):
    mydb = connect_database()
    with mydb.cursor() as mycursor:
        query = "INSERT INTO info_device (device_id, location, state, date) VALUES (%s, %s, %s, %s) ON DUPLICATE KEY UPDATE location=location AND state=state AND date=date;"
        device_info = (params["device_id"], params["location"], params["state"], params["date"])
        try:
            mycursor.execute(query, device_info)
            mydb.commit()
            print(mycursor.rowcount, "record inserted.")
        except:
            print("Error inserting the device")


def devices_retriever():
    mydb = connect_database()
    r = []
    with mydb.cursor() as mycursor:
        query = "SELECT device_id, location, state, date FROM info_device;"
        mycursor.execute(query)
        myresult = mycursor.fetchall()
        for device_id, location, state, date in myresult:
            r.append({"device_id": device_id, "location": location, "state": state, "date": date})
        mydb.commit()

    result = json.dumps(r, sort_keys=True)
    return result
