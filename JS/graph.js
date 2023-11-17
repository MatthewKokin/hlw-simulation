export let chart = null;
export let yearsData = [2023];
export let wasteData = [0];

export function setupChart() {
    const ctx = document.getElementById('waste-chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: yearsData, // X-axis labels
            datasets: [{
                label: 'Total Waste (m^3)',
                data: wasteData, // Y-axis data
                fill: true, // Add a hue under the line
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Semi-transparent fill color
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                pointRadius: 0 // Remove the dots on the graph
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false // Remove the grid lines
                    },
                    title: {
                        display: true,
                        text: 'HLW Volume / m³'
                    }
                },
                x: {
                    grid: {
                        display: false // Remove the grid lines
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom' // Move the legend to the bottom
                }
            }
        }
    });
}



export function updateChart(year, waste) {
    yearsData.push(year);
    wasteData.push(waste);
    chart.update();
}
