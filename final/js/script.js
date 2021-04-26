console.log(window.location.pathname);
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