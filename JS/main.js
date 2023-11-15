let dateEl = document.getElementById("date-el")
let count = 2023;

function increment() {
    count += 1;
    dateEl.textContent = "November " + count;
}

