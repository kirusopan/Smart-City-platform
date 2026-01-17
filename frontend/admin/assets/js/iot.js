/* ============================================
   IOT DEVICES & SENSORS PAGE - JAVASCRIPT
   Add this to your page or create iot.js
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDeviceMap();
    initDeviceCharts();
    initSearchFilter();
    animateDeviceCounters();
});

/* ============================================
   DEVICE MAP INITIALIZATION
   ============================================ */
let deviceMap;

function initDeviceMap() {
    deviceMap = L.map('deviceMap').setView([40.7128, -74.0060], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(deviceMap);
    
    // Sample device locations
    const devices = [
        { lat: 40.7580, lng: -73.9855, status: 'active', name: 'Temperature Sensor #A101', type: 'sensor' },
        { lat: 40.7489, lng: -73.9680, status: 'active', name: 'Traffic Camera #B205', type: 'camera' },
        { lat: 40.7306, lng: -73.9352, status: 'warning', name: 'Water Quality Sensor #C312', type: 'sensor' },
        { lat: 40.6782, lng: -73.9442, status: 'active', name: 'Network Gateway #D408', type: 'gateway' },
        { lat: 40.7589, lng: -73.9851, status: 'offline', name: 'Traffic Flow Sensor #E512', type: 'sensor' },
        { lat: 40.7128, lng: -74.0060, status: 'active', name: 'Smart Light Controller #F620', type: 'controller' },
        { lat: 40.7490, lng: -73.9680, status: 'active', name: 'Air Quality Sensor #G102', type: 'sensor' },
        { lat: 40.7580, lng: -74.0000, status: 'warning', name: 'Parking Sensor #H203', type: 'sensor' }
    ];
    
    devices.forEach(device => {
        const colors = {
            active: '#10b981',
            warning: '#f59e0b',
            offline: '#ef4444'
        };
        
        const icons = {
            sensor: '📡',
            camera: '📹',
            gateway: '🌐',
            controller: '🎛️'
        };
        
        const marker = L.circleMarker([device.lat, device.lng], {
            radius: 8,
            fillColor: colors[device.status],
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(deviceMap);
        
        marker.bindPopup(`
            <div style="min-width: 180px;">
                <strong>${icons[device.type]} ${device.name}</strong><br>
                <span style="color: ${colors[device.status]}; font-weight: 600; text-transform: capitalize;">
                    ${device.status}
                </span>
            </div>
        `);
    });
}

function refreshDeviceMap() {
    deviceMap.invalidateSize();
    showNotification('Device map refreshed', 'success');
}

/* ============================================
   CHARTS INITIALIZATION
   ============================================ */
let deviceTypeChart, activityChart, performanceMetricsChart;

function initDeviceCharts() {
    // Device Type Chart
    const typeCtx = document.getElementById('deviceTypeChart');
    if (typeCtx) {
        deviceTypeChart = new Chart(typeCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Sensors', 'Cameras', 'Gateways', 'Controllers'],
                datasets: [{
                    data: [856, 312, 189, 186],
                    backgroundColor: [
                        '#2563eb',
                        '#f59e0b',
                        '#10b981',
                        '#7c3aed'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
    
    // Activity Chart
    const activityCtx = document.getElementById('activityChart');
    if (activityCtx) {
        activityChart = new Chart(activityCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                datasets: [{
                    label: 'Active Devices',
                    data: [1420, 1380, 1450, 1468, 1465, 1455, 1468],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                }, {
                    label: 'Data Transmissions',
                    data: [8500, 7200, 9800, 12500, 11800, 10200, 9500],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Performance Metrics Chart
    const metricsCtx = document.getElementById('performanceMetricsChart');
    if (metricsCtx) {
        performanceMetricsChart = new Chart(metricsCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Sensors', 'Cameras', 'Gateways', 'Controllers'],
                datasets: [{
                    label: 'Uptime %',
                    data: [95.8, 98.2, 99.5, 97.3],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderRadius: 8
                }, {
                    label: 'Response Time (ms)',
                    data: [18, 32, 15, 24],
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

function updateActivityChart(period) {
    const datasets = {
        '24h': {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            active: [1420, 1380, 1450, 1468, 1465, 1455, 1468],
            transmissions: [8500, 7200, 9800, 12500, 11800, 10200, 9500]
        },
        '7d': {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            active: [1450, 1460, 1465, 1468, 1470, 1455, 1468],
            transmissions: [85000, 88000, 92000, 95000, 98000, 82000, 87000]
        },
        '30d': {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            active: [1420, 1445, 1460, 1468],
            transmissions: [350000, 370000, 385000, 395000]
        }
    };
    
    const data = datasets[period];
    activityChart.data.labels = data.labels;
    activityChart.data.datasets[0].data = data.active;
    activityChart.data.datasets[1].data = data.transmissions;
    activityChart.update();
}

/* ============================================
   SEARCH & FILTER FUNCTIONALITY
   ============================================ */
function initSearchFilter() {
    const searchInput = document.getElementById('deviceSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterDevices(searchTerm);
        }, 300));
    }
}

function filterDevices(searchTerm) {
    const devices = document.querySelectorAll('.device-card');
    let visibleCount = 0;
    
    devices.forEach(device => {
        const text = device.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            device.style.display = '';
            visibleCount++;
        } else {
            device.style.display = 'none';
        }
    });
}

function applyDeviceFilters() {
    const status = document.getElementById('filterStatus').value;
    const type = document.getElementById('filterType').value;
    const location = document.getElementById('filterLocation').value;
    const devices = document.querySelectorAll('.device-card');
    
    let visibleCount = 0;
    
    devices.forEach(device => {
        const deviceStatus = device.getAttribute('data-status');
        const deviceType = device.getAttribute('data-type');
        const deviceLocation = device.getAttribute('data-location');
        
        const statusMatch = status === 'all' || deviceStatus === status;
        const typeMatch = type === 'all' || deviceType === type;
        const locationMatch = location === 'all' || deviceLocation === location;
        
        if (statusMatch && typeMatch && locationMatch) {
            device.style.display = '';
            visibleCount++;
        } else {
            device.style.display = 'none';
        }
    });
    
    showNotification(`Showing ${visibleCount} devices`, 'info');
}

function resetDeviceFilters() {
    document.getElementById('filterStatus').value = 'all';
    document.getElementById('filterType').value = 'all';
    document.getElementById('filterLocation').value = 'all';
    document.getElementById('deviceSearch').value = '';
    
    const devices = document.querySelectorAll('.device-card');
    devices.forEach(device => device.style.display = '');
    
    showNotification('Filters reset', 'success');
}

/* ============================================
   VIEW MANAGEMENT
   ============================================ */
function switchDeviceView(view) {
    const gridView = document.getElementById('deviceGridView');
    const buttons = document.querySelectorAll('.btn-group .btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.btn').classList.add('active');
    
    if (view === 'list') {
        gridView.style.display = 'flex';
        gridView.style.flexDirection = 'column';
        gridView.style.gap = '1rem';
        showNotification('Switched to list view', 'info');
    } else {
        gridView.style.display = 'grid';
        gridView.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
        gridView.style.flexDirection = '';
        showNotification('Switched to grid view', 'info');
    }
}

function sortDevices(sortBy) {
    showNotification(`Sorting devices by ${sortBy}`, 'info');
    // In real app, implement actual sorting logic
}

/* ============================================
   DEVICE MANAGEMENT
   ============================================ */
function deviceMenu(event) {
    event.stopPropagation();
    showNotification('Device menu opened', 'info');
    // In real app, show context menu with options
}

function bulkAction() {
    showNotification('Opening bulk action panel...', 'info');
    // In real app, allow selecting multiple devices and performing actions
}

function addNewDevice() {
    const form = document.getElementById('deviceForm');
    
    if (form.checkValidity()) {
        showNotification('Adding new device...', 'info');
        
        setTimeout(() => {
            showNotification('Device added successfully!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('addDeviceModal')).hide();
            form.reset();
            
            // Update counter
            const totalDevices = document.getElementById('totalDevices');
            const currentCount = parseInt(totalDevices.textContent.replace(/,/g, ''));
            totalDevices.textContent = (currentCount + 1).toLocaleString();
        }, 1500);
    } else {
        form.reportValidity();
    }
}

/* ============================================
   ANIMATION & COUNTERS
   ============================================ */
function animateDeviceCounters() {
    animateCounter('totalDevices', 0, 1543, 2000);
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
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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
   REAL-TIME SIMULATION
   ============================================ */

// Simulate real-time device updates
setInterval(() => {
    // Update random device metrics (uncomment to enable)
    // const activeDevices = document.querySelectorAll('.device-card.device-active');
    // if (activeDevices.length > 0) {
    //     const randomDevice = activeDevices[Math.floor(Math.random() * activeDevices.length)];
    //     // Update metrics...
    // }
}, 5000);

// Console log
console.log('%c📡 IoT Devices & Sensors Module Loaded', 'font-size: 14px; font-weight: bold; color: #2563eb;');
console.log('%cDevice monitoring system ready', 'font-size: 12px; color: #64748b;');