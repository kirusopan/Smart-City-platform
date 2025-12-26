/* ============================================
   TRAFFIC & TRANSPORTATION PAGE - JAVASCRIPT
   Add this to your page or create traffic.js
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTrafficMap();
    initTrafficCharts();
    animateCounters();
});

/* ============================================
   TRAFFIC MAP INITIALIZATION
   ============================================ */
let trafficMap;
let trafficLayer = false;

function initTrafficMap() {
    // Initialize map
    trafficMap = L.map('trafficMap').setView([40.7128, -74.0060], 12);
    
    // Add base tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(trafficMap);
    
    // Add incident markers
    const incidents = [
        { 
            lat: 40.7580, 
            lng: -73.9855, 
            type: 'accident',
            title: 'Major Accident',
            desc: 'Highway 101, Exit 23',
            severity: 'high'
        },
        { 
            lat: 40.7489, 
            lng: -73.9680, 
            type: 'construction',
            title: 'Road Construction',
            desc: 'Main St & 5th Ave',
            severity: 'medium'
        },
        { 
            lat: 40.7306, 
            lng: -73.9352, 
            type: 'malfunction',
            title: 'Traffic Light Malfunction',
            desc: 'Oak Rd & Park Blvd',
            severity: 'medium'
        },
        { 
            lat: 40.6782, 
            lng: -73.9442, 
            type: 'event',
            title: 'Special Event',
            desc: 'Downtown Plaza',
            severity: 'low'
        },
        { 
            lat: 40.7589, 
            lng: -73.9851, 
            type: 'sensor',
            title: 'Traffic Sensor',
            desc: 'Active - 52 km/h avg',
            severity: 'normal'
        }
    ];
    
    // Add markers to map
    incidents.forEach(incident => {
        const colors = {
            accident: '#ef4444',
            construction: '#f59e0b',
            malfunction: '#f59e0b',
            event: '#06b6d4',
            sensor: '#10b981'
        };
        
        const icons = {
            accident: '⚠️',
            construction: '🚧',
            malfunction: '🚦',
            event: '🎪',
            sensor: '📡'
        };
        
        const marker = L.circleMarker([incident.lat, incident.lng], {
            radius: 10,
            fillColor: colors[incident.type],
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(trafficMap);
        
        marker.bindPopup(`
            <div style="min-width: 200px;">
                <strong style="font-size: 1.1em;">${icons[incident.type]} ${incident.title}</strong><br>
                <span style="color: #666;">${incident.desc}</span><br>
                <span style="color: ${colors[incident.type]}; font-weight: 600;">
                    Severity: ${incident.severity.toUpperCase()}
                </span>
            </div>
        `);
    });
    
    // Add traffic flow lines (example routes)
    const routes = [
        [[40.7580, -73.9855], [40.7489, -73.9680]],
        [[40.7489, -73.9680], [40.7306, -73.9352]],
        [[40.7306, -73.9352], [40.6782, -73.9442]]
    ];
    
    routes.forEach(route => {
        L.polyline(route, {
            color: '#2563eb',
            weight: 4,
            opacity: 0.6
        }).addTo(trafficMap);
    });
}

// Toggle traffic layer
function toggleTrafficLayer() {
    trafficLayer = !trafficLayer;
    if (trafficLayer) {
        showNotification('Traffic layer enabled', 'success');
    } else {
        showNotification('Traffic layer disabled', 'info');
    }
}

// Refresh map
function refreshMap() {
    trafficMap.invalidateSize();
    showNotification('Map refreshed', 'success');
}

/* ============================================
   CHARTS INITIALIZATION
   ============================================ */
let flowChart, densityChart;

function initTrafficCharts() {
    // Traffic Flow Chart
    const flowCtx = document.getElementById('trafficFlowChart').getContext('2d');
    flowChart = new Chart(flowCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
            datasets: [{
                label: 'Highway 101',
                data: [300, 250, 450, 850, 680, 720, 920, 650, 420],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'Main Street',
                data: [280, 220, 380, 750, 620, 680, 850, 580, 380],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'Downtown',
                data: [250, 200, 320, 680, 540, 600, 780, 520, 340],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
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
                            return value + ' vehicles';
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
    
    // Traffic Density Chart
    const densityCtx = document.getElementById('densityChart').getContext('2d');
    densityChart = new Chart(densityCtx, {
        type: 'bar',
        data: {
            labels: ['North', 'South', 'East', 'West', 'Central', 'Downtown'],
            datasets: [{
                label: 'Traffic Density',
                data: [720, 580, 650, 490, 820, 780],
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
                            return value + ' vehicles/km';
                        }
                    }
                }
            }
        }
    });
}

// Update flow chart based on time period
function updateFlowChart(period) {
    const datasets = {
        today: {
            highway: [300, 250, 450, 850, 680, 720, 920, 650, 420],
            main: [280, 220, 380, 750, 620, 680, 850, 580, 380],
            downtown: [250, 200, 320, 680, 540, 600, 780, 520, 340]
        },
        week: {
            highway: [650, 680, 720, 750, 780, 820, 800],
            main: [580, 620, 650, 680, 710, 740, 720],
            downtown: [520, 540, 580, 620, 650, 680, 660]
        },
        month: {
            highway: [680, 690, 710, 730, 750, 770, 790, 810, 820],
            main: [620, 630, 645, 660, 680, 695, 710, 725, 740],
            downtown: [560, 570, 585, 600, 620, 635, 650, 665, 680]
        }
    };
    
    const labels = {
        today: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
        week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        month: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9']
    };
    
    flowChart.data.labels = labels[period];
    flowChart.data.datasets[0].data = datasets[period].highway;
    flowChart.data.datasets[1].data = datasets[period].main;
    flowChart.data.datasets[2].data = datasets[period].downtown;
    flowChart.update();
}

/* ============================================
   INCIDENT MANAGEMENT
   ============================================ */

// View incident details
function viewIncident(id) {
    showNotification(`Viewing incident #${id}`, 'info');
    // Add your logic to show incident details modal or navigate to detail page
}

// Submit new incident
function submitIncident() {
    const form = document.getElementById('incidentForm');
    if (form.checkValidity()) {
        showNotification('Incident reported successfully!', 'success');
        bootstrap.Modal.getInstance(document.getElementById('addIncidentModal')).hide();
        form.reset();
    } else {
        form.reportValidity();
    }
}

/* ============================================
   TRANSPORT FILTERING
   ============================================ */
function filterTransport(type) {
    const rows = document.querySelectorAll('#transportTableBody tr');
    
    rows.forEach(row => {
        if (type === 'all') {
            row.style.display = '';
        } else {
            const badge = row.querySelector('.transport-badge');
            const badgeText = badge.textContent.toLowerCase();
            
            if (badgeText.includes(type)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
    
    showNotification(`Filtered by: ${type}`, 'info');
}

/* ============================================
   EXPORT FUNCTIONALITY
   ============================================ */
function exportTrafficReport() {
    // Simulate export
    showNotification('Generating traffic report...', 'info');
    
    setTimeout(() => {
        showNotification('Report exported successfully!', 'success');
        // Add actual export logic here
    }, 1500);
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function animateCounters() {
    animateCounter('avgSpeed', 0, 45, 1500);
    animateCounter('vehicleCount', 0, 12543, 2000);
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

/* ============================================
   REAL-TIME UPDATES (SIMULATION)
   ============================================ */

// Simulate real-time traffic updates
setInterval(() => {
    // Update random stats
    const avgSpeed = document.getElementById('avgSpeed');
    if (avgSpeed) {
        const currentSpeed = parseInt(avgSpeed.textContent);
        const change = Math.floor(Math.random() * 10) - 5;
        avgSpeed.textContent = Math.max(20, Math.min(80, currentSpeed + change));
    }
}, 5000);

// Console log
console.log('%c🚗 Traffic & Transportation Module Loaded', 'font-size: 14px; font-weight: bold; color: #2563eb;');