/* ============================================
   UTILITIES & ENERGY PAGE - JAVASCRIPT
   Add this to your page or create utilities.js
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initUtilityCharts();
    initUtilityMap();
    animateUtilityCounters();
    initAlertSettings();
    startRealTimeUpdates();
});

/* ============================================
   CHARTS INITIALIZATION
   ============================================ */
let powerChart, waterSourceChart, waterDistChart, consumptionChart;

function initUtilityCharts() {
    // Power Distribution Chart
    const powerCtx = document.getElementById('powerDistributionChart').getContext('2d');
    powerChart = new Chart(powerCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
            datasets: [{
                label: 'North Grid',
                data: [320, 280, 380, 520, 480, 500, 580, 520, 420],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'South Grid',
                data: [280, 250, 340, 460, 420, 440, 520, 460, 380],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'East Grid',
                data: [240, 220, 300, 420, 380, 400, 470, 420, 340],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'West Grid',
                data: [220, 200, 280, 380, 340, 360, 420, 380, 300],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + ' MW';
                        }
                    }
                }
            }
        }
    });
    
    // Water Source Chart (Doughnut)
    const waterSourceCtx = document.getElementById('waterSourceChart').getContext('2d');
    waterSourceChart = new Chart(waterSourceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Reservoir A', 'Reservoir B', 'Ground Water', 'Recycled'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: ['#2563eb', '#06b6d4', '#10b981', '#f59e0b'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Water Distribution Chart (Bar)
    const waterDistCtx = document.getElementById('waterDistributionChart').getContext('2d');
    waterDistChart = new Chart(waterDistCtx, {
        type: 'bar',
        data: {
            labels: ['District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6'],
            datasets: [{
                label: 'Water Supply (ML/day)',
                data: [180, 165, 145, 120, 155, 127],
                backgroundColor: 'rgba(37, 99, 235, 0.8)',
                borderRadius: 8,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + ' ML';
                        }
                    }
                }
            }
        }
    });
    
    // Energy Consumption Chart
    const consumptionCtx = document.getElementById('consumptionChart').getContext('2d');
    consumptionChart = new Chart(consumptionCtx, {
        type: 'bar',
        data: {
            labels: ['Residential', 'Commercial', 'Industrial', 'Public', 'Transport', 'Agriculture'],
            datasets: [{
                label: 'Energy Consumption (MW)',
                data: [420, 380, 340, 280, 160, 120],
                backgroundColor: [
                    'rgba(37, 99, 235, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(6, 182, 212, 0.8)',
                    'rgba(124, 58, 237, 0.8)'
                ],
                borderRadius: 8,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + ' MW';
                        }
                    }
                }
            }
        }
    });
}

/* ============================================
   CHART UPDATE FUNCTIONS
   ============================================ */

// Update power view
function updatePowerView(view) {
    const datasets = {
        realtime: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
            north: [320, 280, 380, 520, 480, 500, 580, 520, 420],
            south: [280, 250, 340, 460, 420, 440, 520, 460, 380],
            east: [240, 220, 300, 420, 380, 400, 470, 420, 340],
            west: [220, 200, 280, 380, 340, 360, 420, 380, 300]
        },
        hourly: {
            labels: ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h'],
            north: [450, 460, 470, 485, 490, 500, 510, 520, 515, 505, 495, 480],
            south: [410, 415, 420, 430, 435, 440, 450, 460, 455, 445, 435, 420],
            east: [370, 375, 380, 390, 395, 400, 410, 420, 415, 405, 395, 380],
            west: [330, 335, 340, 350, 355, 360, 370, 380, 375, 365, 355, 340]
        },
        daily: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            north: [480, 490, 495, 500, 510, 485, 470],
            south: [420, 425, 430, 440, 450, 435, 415],
            east: [380, 385, 390, 400, 410, 395, 375],
            west: [340, 345, 350, 360, 370, 355, 335]
        }
    };
    
    const data = datasets[view];
    powerChart.data.labels = data.labels;
    powerChart.data.datasets[0].data = data.north;
    powerChart.data.datasets[1].data = data.south;
    powerChart.data.datasets[2].data = data.east;
    powerChart.data.datasets[3].data = data.west;
    powerChart.update();
}

// Switch consumption tab
function switchConsumptionTab(tab) {
    // Update active state
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (tab === 'time') {
        consumptionChart.data.labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
        consumptionChart.data.datasets[0].data = [800, 650, 950, 1200, 1400, 1500, 1100];
        consumptionChart.data.datasets[0].label = 'Energy Consumption Over Time (MW)';
    } else {
        consumptionChart.data.labels = ['Residential', 'Commercial', 'Industrial', 'Public', 'Transport', 'Agriculture'];
        consumptionChart.data.datasets[0].data = [420, 380, 340, 280, 160, 120];
        consumptionChart.data.datasets[0].label = 'Energy Consumption by Sector (MW)';
    }
    consumptionChart.update();
}

/* ============================================
   MAP INITIALIZATION
   ============================================ */
let utilityMap;

