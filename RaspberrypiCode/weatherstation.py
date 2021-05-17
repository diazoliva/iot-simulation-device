import uuid
import threading
import Adafruit_DHT
from publisher import *

def temperatureSensor():
    DHT_SENSOR =Adafruit_DHT.DHT11
    DHT_PIN = 4

    newtemperature = 0
    while True:
        temperature = Adafruit_DHT.read(DHT_SENSOR,DHT_PIN)
        if temperature[1] is not None:
            if (newtemperature != temperature[1]):
                newtemperature = temperature[1]
                send_temperature(temperature[1])
            print("Temp={0:0.1f}C ".format(temperature[1]))
        else:
            print("Sensor failure. Check wiring.")
        time.sleep(3)


def humiditySensor():
    DHT_SENSOR = Adafruit_DHT.DHT11
    DHT_PIN = 4

    newhumidity = 0
    while True:
        humidity = Adafruit_DHT.read(DHT_SENSOR, DHT_PIN)
        if humidity[0] is not None:
            if newhumidity != humidity[0]:
                send_humidity(humidity[0])
                newhumidity = humidity[0]
            print("Hum={0:0.1f}%".format(humidity[0]))
        else:
            print("Sensor failure. Check wiring.")
        time.sleep(3)


def weatherSensor():
    make_connection()
    id = ':'.join(['{:02x}'.format((uuid.getnode() >> ele) & 0xff)
                  for ele in range(0, 8*6, 8)][::-1])

    print(id+" -Raspberry 1")
    send_id(id+"-Raspberry 1")


if __name__ == '__main__':
    weatherSensor()
    temperature = threading.Thread(target=temperatureSensor)
    humidity = threading.Thread(target=humiditySensor)
    temperature.start()
    humidity.start()
