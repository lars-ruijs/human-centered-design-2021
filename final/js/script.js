const homeWorkForm = document.querySelector("form[name='homework']");
const switchButton = document.querySelector("button.switch");
const departureSelect = document.querySelector("select[name='departure']");
const arrivalSelect = document.querySelector("select[name='arrival']");
const daySelect = document.querySelector("select#dayselection");
const timeInput = document.querySelector("input[type='time']");

const confirmation = document.querySelector("form[name='homework'] p:last-of-type");

const submitButton = document.querySelector("form[name='homework'] a:last-of-type"); 

if(window.location.pathname === "/final/" || window.location.pathname === "/final/index.html") {
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
    document.querySelector("a:nth-of-type(2)").href = `https://www.ns.nl/reisplanner/#/?vertrek=Eindhoven Centraal&vertrektype=treinstation&aankomst=Amsterdam Centraal&aankomsttype=treinstation&type=vertrek&tijd=${getDate(1)}T9:00`;    
}

else if(window.location.pathname === "/final/avontuur.html") {
    // Set current time (+1 hour)
    timeInput.value = getTime();

    // Create date dropdown for today and next 7 days
    daySelect.appendChild(createDayOption(getDate(0, true), true));
    for(let i = 1; i < 8; i++) {
        daySelect.appendChild(createDayOption(getDate(i, true), false));
    }

    changeURL();

    daySelect.addEventListener("input",() => changeURL());
    timeInput.addEventListener("input", () => changeURL());
    homeWorkForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    let testing = 0;

    timeInput.onkeydown = function test(event){
        if(isNaN(event.key) && event.key != "k" && event.key != "j") {
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


    switchButton.addEventListener("click", () => {
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

    document.onkeydown = function keyPress(event) {
        if (event.key == "j" || event.key == "ArrowDown") {
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
            else if(focused.id == "arrival"){
                document.querySelector("select#dayselection").focus();
            }
            else if(focused.id == "dayselection") {
                document.querySelector("input[type='time']").focus();
            }
            else if(focused.id == "departtime") {
                document.querySelector("a:last-of-type").focus();
            }
            else if(focused.textContent == "Plan je reis") {
                document.querySelector("select:first-of-type").focus();
            }
         }
        }
        else if(event.key == "k" || event.key == "ArrowUp") {
            const focused = document.querySelector(":focus");
            if(!focused) {
                document.querySelector("a:last-of-type").focus();
             }
             else {
                if(focused.textContent == "Plan je reis"){
                    document.querySelector("input[type='time']").focus();
                }
                else if(focused.id == "departtime"){
                    document.querySelector("select#dayselection").focus();
                }
                else if(focused.id == "dayselection"){
                    document.querySelector("select#arrival").focus();
                }
                else if(focused.id == "arrival"){
                    document.querySelector("button.switch").focus();
                }
                else if(focused.classList.contains("switch")){
                    document.querySelector("select:first-of-type").focus();
                }
                else if(focused.id == "departure"){
                    document.querySelector("a:last-of-type").focus();
                }
             }
        }
    };

}


function changeURL() {
    submitButton.href = `https://www.ns.nl/reisplanner/#/?vertrek=${departureSelect.value}&vertrektype=treinstation&aankomst=${arrivalSelect.value}&aankomsttype=treinstation&type=vertrek&tijd=${daySelect.value}T${timeInput.value}`;
    confirmation.textContent = `van ${departureSelect.options[departureSelect.selectedIndex].text} naar ${arrivalSelect.options[arrivalSelect.selectedIndex].text}, ${daySelect.options[daySelect.selectedIndex].text} om ${timeInput.value} uur`;
}


function changeLives() {    
    const lives = document.querySelectorAll("section.hearts ul li");
    if(lives.length === 1) {
        document.querySelector("section.dead").style.height = "100%";
        const audio = new Audio('/final/sound/Explosion+7.mp3');
        audio.play();
        setTimeout(() => {  
            document.querySelector("section.dead img").remove();       
            location.reload();
        }, 2500);
    }
    else {
        lives[lives.length-1].style.transform = "scale(0.001)";
        setTimeout(() => {  lives[lives.length-1].remove(); }, 900);
    }
}

function getDate(extraDay, dayName) {
    const today = new Date();
    const newDate = addDaysToDate(today, +extraDay);
    const day = newDate.getDate();
    const month = newDate.getMonth()+1;
    const year = newDate.getFullYear();

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

function addDaysToDate(date, days){
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
}

function getTime() {
    const today = new Date();
    const hours = today.getHours()+1;
    const minutes = today.getMinutes();

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