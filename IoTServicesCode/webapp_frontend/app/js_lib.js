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
    let idClass = Id.replace(/\s/g, '');
    let reference_device = createElement("p", ["titleReference"],["Device:"]);
    reference_device.style.paddingRight = "7.5px";
    let device_id = createElement("p", ["title, id"], [Id]);
    let underscore = createElement("p", ["title, underscore"], ["-"]);
    underscore.style.padding = "0 10px";
    let location = createElement("p", ["title, location"], [Location]);
    let state = createElement("p", ["titleState"], [State]);

    let title = createElement("div", ["title"], [reference_device.outerHTML, device_id.outerHTML, underscore.outerHTML, state.outerHTML, underscore.outerHTML, location.outerHTML]);
    let table = createElement("div", ["tableMeasurements", idClass], null);
    table.style.borderLeft = "1px solid black";
    table.style.borderRight = "1px solid black";
    let superiorTable = createElement("div", ["superiorTableMeasurements", idClass], [table.outerHTML])
    superiorTable.style.marginTop = "10px";
    superiorTable.style.borderBottom = "1px solid black";
    let deviceContent = createElement("div", ["device", idClass], [title.outerHTML, superiorTable.outerHTML]);
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
    let idClass = Id.replace(/\s/g, '');
    $(tableTitle).prependTo(".superiorTableMeasurements." + idClass);
}

function createColumnTitleDevices(){
    let titleDevice = createElement("div", ["titleDeviceCellDevice"], ["Device"]);
    titleDevice.style.display = "flex";
    titleDevice.style.width = "15%";
    titleDevice.style.justifyContent = "center";
    let titleState = createElement("div", ["titleDeviceCellState"], ["State"]);
    titleState.style.display = "flex";
    titleState.style.width = "12.5%";
    titleState.style.justifyContent = "center";
    let titleLocation = createElement("div", ["titleDeviceCellLocation"], ["Location"]);
    titleLocation.style.display = "flex";
    titleLocation.style.width = "50%";
    titleLocation.style.justifyContent = "center";
    let titleDate = createElement("div", ["titleDeviceCellDate"], ["Date"]);
    titleDate.style.display = "flex";
    titleDate.style.width = "22.5%";
    titleDate.style.justifyContent = "center";

    let columnTitle = createElement("div", ["columnTitleDevice"], [titleDevice.outerHTML, titleState.outerHTML, titleLocation.outerHTML, titleDate.outerHTML]);
    columnTitle.style.display = "flex";
    columnTitle.style.width = "90%";
    columnTitle.style.height = "50px";
    columnTitle.style.borderRight = "2px solid black";
    columnTitle.style.borderLeft = "2px solid black";
    columnTitle.style.borderTop = "2px solid black";
    columnTitle.style.borderBottom = "2px solid black";
    columnTitle.style.alignItems = "center";
    columnTitle.style.fontWeight = "bold";
    let buttonTitle = createElement("button", null, null);
    buttonTitle.style.width = "9%";
    buttonTitle.style.marginLeft = "7px";;
    buttonTitle.style.display = "none";
    let wholeColumnTitle = createElement("div", null, [columnTitle.outerHTML, buttonTitle.outerHTML]);
    wholeColumnTitle.style.display = "flex";
    wholeColumnTitle.style.alignItems = "center";
    return wholeColumnTitle;
}

function createColumnDevices(Id, Location, State){
    let idClass = Id.replace(/\s/g, '');
    let contentId = createElement("div", ["cell", "id"], [Id]);
    contentId.style.width = "15%";
    contentId.style.borderRight = "1px solid black";
    contentId.style.display = "flex";
    contentId.style.justifyContent = "center";
    contentId.style.alignItems = "center";
    let contentState = createElement("div", ["cell", "state"], [State]);
    contentState.style.width = "12.5%";
    contentState.style.borderRight = "1px solid black";
    contentState.style.display = "flex";
    contentState.style.justifyContent = "center";
    contentState.style.alignItems = "center";
    let contentLocation = createElement("div", ["cell", "location"], [Location]);
    contentLocation.style.width = "50%";
    contentLocation.style.borderRight = "1px solid black";
    contentLocation.style.display = "flex";
    contentLocation.style.justifyContent = "center";
    contentLocation.style.alignItems = "center";
    let contentDate = createElement("div", ["cell", "lastDate"], ["Obteniendo fecha..."]);
    contentDate.style.width = "22.5%";
    contentDate.style.display = "flex";
    contentDate.style.justifyContent = "center";
    contentDate.style.alignItems = "center";

    let columnDevices = createElement("div", ["columnDevice", idClass], [contentId.outerHTML, contentState.outerHTML, contentLocation.outerHTML, contentDate.outerHTML]);
    columnDevices.style.display = "flex";
    columnDevices.style.height = "30px";
    columnDevices.style.width = "90%";
    columnDevices.style.borderRight = "2px solid black";
    columnDevices.style.borderLeft = "1px solid black";
    columnDevices.style.borderBottom = "1px solid black";
    columnDevices.style.alignItems = "center";

    let buttonDevices = createElement("div", ["button", idClass], ["Measurements"]);
    buttonDevices.style.width = "9%";
    buttonDevices.style.marginLeft = "7px";
    buttonDevices.style.justifyContent = "center";

    let wholeColumnDevice = createElement("div", null, [columnDevices.outerHTML, buttonDevices.outerHTML]);
    wholeColumnDevice.style.display = "flex";
    wholeColumnDevice.style.alignItems = "center";

    return wholeColumnDevice;
}

function getReadyDevices(){
    let devicesColumnTitle = createColumnTitleDevices();
    $(devicesColumnTitle).prependTo(".device_list");
    document.getElementsByClassName("table_devices")[0].style.borderLeft = "1px solid black";
}

let server_address = "http://35.241.218.104:5000/"
let get_current_sensor_data = function () {
    $.getJSON(server_address + "dso/measurements/", function (data) {
        $(".tableMeasurements").empty();
        for (let i = 0; i < data.length; i++) {
            let paramsData = data[i];
            let idClass = paramsData.device_id.replace(/\s/g, '');
            let columnMeasurements = createColumnMeasurement(paramsData.device_id, paramsData.temperature, paramsData.humidity, paramsData.date);
            if (i == data.length-1){
                document.getElementsByClassName("columnDevice " + idClass)[0].getElementsByClassName("cell lastDate")[0].textContent = paramsData.date;
            }
            $(columnMeasurements).appendTo(".tableMeasurements." + idClass);
        }
    });
}

let get_device_list = function () {
    $.getJSON(server_address + "dso/state/", function (data) {
        getReadyDevices();
        for (let i = 0; i < data.length; i++) {
            let paramsData = data[i];
            getReadyMeasurements(paramsData.device_id, paramsData.location, paramsData.state, paramsData.date);
            let columnDevices = createColumnDevices(paramsData.device_id, paramsData.location, paramsData.state);
            $(columnDevices).appendTo(".table_devices");
        }
    });
}


get_device_list();
setInterval(get_current_sensor_data, 2000);