let jsonPath = require("/hospitals.json");

let promise = fetch(jsonPath)
    .then(response => response.json())
    .then(hospitals => {
        let table = document.querySelector("table");
        hospitals.forEach(hospital => {
            let tr = createRow([hospital.full_name, hospital.address, hospital.phone, ""]);
            table.append(tr);
        })
    });
    
function createElement(name) {
    return document.createElement(name);
}      
let table = createElement("table");
let container = document.querySelector(".list");
container.append(table);

function createRow(content) {
    let tr = createElement("tr");
    content.forEach(copy => {
        let td = createElement("td");
        td.innerText = copy;
        tr.append(td);
    });
    return tr;
}

let header = createRow(["name", "address", "phone", ""]);
table.append(header);

console.log(1);
