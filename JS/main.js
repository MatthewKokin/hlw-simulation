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


/*
Bugfix
    Hikley Point C and Sizewell C will be operational till like 2100, but waste is stopped generating after 2034 (+ its kinda too much?)

Features
    New Objects
        Recycling fascility
        Power plant
        SMR
    
    Power Plant features
        decomissioning
        build in progress
    
    Dashboard
        Dshboard with Live reactors
        Total uranium required
        Total HLW
        Interim storage total costs
*/
