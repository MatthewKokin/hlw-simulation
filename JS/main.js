import PowerPlant from './PowerPlant.js';
import data from './reactors_data.js';

let dateEl = document.getElementById("date-el")
let count = 2023;

function increment() {
    count += 1;
    dateEl.textContent = "November " + count;
}

function createPowerPlants() {
    for (let plant of data) {
        plant.name = new PowerPlant(plant.name, plant.capacity, plant.closing_date);
    }
}

function setOperationalDays(days) {
    for (let plant of data) {
        plant.name.operate(days);
    }
}

function seeStatus() {
    let totalWaste = 0;
    let totalElectricity = 0;
    let header = 'Power Plant           Capacity (GW)    Operational Days         Nuclear Waste (tons)      Expected closure (days)    Elec generated (GW)';
    console.log(header);
    console.log('-'.repeat(header.length));

    for (let plant of data) {
        let powerPlant = plant.name;
        console.log(`${powerPlant.name.padEnd(20)} ${powerPlant.capacity.toString().padEnd(15)} ${powerPlant.operationalDays.toString().padEnd(25)} ${powerPlant.nuclearWaste.toString().padEnd(25)} ${powerPlant.daysBeforeClosing.toString().padEnd(25)} ${powerPlant.generatedElectricity}`);
        totalWaste += powerPlant.nuclearWaste;
        totalElectricity += powerPlant.generatedElectricity;
    }

    console.log('-'.repeat(header.length));
    console.log("Total Nuclear Waste Generated: ", totalWaste, "metric tons");
    console.log("Total Electricity Generated: ", totalElectricity, "GW");
    console.log('-'.repeat(header.length));
}

createPowerPlants();
setOperationalDays(2000);
seeStatus();
