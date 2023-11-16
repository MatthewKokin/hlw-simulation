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
    let wasteVolume = 0
    for (let plant of plants) {
        wasteVolume += plant.operate(days);
    }
    return wasteVolume
}

function makeDashboardItem(plant) {
    const dashboardHTML = `
    <div class="item-container">
        <div class="item">
            <p class="name">${plant.name}</p>
            <p class="capacity">${plant.capacity.toFixed(2)} GW</p>
            <p class="total-waste-produced">${plant.name.nuclearWaste.toFixed(2)} m^3</p>
            <p class="waste-produced-this-year">${plant.name.generateWaste(plant.operationalDays).toFixed(2)} m^3</p>
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

export function updateDashboard() {
    let dashboardHTML = '';
    for (let plant of data) {
        dashboardHTML += makeDashboardItem(plant);
    }
    renderDashboard(dashboardHTML);
}