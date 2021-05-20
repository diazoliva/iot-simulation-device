import paho.mqtt.client as mqtt
import time
from load_preferences import getPreferences
from datetime import datetime


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected success")
    else:
        print("Connected fail with code", {rc})


client = mqtt.Client()
params = getPreferences("conf.yaml")


def make_connection():
    client.username_pw_set(username=params["broker_user"], password=params["broker_pwd"])
    client.on_connect = on_connect
    client.will_set('/uc3m/classrooms/leganes/myclass/device/info/state', "Inactive")
    client.will_set('/uc3m/classrooms/leganes/myclass/device/info/date_state', datetime.now().strftime("%d/%m/%Y "
                                                                                                       "%H:%M:%S"))
    client.connect(params["broker_address"], params["broker_port"], params["broker_keep_alive"])


def send_temperature(temperature):
    # parameters: topic, sending content, QoS and whether retaining the message
    client.publish('/uc3m/classrooms/leganes/myclass/device/measurements/temperature', payload=temperature, qos=0,
                   retain=False)
    print("Temperature sent")


def send_humidity(humidity):
    # parameters: topic, sending content, QoS and whether retaining the message
    client.publish('/uc3m/classrooms/leganes/myclass/device/measurements/humidity', payload=humidity, qos=0,
                   retain=False)
    print("Humidity sent")


def send_measurement_date(date):
    client.publish('/uc3m/classrooms/leganes/myclass/device/measurements/date', payload=date, qos=0, retain=False)
    print("Date sent")


def send_id(id):
    # parameters: topic, sending content, QoS and whether retaining the message
    client.publish('/uc3m/classrooms/leganes/myclass/device/info/id', payload=id, qos=0, retain=False)
    client.publish('/uc3m/classrooms/leganes/myclass/device/info/state', payload="Active", qos=0, retain=False)
    client.publish('/uc3m/classrooms/leganes/myclass/device/info/date_state', datetime.now().strftime("%d/%m/%Y "
                                                                                                       "%H:%M:%S"))
    print("Device ID sent")

def send_location(location):
    client.publish('/uc3m/classrooms/leganes/myclass/device/info/location', payload=location, qos=0, retain=False)
    print("Location sent")
