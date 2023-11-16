import {createPowerPlants, setOperationalDays, updateDashboard} from './utils.js'
import { setupChart, updateChart } from './graph.js';

const dateEl = document.getElementById("date-el")
const dateBtn = document.getElementById("increment-btn")
const wasteEl = document.getElementById("waste-value")
let powerPlants = createPowerPlants()

let count = 2023;
let days = 0;
let wasteVolume = 0

function increment() {
    count += 1;
    days += 365;
    dateEl.textContent = "November " + count;
    wasteVolume += setOperationalDays(powerPlants, days)
    wasteEl.textContent = "New waste generated / m^3: " + wasteVolume
    updateChart(count, wasteVolume);
    // updateDashboard();
}
dateBtn.addEventListener('click', increment)

console.log("Hi");
setupChart();
// updateDashboard();


/*
Priority:
1. Interim storage cost
2. Model to get a compostion of HLW

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
