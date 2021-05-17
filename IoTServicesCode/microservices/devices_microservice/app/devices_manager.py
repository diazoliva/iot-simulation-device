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
        query = "INSERT INTO devices (device_id) VALUES (%s);"
        val = params["device"]
        device_id = (val,)
        try:
            mycursor.execute(query, device_id)
            mydb.commit()
            print(mycursor.rowcount, "record inserted.")
        except:
            print("Error inserting the device")


def devices_retriever():
    mydb = connect_database()
    r = []
    with mydb.cursor() as mycursor:
        query = "SELECT device_id FROM devices ORDER BY id DESC;"
        mycursor.execute(query)
        myresult = mycursor.fetchall()
        for device_id in myresult:
            r.append({"device_id": device_id})
        mydb.commit()

    result = json.dumps(r, sort_keys=True)
    return result
