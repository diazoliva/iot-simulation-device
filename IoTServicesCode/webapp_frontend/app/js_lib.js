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
    let device_id = createElement("p", ["title, id"], [Id]);
    let underscore = createElement("p", ["title, underscore"], ["-"]);
    underscore.style.padding = "0 10px";
    let location = createElement("p", ["title, location"], [Location]);
    let state = createElement("p", ["titleState"], [State]);

    let title = createElement("div", ["title"], [reference_device.outerHTML, device_id.outerHTML, underscore.outerHTML, state.outerHTML, underscore.outerHTML, location.outerHTML]);
    let table = createElement("div", ["tableMeasurements", Id], null);
    table.style.borderLeft = "1px solid black";
    table.style.borderRight = "1px solid black";
    let superiorTable = createElement("div", ["superiorTableMeasurements", Id], [table.outerHTML])
    superiorTable.style.marginTop = "10px";
    superiorTable.style.borderBottom = "1px solid black";
    let deviceContent = createElement("div", ["device", Id], [title.outerHTML, superiorTable.outerHTML]);
    return deviceContent;
}

function createColumnTitleMeasurement(){
    let titleDate = createElement("div", ["titleCellDate"], ["Measurements"]);
    titleDate.style.display = "flex";
    titleDate.style.width = "50%";
    titleDate.style.justifyContent = "center";
    let titleTemperature = createElement("div", ["titleCellTemperature"], ["Temperature"]);
    titleTemperature.style.display = "flex";
    titleTemperature.style.width = "25%";
    titleTemperature.style.justifyContent = "center";
    let titleHumidity = createElement("div", ["titleCellHumidity"], ["Humidity"]);
    titleHumidity.style.display = "flex";
    titleHumidity.style.width = "25%";
    titleHumidity.style.justifyContent = "center";

    let columnTitle = createElement("div", ["columnTitle"], [titleDate.outerHTML, titleTemperature.outerHTML, titleHumidity.outerHTML]);
    columnTitle.style.display = "flex";
    columnTitle.style.height = "50px";
    columnTitle.style.borderRight = "2px solid black";
    columnTitle.style.borderLeft = "2px solid black";
    columnTitle.style.borderTop = "2px solid black";
    columnTitle.style.borderBottom = "2px solid black";
    columnTitle.style.alignItems = "center";
    columnTitle.style.fontWeight = "bold";

    return columnTitle;
}

function createColumnMeasurement(Id, Temperature, Humidity, Date) {
    let contentDate = createElement("div", ["cell", "date"], [Date]);
    contentDate.style.width = "50%";
    contentDate.style.borderRight = "1px solid black";
    contentDate.style.display = "flex";
    contentDate.style.justifyContent = "center";
    contentDate.style.alignItems = "center";
    let contentTemperature = createElement("div", ["cell", "temperature"], [Temperature]);
    contentTemperature.style.width = "25%";
    contentTemperature.style.borderRight = "1px solid black";
    contentTemperature.style.display = "flex";
    contentTemperature.style.justifyContent = "center";
    contentTemperature.style.alignItems = "center";
    let contentHumidity = createElement("div", ["cell", "humidity"], [Humidity]);
    contentHumidity.style.width = "25%";
    contentHumidity.style.display = "flex";
    contentHumidity.style.justifyContent = "center";

    let columnMeasurements = createElement("div", ["columnMeasurements"], [contentDate.outerHTML, contentTemperature.outerHTML, contentHumidity.outerHTML]);
    columnMeasurements.style.display = "flex";
    columnMeasurements.style.height = "30px";
    columnMeasurements.style.width = "100%";
    columnMeasurements.style.borderRight = "1px solid black";
    columnMeasurements.style.borderLeft = "1px solid black";
    columnMeasurements.style.borderTop = "1px solid black";
    columnMeasurements.style.alignItems = "center";
    return columnMeasurements;
}

function getReadyMeasurements(ID, Location, State){
    let deviceContent = createTableMeasurement(ID, Location, State);
    $(deviceContent).appendTo(".measurements");
    let tableTitle = createColumnTitleMeasurement();
    $(tableTitle).prependTo(".superiorTableMeasurements." + ID);
}

function createColumnTitleDevices(){
    let titleDevice = createElement("div", ["titleDeviceCellDevice"], ["Device"]);
    let titleState = createElement("div", ["titleDeviceCellState"], ["State"]);
    let titleLocation = createElement("div", ["titleDeviceCellLocation"], ["Location"]);
    let titleDate = createElement("div", ["titleDeviceCellDate"], ["Date"]);

    let columnTitle = createElement("div", ["columnTitleDevice"], [titleDevice.outerHTML, titleState.outerHTML, titleLocation.outerHTML, titleDate.outerHTML]);
    return columnTitle;
}

function createColumnDevices(Id, Location, State){

}

function getReadyDevices(){
    let devicesColumnTitle = createColumnTitleDevices();
    $(devicesColumnTitle).appendTo(".tableDevices");
}

let server_address = "http://35.241.218.104:5000/"
let get_current_sensor_data = function () {
    $.getJSON(server_address + "dso/measurements/", function (data) {
        $(".tableDevices").empty();
        for (let i = 0; i < data.length; i++) {
            let paramsData = data[i];
            let columnMeasurements = createColumnMeasurement(paramsData.device_id, paramsData.temperature, paramsData.humidity, paramsData.date);
            $(columnMeasurements).appendTo(".tableMeasurements." + paramsData.device_id);
        }
    });
}

let get_device_list = function () {
    $.getJSON(server_address + "dso/state/", function (data) {
        // $(".tableDevices").empty();
        getReadyDevices();
        for (let i = 0; i < data.length; i++) {
            let paramsData = data[i];
            getReadyMeasurements(paramsData.device_id, paramsData.location, paramsData.state);
            let columnDevices = createColumnDevices();
            $("<div> Devices: " + paramsData.device_id + "</div>").appendTo(".device_list");
        }
    });
}


get_device_list();
setInterval(get_current_sensor_data, 2000);