/* ============================================
   TRAFFIC & TRANSPORTATION PAGE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initTrafficPage();
});

function initTrafficPage() {
    // Initialize all traffic page features
    loadTrafficData();
    initRefreshButton();
    startLiveUpdates();
    animateProgressBars();
    initMapInteractions();
}

// Static Data
const trafficData = {
    stats: {
        vehiclesToday: 45234,
        averageSpeed: 42,
        activeIncidents: 7,
        transitOnTime: 98.5
    },
    incidents: [
        {
            id: 'INC-001',
            type: 'Major Accident',
            location: 'Highway 101, Exit 45',
            severity: 'high',
            time: '15 mins ago',
            icon: 'exclamation-triangle'
        },
        {
            id: 'INC-002',
            type: 'Road Construction',
            location: 'Main Street & 5th Ave',
            severity: 'medium',
            time: '2 hours ago',
            icon: 'cone-striped'
        },
        {
            id: 'INC-003',
            type: 'Vehicle Breakdown',
            location: 'Park Avenue, Lane 2',
            severity: 'low',
            time: '45 mins ago',
            icon: 'car-front'
        },
        {
            id: 'INC-004',
            type: 'Traffic Light Malfunction',
            location: 'Oak St & Broadway',
            severity: 'medium',
            time: '1 hour ago',
            icon: 'stoplights'
        }
    ],
    busRoutes: [
        { route: '101', name: 'Downtown Express', status: 'On Time', nextBus: 5, delay: 0 },
        { route: '205', name: 'City Circle', status: 'On Time', nextBus: 8, delay: 0 },
        { route: '312', name: 'Airport Shuttle', status: 'Delayed', nextBus: 12, delay: 5 },
        { route: '420', name: 'Suburban Line', status: 'On Time', nextBus: 3, delay: 0 },
        { route: '515', name: 'North Route', status: 'Delayed', nextBus: 15, delay: 7 },
        { route: '622', name: 'South Express', status: 'On Time', nextBus: 6, delay: 0 }
    ],
    trafficDensity: [
        { area: 'Downtown District', vehicles: 12450, percentage: 85, status: 'Heavy' },
        { area: 'Business Center', vehicles: 8230, percentage: 65, status: 'Moderate' },
        { area: 'Residential North', vehicles: 3890, percentage: 35, status: 'Light' },
        { area: 'Industrial Zone', vehicles: 5670, percentage: 55, status: 'Moderate' },
        { area: 'Suburban Areas', vehicles: 2120, percentage: 25, status: 'Light' }
    ],
    parking: [
        { name: 'Central Mall Parking', available: 145, total: 300 },
        { name: 'City Center Garage', available: 23, total: 250 },
        { name: 'Park & Ride Station A', available: 180, total: 200 },
        { name: 'Stadium Parking Lot', available: 450, total: 500 }
    ],
    violations: [
        { id: 'VIO-2451', type: 'Speeding', location: 'Highway 101', date: 'Jan 15, 10:30 AM', vehicle: 'ABC-1234', fine: 150, status: 'Pending' },
        { id: 'VIO-2450', type: 'Red Light', location: 'Main St & 5th Ave', date: 'Jan 15, 09:15 AM', vehicle: 'XYZ-5678', fine: 200, status: 'Pending' },
        { id: 'VIO-2449', type: 'Illegal Parking', location: 'Park Avenue', date: 'Jan 14, 03:45 PM', vehicle: 'DEF-9012', fine: 75, status: 'Paid' },
        { id: 'VIO-2448', type: 'Stop Sign Violation', location: 'Oak St & Elm Rd', date: 'Jan 14, 11:20 AM', vehicle: 'GHI-3456', fine: 125, status: 'Pending' },
        { id: 'VIO-2447', type: 'Speeding', location: 'School Zone, Cedar St', date: 'Jan 13, 08:00 AM', vehicle: 'JKL-7890', fine: 250, status: 'Unpaid' }
    ]
};

// Load Traffic Data
function loadTrafficData() {
    console.log('Loading traffic data:', trafficData);
    
    // Update stats with animation
    updateStats();
    
    // Log data loaded
    console.log('Traffic data loaded successfully');
}

// Update Statistics
function updateStats() {
    const stats = trafficData.stats;
    
    // Animate vehicle count
    animateValue('vehiclesToday', 0, stats.vehiclesToday, 2000);
}

// Animate Number Value
function animateValue(id, start, end, duration) {
    const element = document.querySelector('.stat-card.stat-primary .stat-value');
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = formatNumber(end);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

// Format Number with Commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Initialize Refresh Button
function initRefreshButton() {
    const refreshBtn = document.querySelector('.btn-outline-primary');
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            refreshTrafficData();
        });
    }
}

// Refresh Traffic Data
function refreshTrafficData() {
    console.log('Refreshing traffic data...');
    
    const btn = document.querySelector('.btn-outline-primary');
    const originalHTML = btn.innerHTML;
    
    // Show loading state
    btn.innerHTML = '<i class="bi bi-arrow-clockwise spin"></i> Refreshing...';
    btn.disabled = true;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        .spin {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Simulate API call
    setTimeout(() => {
        loadTrafficData();
        animateProgressBars();
        
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        
        showNotification('Traffic data refreshed successfully', 'success');
    }, 1500);
}

// Start Live Updates
function startLiveUpdates() {
    // Update every 30 seconds
    setInterval(() => {
        updateLiveData();
    }, 30000);
}

// Update Live Data
function updateLiveData() {
    console.log('Updating live data...');
    
    // Simulate random changes in traffic data
    const randomChange = () => Math.floor(Math.random() * 1000) - 500;
    
    trafficData.stats.vehiclesToday += randomChange();
    trafficData.stats.activeIncidents = Math.max(0, trafficData.stats.activeIncidents + (Math.random() > 0.5 ? 1 : -1));
    
    // Update display
    updateStats();
}

// Animate Progress Bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, index * 100);
    });
}

// Initialize Map Interactions
function initMapInteractions() {
    const mapElement = document.getElementById('trafficMap');
    
    if (mapElement) {
        mapElement.addEventListener('click', function() {
            console.log('Traffic map clicked');
            showNotification('Interactive map will be implemented here', 'info');
        });
    }
}

// Filter Incidents by Severity
function filterIncidents(severity) {
    const incidentItems = document.querySelectorAll('.incident-item');
    
    incidentItems.forEach(item => {
        if (severity === 'all' || item.classList.contains(`incident-${severity}`)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Calculate Parking Percentage
function calculateParkingPercentage(available, total) {
    return Math.round((available / total) * 100);
}

// Get Traffic Status
function getTrafficStatus(percentage) {
    if (percentage >= 70) return 'Heavy';
    if (percentage >= 40) return 'Moderate';
    return 'Light';
}

// Get Status Color
function getStatusColor(status) {
    const colors = {
        'Heavy': 'danger',
        'Moderate': 'warning',
        'Light': 'success'
    };
    return colors[status] || 'info';
}

// Export Traffic Report
function exportTrafficReport() {
    console.log('Exporting traffic report...');
    
    const reportData = {
        generatedAt: new Date().toISOString(),
        stats: trafficData.stats,
        incidents: trafficData.incidents,
        busRoutes: trafficData.busRoutes,
        trafficDensity: trafficData.trafficDensity
    };
    
    const json = JSON.stringify(reportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `traffic-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification('Traffic report exported successfully', 'success');
}

// Filter Traffic Data by Time
function filterByTime(period) {
    console.log('Filtering by time period:', period);
    
    // Implement time-based filtering
    showNotification(`Showing data for: ${period}`, 'info');
}

// Search Traffic Violations
function searchViolations(query) {
    const rows = document.querySelectorAll('.table tbody tr');
    const searchTerm = query.toLowerCase();
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Calculate Average Speed
function calculateAverageSpeed(speeds) {
    const sum = speeds.reduce((a, b) => a + b, 0);
    return (sum / speeds.length).toFixed(1);
}

// Get Route Status Badge
function getRouteStatusBadge(status) {
    const badges = {
        'On Time': 'badge-success',
        'Delayed': 'badge-warning',
        'Cancelled': 'badge-danger'
    };
    return badges[status] || 'badge-info';
}

// Update Bus Route Status
function updateBusRouteStatus() {
    console.log('Updating bus route status...');
    
    trafficData.busRoutes.forEach(route => {
        if (route.nextBus > 0) {
            route.nextBus -= 1;
        } else {
            route.nextBus = Math.floor(Math.random() * 15) + 3;
        }
    });
}

// Show Incident Details
function showIncidentDetails(incidentId) {
    const incident = trafficData.incidents.find(i => i.id === incidentId);
    
    if (incident) {
        console.log('Incident details:', incident);
        showNotification(`Incident: ${incident.type} at ${incident.location}`, 'info');
    }
}

// Calculate Total Violations Fine
function calculateTotalFines() {
    return trafficData.violations.reduce((total, violation) => {
        return violation.status !== 'Paid' ? total + violation.fine : total;
    }, 0);
}

// Show Notification
function showNotification(message, type = 'info') {
    const toastContainer = getOrCreateToastContainer();
    
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
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

// Get or Create Toast Container
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

// Real-time Clock Update
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    console.log('Current time:', timeString);
}

// Start clock updates
setInterval(updateClock, 1000);

console.log('Traffic & Transportation JavaScript Loaded');