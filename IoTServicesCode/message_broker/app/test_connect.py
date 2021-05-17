import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connect success")
    else:
        print("Connected fail with code",{rc})

client = mqtt.Client()
client.username_pw_set(username="dso_server", password="dsopassword")
client.on_connect = on_connect
client.connect("35.195.224.142",1883,60)
client.loop_forever()