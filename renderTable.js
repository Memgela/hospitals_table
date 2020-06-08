import { createElement } from "./helpers";

function createTable() {
    let table = createElement("table", {className: "table table-hover"});
    let thead = createElement("thead", {className: "thead-dark"});
    let tbody = createElement("tbody");
    table.append(thead);
    table.append(tbody);
    return table;
}

function createRow(content, options = {child:"td"}) {
    let tr = createElement("tr");
    content.forEach(copy => {
        let td = createElement(options.child, {innerText: copy});
        tr.append(td);
    });
    return tr;
}

function createHospitalRow(hospital) {
    let tr = createRow([hospital.full_name, hospital.address, hospital.phone, ""]);
    let deleteButton = createElement("button", {className: "btn btn-dark delete-button", innerText: "Delete"}); 
    deleteButton.dataset.id = hospital.id;
    let editButton = createElement("button", {className: "btn btn-light mr-3 edit-button", innerText: "Edit"});
    editButton.dataset.id = hospital.id;
    editButton.dataset.toggle = "modal"; 
    editButton.dataset.target = "#staticBackdrop";
    let lastChild = tr.children[tr.children.length - 1];
    lastChild.append(editButton, deleteButton);
    return tr;
}

export function renderHospitalsList(table, hospitals) {
    table.tBodies[0].innerHTML = "";
    hospitals.forEach(hospital => {
        let tr = createHospitalRow(hospital);
        table.tBodies[0].append(tr);
    });
} 

export function renderTable(container, hospitals) {
    let table = createTable();

    let header = createRow(["name", "address", "phone", "actions"], {child: "th"});
    table.tHead.append(header); 

    renderHospitalsList(table, hospitals);

    container.append(table);
    return table;
} 