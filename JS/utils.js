import PowerPlant from './PowerPlant.js';
import data from './reactors_data.js';

export function createPowerPlants() {
    const powerPlants = [];
    for (let i = 0; i < data.length; i++) {
        powerPlants.push(new PowerPlant(data[i].name, data[i].capacity, data[i].days_before_closing, data[i].isOperational, data[i].construction_done, data[i].isBuilding, data[i].type, data[i].isStartedbuilding, data[i].startedBuildingIn))
    }
    return powerPlants
}

export function setOperationalDays(plants, days) {
    let wasteVolumeAllTimeTotal = 0; // For all the factories
    let wasteVolumesThisYear = []; // For each factory
    let totalUraniumUsedThisYear = 0 // For all the factories
    let totalElectricityThisYear = 0 // For all the factories
    let BWRwaste = 0
    let PWRwaste = 0

    for (let plant of plants) {
        let [wasteVolumeThisYearForPlant, wasteVolumeTotalForPlant, uraniumUsedThisYear] = plant.isOperatingOrBuilding(days)
        wasteVolumesThisYear.push(wasteVolumeThisYearForPlant)
        wasteVolumeAllTimeTotal += wasteVolumeTotalForPlant
        totalUraniumUsedThisYear += uraniumUsedThisYear
        totalElectricityThisYear += plant.generatedElectricity

        if (plant.type === "AGR") {
            BWRwaste += wasteVolumeTotalForPlant
        } else if (plant.type === "EPR" || plant.type === "PWR") {
        PWRwaste += wasteVolumeTotalForPlant
        } else {
            throw new Error("Unhandled case")
        }
    }

    return [wasteVolumeAllTimeTotal, wasteVolumesThisYear, totalUraniumUsedThisYear, totalElectricityThisYear, BWRwaste, PWRwaste];
}


function makeDashboardItem(plant, wasteProducedThisYear) {
    const status = plant.isOperational ? 'Operating' : (plant.isBuilding ? 'Is Building' : (plant.isStartedbuilding ? 'Not Operating' : "Planned"));
    // The plants that are not operational because they are done generating electricity would have to have isStartedbuilding to be true for them to be built, where as not operational because they are not even buit yet are not started to built

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

export function interimStorageCost(intermimTotalCost, allTimeWasteThisYear) {
    // cost in £millions assuming it is 25k / year per m^3
    return intermimTotalCost + allTimeWasteThisYear * 0.025
}