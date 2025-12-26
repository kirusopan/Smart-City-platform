/* ============================================
   WASTE MANAGEMENT PAGE - JAVASCRIPT
   Add this to your page or create waste.js
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initWasteCharts();
    initRouteMap();
    animateWasteCounters();
    startWasteUpdates();
});

/* ============================================
   CHARTS INITIALIZATION
   ============================================ */
let collectionChart, wasteTypeChart;

function initWasteCharts() {
    // Waste Collection Trends Chart
    const collectionCtx = document.getElementById('wasteCollectionChart').getContext('2d');
    collectionChart = new Chart(collectionCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Mixed Waste',
                data: [1180, 1220, 1200, 1250, 1280, 1150, 1100],
                borderColor: '#6b7280',
                backgroundColor: 'rgba(107, 114, 128, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'Recyclable',
                data: [520, 540, 530, 560, 580, 510, 490],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'Organic',
                data: [350, 360, 355, 370, 380, 340, 320],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'Hazardous',
                data: [95, 100, 98, 105, 110, 92, 88],
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
                    stacked: false,
                    ticks: {
                        callback: function(value) {
                            return value + ' tons';
                        }
                    }
                }
            }
        }
    });
    
    // Waste Type Distribution Chart
    const wasteTypeCtx = document.getElementById('wasteTypeChart').getContext('2d');
    wasteTypeChart = new Chart(wasteTypeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Recyclable', 'Organic', 'General', 'Hazardous'],
            datasets: [{
                data: [42, 28, 22, 8],
                backgroundColor: ['#10b981', '#2563eb', '#f59e0b', '#ef4444'],
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
}

/* ============================================
   CHART UPDATE FUNCTIONS
   ============================================ */
function updateCollectionChart(period) {
    const datasets = {
        week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            mixed: [1180, 1220, 1200, 1250, 1280, 1150, 1100],
            recyclable: [520, 540, 530, 560, 580, 510, 490],
            organic: [350, 360, 355, 370, 380, 340, 320],
            hazardous: [95, 100, 98, 105, 110, 92, 88]
        },
        month: {
            labels: Array.from({length: 30}, (_, i) => `Day ${i + 1}`),
            mixed: Array.from({length: 30}, () => Math.floor(Math.random() * 300) + 1100),
            recyclable: Array.from({length: 30}, () => Math.floor(Math.random() * 100) + 500),
            organic: Array.from({length: 30}, () => Math.floor(Math.random() * 80) + 330),
            hazardous: Array.from({length: 30}, () => Math.floor(Math.random() * 30) + 85)
        },
        year: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            mixed: [35000, 34500, 36000, 35500, 37000, 36500, 38000, 37500, 36000, 37000, 35500, 34000],
            recyclable: [15000, 14800, 15500, 15200, 16000, 15800, 16500, 16200, 15500, 16000, 15300, 14700],
            organic: [10000, 9800, 10200, 10000, 10500, 10300, 10800, 10600, 10200, 10500, 10100, 9700],
            hazardous: [2800, 2750, 2900, 2850, 3000, 2950, 3100, 3050, 2900, 3000, 2850, 2750]
        }
    };
    
    const data = datasets[period];
    collectionChart.data.labels = data.labels;
    collectionChart.data.datasets[0].data = data.mixed;
    collectionChart.data.datasets[1].data = data.recyclable;
    collectionChart.data.datasets[2].data = data.organic;
    collectionChart.data.datasets[3].data = data.hazardous;
    collectionChart.update();
}

/* ============================================
   MAP INITIALIZATION
   ============================================ */
let routeMap;
let routeMarkers = [];

