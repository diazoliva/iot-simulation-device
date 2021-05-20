# global vars definition
device_id = ""
temperature = 0
humidity = 0
location = "0"
state = 0
measurement_date = ""
state_date = ""


def generate_data_json(message):
    global device_id, temperature, humidity, measurement_date

    if message.topic == "/uc3m/classrooms/leganes/myclass/device/info/id":
        device_id = message.payload.decode("utf-8")

    if message.topic == "/uc3m/classrooms/leganes/myclass/device/measurements/temperature":
        temperature = float(message.payload.decode("utf-8"))

    if message.topic == "/uc3m/classrooms/leganes/myclass/device/measurements/humidity":
        humidity = float(message.payload.decode("utf-8"))

    if message.topic == "/uc3m/classrooms/leganes/myclass/device/measurements/date":
        measurement_date = message.payload.decode("utf-8")

    data = {"device_id": device_id, "temperature": temperature, "humidity": humidity,
            "date_measurement": measurement_date}
    return data


def generate_info_json(message):
    global device_id, location, state, state_date

    if message.topic == "/uc3m/classrooms/leganes/myclass/device/info/id":
        device_id = message.payload.decode("utf-8")

    if message.topic == "/uc3m/classrooms/leganes/myclass/device/info/location":
        location = message.payload.decode("utf-8")

    if message.topic == "/uc3m/classrooms/leganes/myclass/device/info/state":
        state = bool(message.payload.decode("utf-8"))

    if message.topic == "/uc3m/classrooms/leganes/myclass/device/info/date_state":
        state_date = message.payload.decode("utf-8")

    info = {"device_id": device_id, "location": location, "state": state,
            "date": state_date}
    return info
