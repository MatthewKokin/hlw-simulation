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
                label: 'Total Waste (m³)',
                data: wasteData, // Y-axis data
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'HLW Volume / m³' // Label for the Y-axis
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time' 
                    }
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
