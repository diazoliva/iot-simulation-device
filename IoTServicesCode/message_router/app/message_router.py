import time
import paho.mqtt.client as mqtt
from measurement_register_interface import *
from device_register_interface import *
import os
from getInfoJson import *


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected successfully")
        client.subscribe("/uc3m/classrooms/leganes/myclass/device/#")
    else:
        print("Connection fail with code: ", {rc})


def on_message(client, userdata, message):
    if message.topic == "/uc3m/classrooms/leganes/myclass/device/#":
        if message.topic == "/uc3m/classrooms/leganes/myclass/device/measurements/+":
            info = generate_info_json(message)
            submit_device_info_to_store(info)
            print("Info sent: ", info)

        if message.topic == "/uc3m/classrooms/leganes/myclass/device/info/+":
            data = generate_data_json(message)
            submit_data_to_store(data)
            print("Data sent: ", data)

        print("Received message: ", str(message.payload.decode("utf-8")))


# Getting client info
myhost = os.getenv('BROKER_ADDRESS')
myport = int(os.getenv('BROKER_PORT'))
myuser = os.getenv('BROKER_USER')
mypassword = os.getenv('BROKER_PWD')
mykeepalive = int(os.getenv('BROKER_KEEP_ALIVE'))
print(myhost, myport, mykeepalive)
print(myuser, mypassword)

# Starting client
client = mqtt.Client()
client.username_pw_set(username=myuser, password=mypassword)
client.on_connect = on_connect
# Bind function to callback
client.on_message = on_message
# Initializate cursor instance
print("Connecting to broker: ", myhost)
client.connect(myhost, myport, mykeepalive)  # connect
# Start loop to process received messages
client.loop_forever()
