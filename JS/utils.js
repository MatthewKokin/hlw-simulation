import PowerPlant from './PowerPlant.js';
import data from './reactors_data.js';

export function createPowerPlants() {
    for (let plant of data) {
        plant.plantObj = new PowerPlant(plant.name, plant.capacity, plant.days_before_closing, plant.isOperational, plant.construction_done);
    }
}

export function setOperationalDays(days) {
    let wasteVolume = 0
    for (let plant of data) {
        wasteVolume += plant.plantObj.operate(days);
    }
    return wasteVolume
}

function makeDashboardItem(plant) {
    const dashboardHTML = `
    <div class="item">
        <p class="name">${plant.name}</p>
        <p class="capacity">${plant.capacity.toFixed(2)} GW</p>
        <p class="total-waste-produced">${plant.plantObj.nuclearWaste.toFixed(2)} m^3</p>
        <p class="waste-produced-this-year">${plant.plantObj.generateWaste(plant.operationalDays).toFixed(2)} m^3</p>
        <p class="status">${plant.plantObj.isOperational ? 'Operating' : 'Not Operating'}</p>
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