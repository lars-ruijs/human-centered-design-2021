const homeWorkForm = document.querySelector("form[name='homework']");
const switchButton = document.querySelector("button.switch");
const departureSelect = document.querySelector("select[name='departure']");
const arrivalSelect = document.querySelector("select[name='arrival']");

const dayInputs = document.querySelectorAll("input[name='timeframe']");

const daySelection = document.querySelector("section.dayselection");
const whenTitle = document.querySelector("form[name='homework'] label[for='day']");

const confirmation = document.querySelector("form[name='homework'] p:last-of-type");

const submitButton = document.querySelector("form[name='homework'] a:last-of-type");

changeURL();

console.log(getTime());
document.querySelector("input[type='time']").value = getTime();

const daySelectionInputs = document.querySelector("section.dayselection section");
const daySelect = document.createElement("select");
daySelect.setAttribute("name", "day");
daySelect.setAttribute("id", "day");

daySelect.appendChild(createDayOption(getDate(0, true), true));

for(let i = 1; i < 8; i++) {
    daySelect.appendChild(createDayOption(getDate(i, true), false));
}

daySelectionInputs.appendChild(daySelect);
daySelect.addEventListener("input",() => changeURL());

daySelection.classList.toggle("hide");
whenTitle.classList.toggle("hide");

homeWorkForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

switchButton.addEventListener("click", (event) => {
    const departureStation = departureSelect.value;
    const arrivalStation = arrivalSelect.value;

    departureSelect.value = arrivalStation;
    arrivalSelect.value = departureStation;

    if(departureSelect.value === "Amsterdam Centraal" && arrivalSelect.value === "Eindhoven Centraal") {
        document.querySelector("input#nextday").removeAttribute("checked");
        document.querySelector("input#other").removeAttribute("checked");
        document.querySelector("input#current").setAttribute("checked", "");
    }
    else if(departureSelect.value === "Eindhoven Centraal" && arrivalSelect.value === "Amsterdam Centraal") {
        document.querySelector("input#current").removeAttribute("checked");
        document.querySelector("input#other").removeAttribute("checked");
        document.querySelector("input#nextday").setAttribute("checked", "");
    }

    changeURL();
});

departureSelect.addEventListener("input", (event) => {
    daySelection.classList.add("hide");
    whenTitle.classList.add("hide");

    if(event.target.value === "Amsterdam Centraal" && arrivalSelect.value === "Amsterdam Centraal") {
        arrivalSelect.value = "Eindhoven Centraal";
        document.querySelector("input#nextday").removeAttribute("checked");
        document.querySelector("input#other").removeAttribute("checked");
        document.querySelector("input#current").setAttribute("checked", "");
    }
    else if(event.target.value === "Eindhoven Centraal" && arrivalSelect.value === "Eindhoven Centraal") {
        arrivalSelect.value = "Amsterdam Centraal";
        document.querySelector("input#current").removeAttribute("checked");
        document.querySelector("input#other").removeAttribute("checked");
        document.querySelector("input#nextday").setAttribute("checked", "");
    }
    else if(event.target.value === arrivalSelect.value) {
        arrivalSelect.value = "Eindhoven Centraal";
        if(event.target.value === "Amsterdam Centraal") {
            document.querySelector("input#nextday").removeAttribute("checked");
            document.querySelector("input#other").removeAttribute("checked");
            document.querySelector("input#current").setAttribute("checked", "");
        }
        else {
            document.querySelector("input#current").removeAttribute("checked");
            document.querySelector("input#nextday").removeAttribute("checked");
            document.querySelector("input#other").setAttribute("checked", "");
            daySelection.classList.remove("hide");
            whenTitle.classList.remove("hide");
        }
    }
    else if(event.target.value === "Amsterdam Centraal" && arrivalSelect.value === "Eindhoven Centraal") {
        document.querySelector("input#nextday").removeAttribute("checked");
        document.querySelector("input#other").removeAttribute("checked");
        document.querySelector("input#current").setAttribute("checked", "");
    }
    else if(event.target.value === "Eindhoven Centraal" && arrivalSelect.value === "Amsterdam Centraal") {
        document.querySelector("input#current").removeAttribute("checked");
        document.querySelector("input#other").removeAttribute("checked");
        document.querySelector("input#nextday").setAttribute("checked", "");
    }
    else if(event.target.value === "Eindhoven Centraal" && arrivalSelect.value != "Amsterdam Centraal" || event.target.value === "Amsterdam Centraal" && arrivalSelect.value != "Eindhoven Centraal" || event.target.value != "Eindhoven Centraal" && event.target.value != "Amsterdam Centraal") {
        document.querySelector("input#current").removeAttribute("checked");
        document.querySelector("input#nextday").removeAttribute("checked");
        document.querySelector("input#other").setAttribute("checked", "");
        daySelection.classList.remove("hide");
        whenTitle.classList.remove("hide");
    }
    changeURL();
});

