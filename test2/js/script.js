const homeWorkForm = document.querySelector("form[name='homework']");
const switchButton = document.querySelector("button.switch");
const departureSelect = document.querySelector("select[name='departure']");
const arrivalSelect = document.querySelector("select[name='arrival']");

const dayInputs = document.querySelectorAll("input[name='timeframe']");

const daySelection = document.querySelector("section.dayselection");

const submitButton = document.querySelector("form[name='homework'] a:last-of-type");

changeURL();
daySelection.classList.add("hide");

homeWorkForm.addEventListener("submit", (event) => {
    event.preventDefault();
});


switchButton.addEventListener("click", (event) => {
    const departureStation = departureSelect.value;
    const arrivalStation = arrivalSelect.value;

    departureSelect.value = arrivalStation;
    arrivalSelect.value = departureStation;

    changeURL();
});

departureSelect.addEventListener("input", (event) => {
    if(event.target.value === "Amsterdam Centraal") {
        arrivalSelect.value = "Eindhoven Centraal";
    }
    else if(event.target.value === "Eindhoven Centraal") {
        arrivalSelect.value = "Amsterdam Centraal";
    }

    changeURL();
});

arrivalSelect.addEventListener("input", (event) => {
    if(event.target.value === "Amsterdam Centraal") {
        departureSelect.value = "Eindhoven Centraal";
    }
    else if(event.target.value === "Eindhoven Centraal") {
        departureSelect.value = "Amsterdam Centraal";
    }
    
    changeURL();
});

dayInputs.forEach(input => {
    input.addEventListener("input", (event) => {
        if(event.target.value === "other") {
            const daySelectionSelect = document.querySelector("section.dayselection section select");

            if(daySelectionSelect) {
                daySelectionSelect.remove();
            }
            
            const daySelectionInputs = document.querySelector("section.dayselection section");
            const daySelect = document.createElement("select");
            daySelect.setAttribute("name", "day");
            daySelect.setAttribute("id", "day");

            daySelect.appendChild(createDayOption(getDate(1, true), true));

            for(let i = 2; i < 8; i++) {
                daySelect.appendChild(createDayOption(getDate(i, true), false));
            }

            daySelectionInputs.appendChild(daySelect);
            daySelect.addEventListener("input",() => changeURL());
            daySelection.classList.remove("hide");
        }
        else {
            if(!Array.from(daySelection.classList).includes("hide")) {
                daySelection.classList.add("hide");
            }
        }
        changeURL();
    });
});

document.querySelector("input[type='time']").addEventListener("input", () => changeURL());

function changeURL() {
    const selectedDay = document.querySelector("input[name='timeframe']:checked").value;
    if(selectedDay === "current") {
        submitButton.href = `https://www.ns.nl/reisplanner/#/?vertrek=${departureSelect.value}&vertrektype=treinstation&aankomst=${arrivalSelect.value}&aankomsttype=treinstation&type=vertrek&tijd=${getDate(0)}T${getTime()}`;
    }
    else if(selectedDay === "nextday") {
        submitButton.href = `https://www.ns.nl/reisplanner/#/?vertrek=${departureSelect.value}&vertrektype=treinstation&aankomst=${arrivalSelect.value}&aankomsttype=treinstation&type=vertrek&tijd=${getDate(1)}T07:00`;
    }
    else if(selectedDay === "other") {
        const daySelect = document.querySelector("select[name='day']").value;
        const timeSelect = document.querySelector("input[type='time']").value;

        submitButton.href = `https://www.ns.nl/reisplanner/#/?vertrek=${departureSelect.value}&vertrektype=treinstation&aankomst=${arrivalSelect.value}&aankomsttype=treinstation&type=vertrek&tijd=${daySelect}T${timeSelect}`;
    }
}

function getDate(extraDay, dayName) {
    const today = new Date();
    const day = today.getDate()+extraDay;
    const month = today.getMonth()+1;
    const year = today.getFullYear();

    if(dayName) {
        const date = new Date(`${year}-${month}-${day}`);
        const monthName = date.toLocaleString("nl-NL", { month: "long" });
        const weekday = date.toLocaleString("nl-NL", { weekday: "long" });
        return {year, month, day, weekday, monthName};
    }
    else {
        return `${year}-${month}-${day}`;
    }

}

function getTime() {
    const today = new Date();
    const hours = today.getHours()+1;
    const minutes = today.getMinutes();

    return `${hours}:${minutes}`;
}

function createDayOption(day, selected) {
    const option = document.createElement("option");
    option.setAttribute("value", `${day.year}-${day.month}-${day.day}`);

    const today = +getDate(0).split('-')[2];
    if(day.day == today+1) {
        option.textContent = "Morgen";
    }
    else if(day.day == today+2) {
        option.textContent = "Overmorgen";
    }
    else {
        option.textContent = `${day.weekday} ${day.day} ${day.monthName}`;
    }

    if(selected) {
        option.setAttribute("selected", "");
    }
    
    return option;
}