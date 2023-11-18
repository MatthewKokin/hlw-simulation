import {createPowerPlants, setOperationalDays, updateDashboard, interimStorageCost} from './utils.js'
import { setupChart, updateChart } from './graph.js';

const dateEl = document.getElementById("date-el")
const dateBtn = document.getElementById("increment-btn")
const wasteEl = document.getElementById("waste-value")
const totalWasteEl = document.getElementById("total-waste-value")
const uraniumMassEl = document.getElementById("uranium-mass-used")
const energyEl = document.getElementById("energy-generated")
const BWREl = document.getElementById("BWR-containers")
const PWREl = document.getElementById("PWR-containers")
const interimEl = document.getElementById("interim")



let powerPlants = createPowerPlants()
let zeroArray = new Array(powerPlants.length).fill(0);
let intermimTotalCost = 41.75

let count = 2023;

function increment() {
    count += 1;
    const days = 365;
    dateEl.textContent = "November " + count;
    let wasteVolumeAllTimeTotal, wasteVolumesThisYear, totalUraniumUsedThisYear, totalElectricityThisYear, BWRwaste, PWRwaste
    [wasteVolumeAllTimeTotal, wasteVolumesThisYear, totalUraniumUsedThisYear, totalElectricityThisYear, BWRwaste, PWRwaste] = setOperationalDays(powerPlants, days)

    const BWRcontainers = BWRwaste / 1.703
    const PWRcontainers = PWRwaste / 0.981

    wasteEl.innerHTML = "New waste generated: " + wasteVolumeAllTimeTotal.toFixed(0) + " m<sup>3</sup>"
    const allTimeWaste = wasteVolumeAllTimeTotal + 1670
    intermimTotalCost = interimStorageCost(intermimTotalCost, allTimeWaste)
    totalWasteEl.innerHTML = "Total waste: " + allTimeWaste.toFixed(0) + " m<sup>3</sup>"
    uraniumMassEl.innerHTML = "Uranium: " + totalUraniumUsedThisYear.toFixed(0) + " tonne / year"
    energyEl.innerHTML = "Energy: " + totalElectricityThisYear.toFixed(2) + " GW / year"
    BWREl.innerHTML = "BWR: " + BWRcontainers.toFixed(0) + " containers"
    PWREl.innerHTML = "PWR: " + PWRcontainers.toFixed(0) + " containers"
    interimEl.innerHTML = "Interim Storage: £" + intermimTotalCost.toFixed(0) + " mill spent"

    updateChart(count, wasteVolumeAllTimeTotal, totalUraniumUsedThisYear, totalElectricityThisYear)
    updateDashboard(powerPlants, wasteVolumesThisYear);
}
dateBtn.addEventListener('click', increment)

setupChart()
updateDashboard(powerPlants, zeroArray)

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
        build in progress ✅
    
    Dashboard
        Dshboard with Live reactors ✅
        Total uranium required ✅
        Total HLW ✅
        Interim storage total costs

Gov Goal:24 GW
Wikipedia: 470 MWe units will cost around £1.8 billion once in full production
(https://en.wikipedia.org/wiki/Rolls-Royce_SMR)
*/
