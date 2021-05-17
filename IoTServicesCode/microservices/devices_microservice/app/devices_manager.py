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
        query = "INSERT INTO state_device (device_id, location, state) VALUES (%s, %s, %s);"
        device_info = (params["device_id"], params["location"], params["state"])
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
        query = "SELECT device_id, location, state FROM state_device ORDER BY id DESC;"
        mycursor.execute(query)
        myresult = mycursor.fetchall()
        for device_id, location, state in myresult:
            r.append({"device_id": device_id, "location": location, "state": state})
        mydb.commit()

    result = json.dumps(r, sort_keys=True)
    return result
