let jsonPath = require("/hospitals.json");

let promise = fetch(jsonPath)
    .then(response => response.json())
    .then(hospitals => {
        let table = document.querySelector("table");
        hospitals.forEach(hospital => {
            let tr = createHospitalRow(hospital);
            table.tBodies[0].append(tr);
        })
    });
    
function createElement(name, options = {}) {
    let element = document.createElement(name);
    if (options.className) {
        element.className = options.className;
    }
    return element;
}    

function createTable() {
    let table = createElement("table", {className: "table table-hover"});
    let thead = createElement("thead", {className: "thead-dark"});
    let tbody = createElement("tbody");
    table.append(thead);
    table.append(tbody);
    return table;
}

let table = createTable();
let container = document.querySelector(".list");
container.append(table);

function createRow(content, options = {child:"td"}) {
    let tr = createElement("tr");
    content.forEach(copy => {
        let td = createElement(options.child);
        td.innerText = copy;
        tr.append(td);
    });
    return tr;
}

function createHospitalRow(hospital) {
    let tr = createRow([hospital.full_name, hospital.address, hospital.phone, ""]);
    let deleteButton = createElement("button", {className: "btn btn-dark"}); 
    let editButton = createElement("button", {className: "btn btn-light mr-3"});
    deleteButton.innerText = "Delete";
    editButton.innerText = "Edit";
    let lastChild = tr.children[tr.children.length - 1];
    lastChild.append(editButton, deleteButton);
    return tr;
}

let header = createRow(["name", "address", "phone", "actions"], {child: "th"});
table.tHead.append(header);

