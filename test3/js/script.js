// H-key (LEFT) [72]
// L-key (RIGHT) [76]
// J-key (DOWN) [74]
// K-key (UP) [75]

const homeWorkForm = document.querySelector("form[name='homework']");
const switchButton = document.querySelector("button.switch");
const departureSelect = document.querySelector("select[name='departure']");
const arrivalSelect = document.querySelector("select[name='arrival']");

const dayInputs = document.querySelectorAll("input[name='timeframe']");

const daySelection = document.querySelector("section.dayselection");

const submitButton = document.querySelector("form[name='homework'] a:last-of-type");

const lives = document.querySelector("section.lives p:nth-of-type(2)");


if(window.location.pathname === "/test3/test1.html") {
    document.onkeydown = function keyPress(event) {
        if (event.key == "j" || event.key == "ArrowDown") {
         const focused = document.querySelector("a:focus");
         if(!focused) {
            document.querySelector("a:first-of-type").focus();
         }
         else {
            if(focused.id == "werkhuis"){
                document.querySelector("a:nth-of-type(2)").focus();
            }
            else if(focused.id == "huiswerk"){
                document.querySelector("a:nth-of-type(3)").focus();
            }
            else if(focused.id == "anders"){
                document.querySelector("a:first-of-type").focus();
            }
         }
        }
        else if(event.key == "k" || event.key == "ArrowUp") {
            const focused = document.querySelector("a:focus");
            if(!focused) {
                document.querySelector("a:first-of-type").focus();
             }
             else {
                if(focused.id == "werkhuis"){
                    document.querySelector("a:last-of-type").focus();
                }
                else if(focused.id == "huiswerk"){
                    document.querySelector("a:first-of-type").focus();
                }
                else if(focused.id == "anders"){
                    document.querySelector("a:nth-of-type(2)").focus();
                }
             }
        }
    };
    
    document.querySelector("form[name='travelbuttons']").addEventListener("submit", (event) => {
        event.preventDefault();
    });
    
    document.querySelector("a:first-of-type").href = `https://www.ns.nl/reisplanner/#/?vertrek=Amsterdam Centraal&vertrektype=treinstation&aankomst=Eindhoven Centraal&aankomsttype=treinstation&type=vertrek&tijd=${getDate(0)}T${getTime()}`;
    document.querySelector("a:nth-of-type(2)").href = `https://www.ns.nl/reisplanner/#/?vertrek=Eindhoven Centraal&vertrektype=treinstation&aankomst=Amsterdam Centraal&aankomsttype=treinstation&type=vertrek&tijd=${getDate(1)}T7:00`;    
}
else if(window.location.pathname === "/test3/test1-anders.html") {
    changeURL();

    document.onkeydown = function keyPress(event) {
        if (event.key == "j" || event.key == "ArrowDown") {
         const focused = document.querySelector(":focus");
         if(!focused) {
            document.querySelector("select:first-of-type").focus();
         }
         else {
            if(focused.id == "departure"){
                document.querySelector("input#current").focus();
            }
            else if(focused.nextElementSibling){
                focused.nextElementSibling.focus();
            }
            else if(focused.id == "current"){
                document.querySelector("a:last-of-type").focus();
            }
            else if(focused.textContent == "Plan je reis") {
                document.querySelector("select:first-of-type").focus();
            }
            else if(focused.id == "other") {
                document.querySelector("select[name='day']").focus();
            }
            else if(focused.id == "day") {
                document.querySelector("input[type='time']").focus();
            }
            else if(focused.id == "departtime") {
                document.querySelector("a:last-of-type").focus();
            }
         }
        }
        else if(event.key == "k" || event.key == "ArrowUp") {
            const focused = document.querySelector(":focus");
            if(!focused) {
                document.querySelector("a:last-of-type").focus();
             }
             else {
                 console.log(focused);
                if(focused.textContent == "Plan je reis" && !document.querySelector("input#other:checked")){
                    document.querySelector("input#current").focus();
                }
                else if(focused.id == "current"){
                    document.querySelector("select:first-of-type").focus();
                }
                else if(focused.id == "departure"){
                    document.querySelector("a:last-of-type").focus();
                }
                else if(focused.id == "other"){
                    document.querySelector("select:first-of-type").focus();
                }
                else if(focused.id == "day"){
                    document.querySelector("input#other").focus();
                }
                else if(focused.id == "departtime"){
                    document.querySelector("select#day").focus();
                }
                else if(focused.textContent == "Plan je reis" && document.querySelector("input#other:checked")) {
                    document.querySelector("input[type='time']").focus();
                }
             }
        }
        else if(event.key == "l" || event.key == "ArrowRight") {
            const focused = document.querySelector(":focus");
            if(!focused) {
                document.querySelector("select:first-of-type").focus();
             }
             else {
                if(focused.id == "departure"){
                    document.querySelector("button.switch").focus();
                }
                else if(focused.classList.contains("switch")){
                    document.querySelector("select#arrival").focus();
                }
                else if(focused.id == "arrival") {
                    document.querySelector("input#current").focus();
                }
                else if(focused.id == "current") {
                    document.querySelector("input#other").focus();
                }
                else if(focused.id == "other") {
                    document.querySelector("a:last-of-type").focus();
                }
                else if(focused.textContent == "Plan je reis") {
                    document.querySelector("select:first-of-type").focus();
                }
             }
        }
        else if(event.key == "h" || event.key == "ArrowLeft") {
            const focused = document.querySelector(":focus");
            if(!focused) {
                document.querySelector("select#arrival").focus();
             }
             else {
                if(focused.id == "arrival"){
                    document.querySelector("button.switch").focus();
                }
                else if(focused.classList.contains("switch")){
                    document.querySelector("select#departure").focus();
                }
                else if(focused.id == "current") {
                    document.querySelector("select#arrival").focus();
                }
                else if(focused.id == "other") {
                    document.querySelector("input#current").focus();
                }
                else if(focused.textContent == "Plan je reis") {
                    document.querySelector("input#other").focus();
                }
             }
        }
    };

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
        if(event.target.value === "Amsterdam Centraal" && arrivalSelect.value === "Amsterdam Centraal") {
            arrivalSelect.value = "Eindhoven Centraal";
            changeLives();
        }
        else if(event.target.value === "Eindhoven Centraal" && arrivalSelect.value === "Eindhoven Centraal") {
            arrivalSelect.value = "Amsterdam Centraal";
            changeLives();
        }
        else if(event.target.value === arrivalSelect.value) {
            arrivalSelect.value = "Eindhoven Centraal";
            changeLives();
        }

        changeURL();
    });

    arrivalSelect.addEventListener("input", (event) => {
        if(event.target.value === "Amsterdam Centraal" && departureSelect.value === "Amsterdam Centraal") {
            departureSelect.value = "Eindhoven Centraal";
            changeLives();
        }
        else if(event.target.value === "Eindhoven Centraal" && departureSelect.value === "Eindhoven Centraal") {
            departureSelect.value = "Amsterdam Centraal";
            changeLives();
        }
        else if(event.target.value === departureSelect.value) {
            departureSelect.value = "Eindhoven Centraal";
            changeLives();
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

    document.querySelector("input[type='time']").addEventListener("input", (event) => {
        changeURL();
    });

    let testing = 0;

    document.querySelector("input[type='time']").onkeydown = function test(event){
        if(isNaN(event.key)) {
            changeLives();
        }
        else if(testing == "9" && event.key == "9"){
            changeLives();
            testing = '';
        }
        else if(testing == '' && event.key == "9") {
            testing = event.key;
        }
        else {
            testing = '';
        }

    };
}

function changeLives() {
    const amount = lives.textContent.length;
    
    if(amount === 6) {
        lives.textContent = "❤️❤️";
    }
    else if(amount === 4) {
        lives.textContent = "❤️";
    }
    else if(amount === 2) {
        lives.textContent = "";
        document.querySelector("section.dead").style.height = "100%";
    }
}

function changeURL() {
    const selectedDay = document.querySelector("input[name='timeframe']:checked").value;
    if(selectedDay === "current") {
        submitButton.href = `https://www.ns.nl/reisplanner/#/?vertrek=${departureSelect.value}&vertrektype=treinstation&aankomst=${arrivalSelect.value}&aankomsttype=treinstation&type=vertrek&tijd=${getDate(0)}T${getTime()}`;
    }
    else if(selectedDay === "other") {
        const daySelect = document.querySelector("select[name='day']").value;
        const timeSelect = document.querySelector("input[type='time']").value;

        submitButton.href = `https://www.ns.nl/reisplanner/#/?vertrek=${departureSelect.value}&vertrektype=treinstation&aankomst=${arrivalSelect.value}&aankomsttype=treinstation&type=vertrek&tijd=${daySelect}T${timeSelect}`;
    }
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
