docker exec -it iotservicescode_mariaDB_1 /bin/bash

mysql -uroot -p

#Create database
create database iot_final_data;


grant all privileges on iot_final_data.*TO 'iot_user'@'%' identified by '9R[-RP#64nY7*E*H';

flush privileges;

use iot_final_data;

CREATE TABLE data_device (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    device_id varchar(50),
    temperature float NOT NULL,
    humidity float NOT NULL,
    date_measurement varchar(50) NOT NULL,
    PRIMARY KEY (id)
);

SELECT temperature, humidity FROM sensor_data ORDER BY id DESC LIMIT 1;

CREATE TABLE info_device(
    device_id varchar(50) NOT NULL,
    location varchar(100) NOT NULL,
    state varchar(10) NOT NULL,
    date varchar(50) NOT NULL,
    PRIMARY KEY (device_id)
);

SELECT device_id FROM devices ORDER BY id DESC LIMIT 1;