const stapdag = document.querySelector("#stapdag");
const stapdatum = document.querySelector("#stapdatum");
const staptijd = document.querySelector("#staptijdstip");

stapdag.classList.add("hide");
stapdatum.classList.add("hide");
staptijd.classList.add("hide");

const datumdropdown = document.querySelector(".datumdropdown");
const daginput = document.querySelectorAll("input[name='dag']");
const datuminput = document.querySelectorAll("input[name='datum']");


datumdropdown.addEventListener('input', () => {
    showMonth(datumdropdown.value);
    stapdag.classList.remove("hide");
});

daginput.forEach(element => {
    element.addEventListener('input', () => {
        stapdatum.classList.remove("hide");
    });
});

datuminput.forEach(element => {
    element.addEventListener('input', () => {
        staptijd.classList.remove("hide");
    });
});

function showMonth(month) {
    const monthText = document.querySelectorAll("span.maand");
    monthText.forEach(element => {
        element.textContent = month;
    });
}