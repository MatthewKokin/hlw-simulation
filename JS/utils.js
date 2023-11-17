import PowerPlant from './PowerPlant.js';
import data from './reactors_data.js';

export function createPowerPlants() {
    const powerPlants = [];
    for (let i = 0; i < data.length; i++) {
        powerPlants.push(new PowerPlant(data[i].name, data[i].capacity, data[i].days_before_closing, data[i].isOperational, data[i].construction_done, data[i].isBuilding))
    }
    console.log(powerPlants)
    return powerPlants
}

export function setOperationalDays(plants, days) {
    let wasteVolumeAllTimeTotal = 0; // For all the factories
    let wasteVolumesThisYear = []; // For each factory

    for (let plant of plants) {
        let [wasteVolumeThisYearForPlant, wasteVolumeTotalForPlant] = plant.isOperatingOrBuilding(days)
        wasteVolumesThisYear.push(wasteVolumeThisYearForPlant)
        wasteVolumeAllTimeTotal += wasteVolumeTotalForPlant
    }

    return [wasteVolumeAllTimeTotal, wasteVolumesThisYear];
}


function makeDashboardItem(plant, wasteProducedThisYear) {
    const wasteProducedText = (typeof wasteProducedThisYear === 'number') ? wasteProducedThisYear.toFixed(2) : 'N/A';
    const status = plant.isOperational ? 'Operating' : (plant.isBuilding ? 'Is Building' : 'Not Operating');
    const plantTotalWasteVolume = plant.wasteMassToVolume(plant.nuclearWaste).toFixed(2)

    const dashboardHTML = `
        <tr class="item">
            <td class="name">${plant.name}</td>
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
    console.log("wasteVolumesThisYear " + wasteVolumesThisYear);
}

