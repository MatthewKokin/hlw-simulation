import PowerPlant from './PowerPlant.js';
import data from './reactors_data.js';

export function createPowerPlants() {
    const powerPlants = [];
    for (let i = 0; i < data.length; i++) {
        powerPlants.push(new PowerPlant(data[i].name, data[i].capacity, data[i].days_before_closing, data[i].isOperational, data[i].construction_done, data[i].isBuilding, data[i].type))
    }
    return powerPlants
}

export function setOperationalDays(plants, days) {
    let wasteVolumeAllTimeTotal = 0; // For all the factories
    let wasteVolumesThisYear = []; // For each factory
    let totalUraniumUsedThisYear = 0 // For all the factories

    for (let plant of plants) {
        let [wasteVolumeThisYearForPlant, wasteVolumeTotalForPlant, uraniumUsedThisYear] = plant.isOperatingOrBuilding(days)
        wasteVolumesThisYear.push(wasteVolumeThisYearForPlant)
        wasteVolumeAllTimeTotal += wasteVolumeTotalForPlant
        totalUraniumUsedThisYear += uraniumUsedThisYear
    }

    return [wasteVolumeAllTimeTotal, wasteVolumesThisYear, totalUraniumUsedThisYear];
}


function makeDashboardItem(plant, wasteProducedThisYear) {
    const status = plant.isOperational ? 'Operating' : (plant.isBuilding ? 'Is Building' : 'Not Operating');
    const plantTotalWasteVolume = plant.wasteMassToVolume(plant.nuclearWaste).toFixed(2)
    const plantName = plant.name.replace(/_/g, ' ');
    const wasteProducedText = (typeof wasteProducedThisYear === 'number') ? wasteProducedThisYear.toFixed(2) : 'N/A';

    const dashboardHTML = `
        <tr class="item">
            <td class="name">${plantName}</td>
            <td class="capacity">${plant.capacity.toFixed(2)}</td>
            <td class="total-waste-produced">${plantTotalWasteVolume}</td>
            <td class="waste-produced-this-year">${wasteProducedText}</td>
            <td class="status">${status}</td>
        </tr>
    `;
    return dashboardHTML;
}

export function updateDashboard(plants, wasteVolumesThisYear) {
    let dashboardHTML = ``
    plants.forEach((plant, index) => {
        dashboardHTML += makeDashboardItem(plant, wasteVolumesThisYear[index]);
    });
    const dashboardEl = document.getElementById('dashboard-items');
    dashboardEl.innerHTML = dashboardHTML;
}

