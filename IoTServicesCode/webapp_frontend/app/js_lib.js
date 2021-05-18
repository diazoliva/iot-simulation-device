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


function createTableMeasurement(Id, Location, State) {
    let reference_device = createElement("p", ["titleReference"],["Device:"]);
    reference_device.style.paddingRight = "7.5px";
    let device_id = createElement("p", ["titleId"], [Id]);
    let underscore = createElement("p", ["titleUnderscore"], ["-"]);
    underscore.style.padding = "0 10px";
    let location = createElement("p", ["titleLocation"], [Location]);
    let state = createElement("p", ["titleState"], [State]);

    let title = createElement("div", ["title"], [reference_device.outerHTML, device_id.outerHTML, underscore.outerHTML, state.outerHTML, underscore.outerHTML, location.outerHTML]);
    let table = createElement("div", ["table", Id], null);
    table.style.marginTop = "200px";
    table.style.borderBottom = "1px solid black";
    let deviceContent = createElement("div", ["device", Id], [title.outerHTML, table.outerHTML]);
    return deviceContent;
}

function createColumnMeasurement(Id, Temperature, Humidity, Date) {
    let contentDate = createElement("div", ["cell", "date"], [Date]);
    contentDate.style.width = "50%";
    contentDate.style.borderRight = "1px solid black";
    let contentTemperature = createElement("div", ["cell", "temperature"], [Temperature]);
    contentTemperature.style.width = "25%";
    contentTemperature.style.borderRight = "1px solid black";
    let contentHumidity = createElement("div", ["cell", "humidity"], [Humidity]);
    contentHumidity.style.width = "25%";

    let columnMeasurements = createElement("div", ["columnMeasurements"], [contentDate.outerHTML, contentTemperature.outerHTML, contentHumidity.outerHTML]);
    columnMeasurements.style.display = "flex";
    columnMeasurements.style.borderTop = "1px solid black";
    return columnMeasurements;
}


let server_address = "http://34.76.11.68:5000/"
let get_current_sensor_data = function () {
    $.getJSON(server_address + "dso/measurements/", function (data) {
        $(".table").empty();
        for (let i = 0; i < data.length; i++) {
            let paramsData = data[i];
            let columnMeasurements = createColumnMeasurement(paramsData.device_id, paramsData.temperature, paramsData.humidity, paramsData.date);
            $(columnMeasurements).appendTo(".table." + paramsData.device_id);
        }
    });
}

let get_device_list = function () {
    $.getJSON(server_address + "dso/state/", function (data) {
        for (let i = 0; i < data.length; i++) {
            let paramsData = data[i];
            let deviceContent = createTableMeasurement(paramsData.device_id, paramsData.location, paramsData.state);
            $(deviceContent).appendTo(".measurements");
            $("<div> Devices: " + paramsData.device_id + "</div>").appendTo(".device_list");
        }
    });
}

get_device_list();
setInterval(get_current_sensor_data, 2000);