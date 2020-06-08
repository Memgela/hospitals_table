import {renderTable, renderHospitalsList} from "./renderTable";
let jsonPath = require("/hospitals.json");

let promise = fetch(jsonPath)
    .then(response => response.json())
    .then(hospitals => {
        let container = document.querySelector(".list");

        // initialize table
        let table = renderTable(container, hospitals);

        // listen to click delete button and rerender hospitals list
        table.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-button")) {
                hospitals = hospitals.filter((item) => item.id != e.target.dataset.id);
                renderHospitalsList(table, hospitals);
            }
        });

        function saveHandler(event) {
            if (event.target.classList.contains("save-button")) {
                let inputs = document.querySelectorAll(".editInfo");
                let hospital = hospitals.find((item) => item.id == event.target.dataset.id);

                inputs.forEach((input) => {
                    hospital[input.name] = input.value;
                });

                $('#staticBackdrop').modal('hide');   
                renderHospitalsList(table, hospitals);
            }
        }

        $('#staticBackdrop').on('show.bs.modal', function(e) {
            let hospital = hospitals.find((item) => item.id == e.relatedTarget.dataset.id);
            let inputs = document.querySelectorAll(".editInfo");
            inputs.forEach((input) => input.value = hospital[input.name]);
            document.querySelector(".save-button").dataset.id = hospital.id;

            document.addEventListener("click", saveHandler);
        });

        $('#staticBackdrop').on('hide.bs.modal', function(e) {
            document.removeEventListener("click", saveHandler);
        });
    });

