FROM python:3.7.3

COPY /app /etc/usr/src/app

WORKDIR /etc/usr/src/app

RUN pip install requests PyYAML paho-mqtt

ENTRYPOINT ["python"]
CMD ["message_router.py"]