import PowerPlant from './PowerPlant.js';
import data from './reactors_data.js';

export function createPowerPlants() {
    const powerPlants = [];
    for (let i = 0; i < data.length; i++) {
        powerPlants.push(new PowerPlant(data[i].name, data[i].capacity, data[i].days_before_closing, data[i].isOperational, data[i].construction_done))
    }
    console.log(powerPlants)
    return powerPlants
}

export function setOperationalDays(plants, days) {
    let wasteVolumeThisYearTotal = 0;
    let wasteVolumesThisYear = [];

    for (let plant of plants) {
        let [wasteVolumeThisYearForPlant, wasteVolumeTotalForPlant] = plant.operate(days);
        wasteVolumeThisYearTotal += wasteVolumeThisYearForPlant;
        wasteVolumesThisYear.push(wasteVolumeThisYearForPlant);
    }

    return [wasteVolumeThisYearTotal, wasteVolumesThisYear];
}


function makeDashboardItem(plant) {
    const dashboardHTML = `
    <div class="item-container">
        <div class="item">
            <p class="name">${plant.name}</p>
            <p class="capacity">${plant.capacity.toFixed(2)} GW</p>
            <p class="total-waste-produced">${plant.nuclearWaste.toFixed(2)} m^3</p>
            <p class="waste-produced-this-year">${plant.generateWaste(plant.operationalDays).toFixed(2)} m^3</p>
            <p class="status">${plant.name.isOperational ? 'Operating' : 'Not Operating'}</p>
        </div>
    </div>
    `;
    return dashboardHTML;
}


function renderDashboard(dashboardHTML) {
    const dashboardEl = document.getElementById('dashboard')
    dashboardEl.innerHTML = dashboardHTML
}

export function updateDashboard(plants) {
    let dashboardHTML = '';
    for (let plant of plants) {
        dashboardHTML += makeDashboardItem(plant);
    }
    renderDashboard(dashboardHTML);
}