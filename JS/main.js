import {createPowerPlants, setOperationalDays, updateDashboard} from './utils.js'
import { setupChart, updateChart } from './graph.js';

const dateEl = document.getElementById("date-el")
const dateBtn = document.getElementById("increment-btn")
const wasteEl = document.getElementById("waste-value")
let powerPlants = createPowerPlants()
let zeroArray = new Array(powerPlants.length).fill(0);

let count = 2023;

function increment() {
    count += 1;
    const days = 365;
    dateEl.textContent = "November " + count;
    let wasteVolumeAllTimeTotal, wasteVolumesThisYear
    [wasteVolumeAllTimeTotal, wasteVolumesThisYear] = setOperationalDays(powerPlants, days)
    wasteEl.innerHTML = "New waste generated: " + wasteVolumeAllTimeTotal.toFixed(0) + " m<sup>3</sup>"
    updateChart(count, wasteVolumeAllTimeTotal);
    updateDashboard(powerPlants, wasteVolumesThisYear);
}
dateBtn.addEventListener('click', increment)

setupChart()
updateDashboard(powerPlants, zeroArray)

function copperCanisterVolume(height, thickness, diameter) {
    const radiusOuter = (diameter / 2)
    const radiusInner = (diameter / 2) - thickness
    const volumeOuter = Math.PI * Math.pow(radiusOuter, 2) * height;
    const volumeInner = Math.PI * Math.pow(radiusInner, 2) * height;
    const volumeCopper = volumeOuter - volumeInner;
    return volumeCopper
}

const height = 4.835;  // in meters
const thickness = 0.1;  // in meters 
const diameter = 1.05;  // in meters

const volumeOfCopperCaniste = copperCanisterVolume(height,thickness,diameter)

console.log(volumeOfCopperCaniste);

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
