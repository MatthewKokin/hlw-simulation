export let chart = null;
export let yearsData = [2023];
export let wasteData = [0];

export function setupChart() {
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

export function updateChart(year, waste) {
    yearsData.push("November " + year);
    wasteData.push(waste);
    chart.update();
}
