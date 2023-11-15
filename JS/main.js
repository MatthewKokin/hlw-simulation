import {createPowerPlants, setOperationalDays} from './utils.js'

const dateEl = document.getElementById("date-el")
const dateBtn = document.getElementById("increment-btn")
const wasteEl = document.getElementById("waste-value")

let count = 2023;
let days = 0;
let wasteVolume = 0

function increment() {
    count += 1;
    days += 365;
    dateEl.textContent = "November " + count;
    wasteVolume += setOperationalDays(days)
    wasteEl.textContent = "New waste generated / m^3: " + wasteVolume
    updateChart(count, wasteVolume);
}
dateBtn.addEventListener('click', increment)

createPowerPlants();




let chart = null;
let yearsData = [2023];
let wasteData = [0];

function setupChart() {
    const ctx = document.getElementById('wasteChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: yearsData, // X-axis labels
            datasets: [{
                label: 'Total Waste (m^3)',
                data: wasteData, // Y-axis data
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateChart(year, waste) {
    yearsData.push("November " + year);
    wasteData.push(waste);
    chart.update();
}

// Initialize the chart
setupChart();
