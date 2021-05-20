import uuid
import threading
import Adafruit_DHT
from publisher import *
from datetime import datetime


def sensor():
    dht_sensor = Adafruit_DHT.DHT11
    dht_pin = 4

    new_temperature = 0
    new_humidity = 0
    while True:
        temperature, humidity = Adafruit_DHT.read(dht_sensor, dht_pin)
        if temperature is not None and humidity is not None:
            if new_temperature != temperature or new_humidity != humidity:
                if new_temperature != temperature:
                    new_temperature = temperature
                    send_temperature(temperature)
                if new_humidity != humidity:
                    new_humidity = humidity
                    send_humidity(humidity)
                send_measurement_date(datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
            print("Temp={0:0.1f}C ".format(temperature))
            print("Hum={0:0.1f}%".format(humidity))
        else:
            print("Sensor failure. Check wiring.")
        time.sleep(3)


def weatherSensor():
    make_connection()
    id = ':'.join(['{:02x}'.format((uuid.getnode() >> ele) & 0xff)
                   for ele in range(0, 8 * 6, 8)][::-1])

    print(id + " - Raspberry 1")
    send_id(id + " - Raspberry 1")


if __name__ == '__main__':
    weatherSensor()
    sensor()
