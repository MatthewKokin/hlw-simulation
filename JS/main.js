import {createPowerPlants, setOperationalDays} from './utils.js'
import { setupChart, updateChart } from './graph.js';

const dateEl = document.getElementById("date-el")
const dateBtn = document.getElementById("increment-btn")
const wasteEl = document.getElementById("waste-value")

let count = 2023;
let days = 0;
let wasteVolume = 0

function increment() {
    count += 1;
    days += 365;
    dateEl.textContent = "November " + count;
    wasteVolume += setOperationalDays(days)
    wasteEl.textContent = "New waste generated / m^3: " + wasteVolume
    updateChart(count, wasteVolume);
}
dateBtn.addEventListener('click', increment)

createPowerPlants();
setupChart();