function initUtilityMap() {
    utilityMap = L.map('utilityMap').setView([40.7128, -74.0060], 11);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(utilityMap);
    
    // Add utility markers
    const utilities = [
        { lat: 40.7580, lng: -73.9855, type: 'power', name: 'North Power Station', status: 'online' },
        { lat: 40.7489, lng: -73.9680, type: 'water', name: 'Central Water Plant', status: 'online' },
        { lat: 40.7306, lng: -73.9352, type: 'power', name: 'East Substation', status: 'warning' },
        { lat: 40.6782, lng: -73.9442, type: 'water', name: 'South Reservoir', status: 'online' },
        { lat: 40.7120, lng: -74.0060, type: 'power', name: 'Central Grid Hub', status: 'maintenance' }
    ];
    
    utilities.forEach(utility => {
        const colors = {
            power: '#f59e0b',
            water: '#2563eb'
        };
        
        const statusColors = {
            online: '#10b981',
            warning: '#f59e0b',
            maintenance: '#ef4444'
        };
        
        const marker = L.circleMarker([utility.lat, utility.lng], {
            radius: 10,
            fillColor: colors[utility.type],
            color: statusColors[utility.status],
            weight: 3,
            opacity: 1,
            fillOpacity: 0.7
        }).addTo(utilityMap);
        
        marker.bindPopup(`
            <div style="min-width: 180px;">
                <strong>${utility.name}</strong><br>
                <span style="color: ${colors[utility.type]};">
                    ${utility.type === 'power' ? '⚡ Power Station' : '💧 Water Plant'}
                </span><br>
                <span style="color: ${statusColors[utility.status]}; font-weight: 600;">
                    Status: ${utility.status.toUpperCase()}
                </span>
            </div>
        `);
    });
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function animateUtilityCounters() {
    animateCounter('powerConsumption', 0, 1245, 2000);
    animateCounter('waterSupply', 0, 892, 2000);
}

function animateCounter(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

/* ============================================
   ALERT SETTINGS
   ============================================ */
function initAlertSettings() {
    const powerThreshold = document.getElementById('powerThreshold');
    const waterThreshold = document.getElementById('waterThreshold');
    
    if (powerThreshold) {
        powerThreshold.addEventListener('input', function() {
            document.getElementById('powerThresholdValue').textContent = this.value + '%';
        });
    }
    
    if (waterThreshold) {
        waterThreshold.addEventListener('input', function() {
            document.getElementById('waterThresholdValue').textContent = this.value;
        });
    }
}

function saveAlertSettings() {
    const powerThreshold = document.getElementById('powerThreshold').value;
    const waterThreshold = document.getElementById('waterThreshold').value;
    const emailNotif = document.getElementById('emailNotif').checked;
    const smsNotif = document.getElementById('smsNotif').checked;
    
    showNotification('Alert settings saved successfully!', 'success');
    bootstrap.Modal.getInstance(document.getElementById('alertSettingsModal')).hide();
    
    // Save settings logic here
    console.log('Settings:', { powerThreshold, waterThreshold, emailNotif, smsNotif });
}

/* ============================================
   FILTER & VIEW FUNCTIONS
   ============================================ */

// Filter monitoring stations
function filterStations(type) {
    const rows = document.querySelectorAll('#stationsTableBody tr');
    
    rows.forEach(row => {
        if (type === 'all') {
            row.style.display = '';
        } else {
            if (row.classList.contains(`station-${type}`)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
    
    showNotification(`Filtered by: ${type}`, 'info');
}

// View station details
function viewStation(id) {
    showNotification(`Viewing station: ${id}`, 'info');
    // Add logic to show station detail modal or navigate
}

// View alert details
function viewAlert(id) {
    showNotification(`Viewing alert #${id}`, 'info');
    // Add logic to show alert detail modal
}

// Export utility report
function exportUtilityReport() {
    showNotification('Generating utility report...', 'info');
    
    setTimeout(() => {
        showNotification('Report exported successfully!', 'success');
        // Add actual export logic here
    }, 1500);
}

/* ============================================
   REAL-TIME UPDATES
   ============================================ */
function startRealTimeUpdates() {
    // Update power consumption every 5 seconds
    setInterval(() => {
        const powerElement = document.getElementById('powerConsumption');
        if (powerElement) {
            const current = parseInt(powerElement.textContent.replace(/,/g, ''));
            const change = Math.floor(Math.random() * 40) - 20; // -20 to +20 MW
            const newValue = Math.max(1000, Math.min(1500, current + change));
            powerElement.textContent = newValue.toLocaleString();
        }
        
        const waterElement = document.getElementById('waterSupply');
        if (waterElement) {
            const current = parseInt(waterElement.textContent.replace(/,/g, ''));
            const change = Math.floor(Math.random() * 20) - 10; // -10 to +10 ML
            const newValue = Math.max(800, Math.min(1000, current + change));
            waterElement.textContent = newValue.toLocaleString();
        }
    }, 5000);
    
    // Animate meter bars
    setInterval(() => {
        document.querySelectorAll('.meter-fill').forEach(meter => {
            if (!meter.classList.contains('warning')) {
                const currentWidth = parseInt(meter.style.width);
                const change = Math.floor(Math.random() * 6) - 3; // -3 to +3%
                const newWidth = Math.max(40, Math.min(85, currentWidth + change));
                meter.style.width = newWidth + '%';
                meter.closest('.zone-meter').querySelector('.meter-value').textContent = newWidth + '%';
            }
        });
    }, 8000);
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Show notification
function showNotification(message, type = 'info') {
    const toastContainer = getOrCreateToastContainer();
    
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    
    toastEl.addEventListener('hidden.bs.toast', function() {
        toastEl.remove();
    });
}

// Get or create toast container
function getOrCreateToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
    return container;
}

// Console log
console.log('%c⚡💧 Utilities & Energy Module Loaded', 'font-size: 14px; font-weight: bold; color: #2563eb;');