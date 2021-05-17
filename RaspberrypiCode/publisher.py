import paho.mqtt.client as mqtt
import time
import os

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected success")
    else:
        print("Connected fail with code", {rc})


client = mqtt.Client()


def make_connection():
    myhost = os.getenv('BROKER_ADDRESS')
    myport = int(os.getenv('BROKER_PORT'))
    myuser = os.getenv('BROKER_USER')
    mypassword = os.getenv('BROKER_PWD')
    mykeepalive = int(os.getenv('BROKER_KEEP_ALIVE'))
    client.username_pw_set(username=myuser, password=mypassword)
    client.on_connect = on_connect
    client.will_set('/uc3m/classrooms/leganes/myclass/device_info', '{"status":"Off"}')
    client.connect(myhost, myport, mykeepalive)


def send_temperature(temperature):
    # parameters: topic, sending content, QoS and whether retaining the message
    client.publish('/uc3m/classrooms/leganes/myclass/temperature', payload=temperature, qos=0, retain=False)
    print("Temperature sent")
    time.sleep(1)


def send_humidity(humidity):
    # parameters: topic, sending content, QoS and whether retaining the message
    client.publish('/uc3m/classrooms/leganes/myclass/humidity', payload=humidity, qos=0, retain=False)
    print("Humidity sent")
    time.sleep(1)


def send_id(id):
    # parameters: topic, sending content, QoS and whether retaining the message
    client.publish('/uc3m/classrooms/leganes/myclass/device_id', payload=id, qos=0, retain=False)
    print("Device ID sent")
    time.sleep(1)
