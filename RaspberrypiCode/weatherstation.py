import uuid
import threading
import Adafruit_DHT
from publisher import *

def sensor():
    DHT_SENSOR =Adafruit_DHT.DHT11
    DHT_PIN = 4

    newtemperature = 0
    new_humidity = 0
    while True:
        temperature, humidity = Adafruit_DHT.read(DHT_SENSOR,DHT_PIN)
        if temperature is not None and humidity is not None:
            if (newtemperature != temperature):
                newtemperature = temperature
                send_temperature(temperature)
            if new_humidity != humidity:
                new_humidity = humidity
                send_humidity(humidity)
            print("Temp={0:0.1f}C ".format(temperature))
            print("Hum={0:0.1f}%".format(humidity))
        else:
            print("Sensor failure. Check wiring.")
        time.sleep(3)

def weatherSensor():
    make_connection()
    id = ':'.join(['{:02x}'.format((uuid.getnode() >> ele) & 0xff)
                  for ele in range(0, 8*6, 8)][::-1])

    print(id+" - Raspberry 1")
    send_id(id+" - Raspberry 1")


if __name__ == '__main__':
    weatherSensor()
    sensor()