function initRouteMap() {
    routeMap = L.map('wasteRouteMap').setView([40.7128, -74.0060], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(routeMap);
    
    // Add route markers
    const routes = [
        { lat: 40.7580, lng: -73.9855, name: 'Route A - Zone 1', status: 'completed', truck: 'TRK-001' },
        { lat: 40.7489, lng: -73.9680, name: 'Route B - Zone 2', status: 'in-progress', truck: 'TRK-005' },
        { lat: 40.7306, lng: -73.9352, name: 'Route C - Zone 3', status: 'scheduled', truck: 'TRK-012' },
        { lat: 40.6782, lng: -73.9442, name: 'Route D - Zone 4', status: 'delayed', truck: 'TRK-008' },
        { lat: 40.7120, lng: -74.0060, name: 'Route E - Zone 5', status: 'scheduled', truck: 'TRK-015' }
    ];
    
    routes.forEach(route => {
        const colors = {
            completed: '#10b981',
            'in-progress': '#2563eb',
            scheduled: '#6b7280',
            delayed: '#f59e0b'
        };
        
        const icons = {
            completed: '✓',
            'in-progress': '🚛',
            scheduled: '📅',
            delayed: '⚠️'
        };
        
        const marker = L.circleMarker([route.lat, route.lng], {
            radius: 12,
            fillColor: colors[route.status],
            color: '#fff',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(routeMap);
        
        marker.bindPopup(`
            <div style="min-width: 200px;">
                <strong style="font-size: 1.1em;">${icons[route.status]} ${route.name}</strong><br>
                <span style="color: #666;">Truck: ${route.truck}</span><br>
                <span style="color: ${colors[route.status]}; font-weight: 600; text-transform: uppercase;">
                    ${route.status.replace('-', ' ')}
                </span>
            </div>
        `);
        
        routeMarkers.push(marker);
    });
    
    // Add example route path
    const routePath = [
        [40.7580, -73.9855],
        [40.7550, -73.9820],
        [40.7520, -73.9785],
        [40.7489, -73.9680]
    ];
    
    L.polyline(routePath, {
        color: '#2563eb',
        weight: 4,
        opacity: 0.7,
        dashArray: '10, 5'
    }).addTo(routeMap);
}

function toggleRouteLayer() {
    showNotification('Route layer toggled', 'info');
}

function refreshRouteMap() {
    routeMap.invalidateSize();
    showNotification('Map refreshed', 'success');
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function animateWasteCounters() {
    animateCounter('wasteCollected', 0, 1245, 2000);
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
   FILTER FUNCTIONS
   ============================================ */
function filterPoints(status) {
    const rows = document.querySelectorAll('#collectionPointsTable tr');
    
    rows.forEach(row => {
        if (status === 'all') {
            row.style.display = '';
        } else {
            if (row.classList.contains(`point-${status}`)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
    
    showNotification(`Filtered by: ${status}`, 'info');
}

/* ============================================
   VIEW FUNCTIONS
   ============================================ */
function viewPoint(id) {
    showNotification(`Viewing collection point: ${id}`, 'info');
    // Add logic to show point details modal
}

/* ============================================
   SCHEDULE ROUTE
   ============================================ */
function submitScheduleRoute() {
    const form = document.getElementById('scheduleRouteForm');
    if (form.checkValidity()) {
        showNotification('Route scheduled successfully!', 'success');
        bootstrap.Modal.getInstance(document.getElementById('scheduleRouteModal')).hide();
        form.reset();
        
        // Add logic to save schedule
    } else {
        form.reportValidity();
    }
}

/* ============================================
   EXPORT FUNCTION
   ============================================ */
function exportWasteReport() {
    showNotification('Generating waste management report...', 'info');
    
    setTimeout(() => {
        showNotification('Report exported successfully!', 'success');
        // Add actual export logic here
    }, 1500);
}

/* ============================================
   REAL-TIME UPDATES
   ============================================ */
function startWasteUpdates() {
    // Update waste collected every 10 seconds
    setInterval(() => {
        const wasteElement = document.getElementById('wasteCollected');
        if (wasteElement) {
            const current = parseInt(wasteElement.textContent.replace(/,/g, ''));
            const change = Math.floor(Math.random() * 20) - 5; // -5 to +15 tons
            const newValue = Math.max(1000, Math.min(1500, current + change));
            wasteElement.textContent = newValue.toLocaleString();
        }
    }, 10000);
    
    // Animate progress bars
    setInterval(() => {
        document.querySelectorAll('.progress-fill.active').forEach(bar => {
            const currentWidth = parseInt(bar.style.width);
            const newWidth = Math.min(100, currentWidth + Math.floor(Math.random() * 3));
            bar.style.width = newWidth + '%';
            const textElement = bar.closest('.schedule-progress').querySelector('.progress-text');
            if (textElement) {
                textElement.textContent = newWidth + '%';
            }
        });
        
        document.querySelectorAll('.load-fill').forEach(bar => {
            const parent = bar.closest('.fleet-item');
            if (parent && parent.classList.contains('status-active')) {
                const currentWidth = parseInt(bar.style.width);
                const change = Math.floor(Math.random() * 6) - 2; // -2 to +4%
                const newWidth = Math.max(0, Math.min(100, currentWidth + change));
                bar.style.width = newWidth + '%';
                const valueElement = bar.closest('.load-indicator').querySelector('.load-value');
                if (valueElement) {
                    valueElement.textContent = newWidth + '%';
                }
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
console.log('%c🗑️♻️ Waste Management Module Loaded', 'font-size: 14px; font-weight: bold; color: #10b981;');