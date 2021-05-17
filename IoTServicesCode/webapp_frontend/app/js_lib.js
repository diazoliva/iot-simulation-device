/** Creates an specified element introducing all parameters which are not null */
function createElement(Type, ClassName, Content) {
    let elem = document.createElement(Type);

    if (ClassName != null) {
        ClassName.forEach(function (elemClass) {
            $(elem).addClass(elemClass);
        });
    }

    if (Content != null) {
        Content.forEach(function (elemContent) {
            elem.innerHTML += elemContent;
        });
    }

    return elem;
}

function createColumnMeasurement(Id, Temperature, Humidity, Date) {
    let contentDate = createElement("div", ["cell", "date_measurement"], [Date]);
    let contentTemperature = createElement("div", ["cell", "temperature"], [Temperature]);
    let contentHumidity = createElement("div", ["cell", "humidity"], [Humidity]);

    let columnMeasurements = createElement("div", ["columnMeasurements"], [contentDate.outerHTML, contentTemperature.outerHTML, contentHumidity.outerHTML]);
    let button = createElement("button", ["buttonMeasurements"], ["Medidas"]);
    let column = createElement("div", ["column", Id], [columnMeasurements.outerHTML, button.outerHTML]);
    return column;
}



let server_address = "http://35.195.224.142:5000/"
let get_current_sensor_data = function () {
    $.getJSON(server_address + "dso/measurements/", function (data) {
        $(".measurements").empty();
        for (let i = 0; i < data.length; i++) {
            let paramsData = data[i];
            let columnMeasurement = createColumnMeasurement(paramsData.id_device, paramsData.temperature, paramsData.humidity, paramsData.date_measurement);
            $(columnMeasurement).appendTo(".table");
        }
    });
}

var get_device_list = function () {
    $.getJSON(server_address + "dso/state/", function (data) {
        for (var i = 0; i < data.length; i++) {
            var paramsData = data[i];
            $("<div> Devices: " + paramsData.device + "</div>").appendTo(".device_list");
        }
    });
}

setInterval(get_current_sensor_data, 2000);