arrivalSelect.addEventListener("input", (event) => {
    daySelection.classList.add("hide");
    whenTitle.classList.add("hide");

    if(event.target.value === "Amsterdam Centraal" && departureSelect.value === "Amsterdam Centraal") {
        departureSelect.value = "Eindhoven Centraal";
        document.querySelector("input#current").removeAttribute("checked");
        document.querySelector("input#other").removeAttribute("checked");
        document.querySelector("input#nextday").setAttribute("checked", "");
    }
    else if(event.target.value === "Eindhoven Centraal" && departureSelect.value === "Eindhoven Centraal") {
        departureSelect.value = "Amsterdam Centraal";
        document.querySelector("input#nextday").removeAttribute("checked");
        document.querySelector("input#other").removeAttribute("checked");
        document.querySelector("input#current").setAttribute("checked", "");
    }
    else if(event.target.value === departureSelect.value) {
        departureSelect.value = "Eindhoven Centraal";
        if(event.target.value === "Amsterdam Centraal") {
            document.querySelector("input#current").removeAttribute("checked");
            document.querySelector("input#other").removeAttribute("checked");
            document.querySelector("input#nextday").setAttribute("checked", "");
        }
        else {
            document.querySelector("input#current").removeAttribute("checked");
            document.querySelector("input#nextday").removeAttribute("checked");
            document.querySelector("input#other").setAttribute("checked", "");
            daySelection.classList.remove("hide");
            whenTitle.classList.remove("hide");
        }
    }
    else if(event.target.value === "Amsterdam Centraal" && departureSelect.value === "Eindhoven Centraal") {
        document.querySelector("input#current").removeAttribute("checked");
        document.querySelector("input#other").removeAttribute("checked");
        document.querySelector("input#nextday").setAttribute("checked", "");
    }
    else if(event.target.value === "Eindhoven Centraal" && departureSelect.value === "Amsterdam Centraal") {
        document.querySelector("input#nextday").removeAttribute("checked");
        document.querySelector("input#other").removeAttribute("checked");
        document.querySelector("input#current").setAttribute("checked", "");
    }
    else if(event.target.value === "Eindhoven Centraal" && departureSelect.value != "Amsterdam Centraal" || event.target.value === "Amsterdam Centraal" && departureSelect.value != "Eindhoven Centraal" || event.target.value != "Eindhoven Centraal" && event.target.value != "Amsterdam Centraal") {
        document.querySelector("input#current").removeAttribute("checked");
        document.querySelector("input#nextday").removeAttribute("checked");
        document.querySelector("input#other").setAttribute("checked", "");
        daySelection.classList.remove("hide");
        whenTitle.classList.remove("hide");
    }
    changeURL();
});

dayInputs.forEach(input => {
    input.addEventListener("change", (event) => {
        changeURL();
    });
});

document.querySelector("input[type='time']").addEventListener("input", () => changeURL());

function changeURL() {
    const selectedDay = document.querySelector("input[name='timeframe']:checked").value;
    if(selectedDay === "current") {
        submitButton.href = `https://www.ns.nl/reisplanner/#/?vertrek=${departureSelect.value}&vertrektype=treinstation&aankomst=${arrivalSelect.value}&aankomsttype=treinstation&type=vertrek&tijd=${getDate(0)}T${getTime()}`;
        confirmation.textContent = `van ${departureSelect.value} naar ${arrivalSelect.value}, zo snel mogelijk`;
    }
    else if(selectedDay === "nextday") {
        submitButton.href = `https://www.ns.nl/reisplanner/#/?vertrek=${departureSelect.value}&vertrektype=treinstation&aankomst=${arrivalSelect.value}&aankomsttype=treinstation&type=vertrek&tijd=${getDate(1)}T07:00`;
        confirmation.textContent = `van ${departureSelect.value} naar ${arrivalSelect.value}, morgenochtend`;
    }
    else if(selectedDay === "other") {
        const daySelect = document.querySelector("select[name='day']").value;
        const timeSelect = document.querySelector("input[type='time']").value;

        submitButton.href = `https://www.ns.nl/reisplanner/#/?vertrek=${departureSelect.value}&vertrektype=treinstation&aankomst=${arrivalSelect.value}&aankomsttype=treinstation&type=vertrek&tijd=${daySelect}T${timeSelect}`;
        confirmation.textContent = `van ${departureSelect.value} naar ${arrivalSelect.value}, ${daySelect} om ${timeSelect} uur`;
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

    console.log(hours.toString().length);
    console.log(minutes.toString().length);

    if(hours.toString().length != 2 && minutes.toString().length != 2) {
        return `${"0"+hours}:${"0"+minutes}`;
    }
    else if(hours.toString().length != 2) {
        return `${"0"+hours}:${minutes}`;
    }
    else if(minutes.toString().length != 2) {
        return `${hours}:${"0"+minutes}`;
    }
    else {
        return `${hours}:${minutes}`;
    }
}

function createDayOption(day, selected) {
    const option = document.createElement("option");
    option.setAttribute("value", `${day.year}-${day.month}-${day.day}`);

    const today = +getDate(0).split('-')[2];
    if(day.day == today) {
        option.textContent = "Vandaag";
    }
    else if(day.day == today+1) {
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