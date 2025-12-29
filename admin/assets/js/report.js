/* ============================================
   REPORTS & ANALYTICS PAGE - JAVASCRIPT
   Add this to your page or create reports.js
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAllCharts();
    animateKPICounters();
    setCurrentDate();
});

/* ============================================
   CHARTS INITIALIZATION
   ============================================ */
let performanceChart, departmentChart, resourceChart, responseTimeChart, costChart, comparisonChart;
let miniCharts = [];

function initAllCharts() {
    initMiniCharts();
    initPerformanceChart();
    initDepartmentChart();
    initResourceChart();
    initResponseTimeChart();
    initCostChart();
    initComparisonChart();
}

// Mini KPI Charts
function initMiniCharts() {
    const miniChartConfigs = [
        { id: 'miniChart1', data: [65, 68, 72, 75, 78, 82, 85] },
        { id: 'miniChart2', data: [82, 84, 83, 86, 85, 87, 88] },
        { id: 'miniChart3', data: [3.8, 4.0, 4.1, 4.2, 4.2, 4.3, 4.3] },
        { id: 'miniChart4', data: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4] }
    ];
    
    miniChartConfigs.forEach(config => {
        const ctx = document.getElementById(config.id);
        if (ctx) {
            const chart = new Chart(ctx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['', '', '', '', '', '', ''],
                    datasets: [{
                        data: config.data,
                        borderColor: 'rgba(37, 99, 235, 0.8)',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
            miniCharts.push(chart);
        }
    });
}

// Performance Trends Chart
function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    performanceChart = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Efficiency',
                data: [88, 91, 93, 94],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'Response Time',
                data: [85, 87, 89, 92],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'Satisfaction',
                data: [82, 84, 86, 88],
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
                    beginAtZero: false,
                    min: 75,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Department Performance Chart
function initDepartmentChart() {
    const ctx = document.getElementById('departmentChart');
    if (!ctx) return;
    
    departmentChart = new Chart(ctx.getContext('2d'), {
        type: 'radar',
        data: {
            labels: ['Traffic', 'Utilities', 'Waste', 'Safety', 'IoT', 'Feedback'],
            datasets: [{
                label: 'Current',
                data: [93, 94, 91, 93.5, 91, 89],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderWidth: 2
            }, {
                label: 'Target',
                data: [95, 95, 95, 95, 95, 95],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                borderDash: [5, 5]
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
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// Resource Utilization Chart
function initResourceChart() {
    const ctx = document.getElementById('resourceChart');
    if (!ctx) return;
    
    resourceChart = new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Used', 'Available'],
            datasets: [{
                data: [73, 27],
                backgroundColor: ['#2563eb', '#e2e8f0'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '75%',
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Response Time Analysis Chart
function initResponseTimeChart() {
    const ctx = document.getElementById('responseTimeChart');
    if (!ctx) return;
    
    responseTimeChart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['<1h', '1-2h', '2-4h', '4-8h', '>8h'],
            datasets: [{
                label: 'Number of Cases',
                data: [245, 189, 123, 67, 32],
                backgroundColor: [
                    '#10b981',
                    '#06b6d4',
                    '#f59e0b',
                    '#ef4444',
                    '#7c3aed'
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
                            return value + ' cases';
                        }
                    }
                }
            }
        }
    });
}

// Cost Breakdown Chart
function initCostChart() {
    const ctx = document.getElementById('costChart');
    if (!ctx) return;
    
    costChart = new Chart(ctx.getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['Personnel', 'Infrastructure', 'Operations', 'Technology', 'Other'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#2563eb',
                    '#10b981',
                    '#f59e0b',
                    '#06b6d4',
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
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Comparison Chart
function initComparisonChart() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;
    
    comparisonChart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: '2024',
                data: [980, 1020, 1150, 1080, 1200, 1180, 1250, 1220, 1280, 1300, 1350, 1400],
                backgroundColor: 'rgba(37, 99, 235, 0.7)',
                borderRadius: 6
            }, {
                label: '2025',
                data: [1050, 1100, 1180, 1150, 1247, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderRadius: 6
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
                    beginAtZero: true,
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

/* ============================================
   CHART UPDATE FUNCTIONS
   ============================================ */

function updatePerformanceChart(period) {
    const datasets = {
        daily: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            efficiency: [89, 91, 90, 93, 94, 92, 91],
            response: [86, 88, 87, 90, 92, 89, 88],
            satisfaction: [83, 85, 84, 87, 88, 86, 85]
        },
        weekly: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            efficiency: [88, 91, 93, 94],
            response: [85, 87, 89, 92],
            satisfaction: [82, 84, 86, 88]
        },
        monthly: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            efficiency: [85, 87, 88, 89, 90, 91, 92, 92, 93, 93, 94, 94],
            response: [82, 84, 85, 86, 87, 88, 89, 90, 90, 91, 91, 92],
            satisfaction: [80, 81, 82, 83, 84, 85, 85, 86, 86, 87, 87, 88]
        }
    };
    
    const data = datasets[period];
    performanceChart.data.labels = data.labels;
    performanceChart.data.datasets[0].data = data.efficiency;
    performanceChart.data.datasets[1].data = data.response;
    performanceChart.data.datasets[2].data = data.satisfaction;
    performanceChart.update();
}

function updateComparisonChart(years) {
    const datasets = {
        '2024-2025': {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            year1: [980, 1020, 1150, 1080, 1200, 1180, 1250, 1220, 1280, 1300, 1350, 1400],
            year2: [1050, 1100, 1180, 1150, 1247, 0, 0, 0, 0, 0, 0, 0],
            label1: '2024',
            label2: '2025'
        },
        '2023-2024': {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            year1: [850, 890, 920, 950, 980, 1010, 1040, 1070, 1100, 1130, 1160, 1190],
            year2: [980, 1020, 1150, 1080, 1200, 1180, 1250, 1220, 1280, 1300, 1350, 1400],
            label1: '2023',
            label2: '2024'
        },
        '2022-2023': {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            year1: [720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050],
            year2: [850, 890, 920, 950, 980, 1010, 1040, 1070, 1100, 1130, 1160, 1190],
            label1: '2022',
            label2: '2023'
        }
    };
    
    const data = datasets[years];
    comparisonChart.data.labels = data.labels;
    comparisonChart.data.datasets[0].label = data.label1;
    comparisonChart.data.datasets[0].data = data.year1;
    comparisonChart.data.datasets[1].label = data.label2;
    comparisonChart.data.datasets[1].data = data.year2;
    comparisonChart.update();
}

/* ============================================
   DATE & FILTER FUNCTIONS
   ============================================ */

function setCurrentDate() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const weekAgo = new Date(today - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    document.getElementById('dateTo').value = dateStr;
    document.getElementById('dateFrom').value = weekAgo;
}

function setQuickRange(range) {
    const today = new Date();
    const dateTo = document.getElementById('dateTo');
    const dateFrom = document.getElementById('dateFrom');
    
    let startDate;
    switch(range) {
        case 'today':
            startDate = today;
            break;
        case 'week':
            startDate = new Date(today - 7 * 24 * 60 * 60 * 1000);
            break;
        case 'month':
            startDate = new Date(today - 30 * 24 * 60 * 60 * 1000);
            break;
        case 'year':
            startDate = new Date(today - 365 * 24 * 60 * 60 * 1000);
            break;
        default:
            startDate = new Date(today - 7 * 24 * 60 * 60 * 1000);
    }
    
    dateTo.value = today.toISOString().split('T')[0];
    dateFrom.value = startDate.toISOString().split('T')[0];
    
    // Update active state
    document.querySelectorAll('.btn-group .btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function applyDateFilter() {
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const reportType = document.getElementById('reportType').value;
    
    showNotification(`Filtering ${reportType} reports from ${dateFrom} to ${dateTo}`, 'info');
    
    // In real app, this would refresh charts with filtered data
    setTimeout(() => {
        showNotification('Data updated successfully!', 'success');
    }, 1000);
}

function changeReportType(type) {
    showNotification(`Switched to ${type} report view`, 'info');
    // In real app, this would load different data based on report type
}

/* ============================================
   EXPORT FUNCTIONS
   ============================================ */

function exportToExcel() {
    showNotification('Exporting data to Excel...', 'info');
    setTimeout(() => {
        showNotification('Excel file downloaded successfully!', 'success');
        // In real app, implement actual Excel export
    }, 1500);
}

function exportToPDF() {
    showNotification('Generating PDF report...', 'info');
    setTimeout(() => {
        showNotification('PDF report downloaded successfully!', 'success');
        // In real app, implement actual PDF generation
    }, 2000);
}

function exportToCSV() {
    showNotification('Exporting data to CSV...', 'info');
    setTimeout(() => {
        showNotification('CSV file downloaded successfully!', 'success');
        // In real app, implement actual CSV export
    }, 1000);
}

function downloadChart(chartName) {
    showNotification(`Downloading ${chartName} chart...`, 'info');
    
    setTimeout(() => {
        showNotification('Chart image downloaded!', 'success');
        // In real app, use chart.toBase64Image() to download
    }, 1000);
}

function downloadReport(reportId) {
    showNotification(`Downloading report ${reportId}...`, 'info');
    
    setTimeout(() => {
        showNotification('Report downloaded successfully!', 'success');
    }, 1500);
}

/* ============================================
   REPORT MANAGEMENT
   ============================================ */

function scheduleReport() {
    showNotification('Opening report scheduler...', 'info');
    // In real app, open schedule modal
}

function generateCustomReport() {
    const form = document.getElementById('reportForm');
    
    if (form.checkValidity()) {
        showNotification('Generating custom report...', 'info');
        
        setTimeout(() => {
            showNotification('Report generated successfully!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('generateReportModal')).hide();
            form.reset();
        }, 2500);
    } else {
        form.reportValidity();
    }
}

function manageSchedules() {
    showNotification('Opening schedule manager...', 'info');
    // In real app, open schedule management modal
}

/* ============================================
   ANIMATION & COUNTERS
   ============================================ */

function animateKPICounters() {
    animateCounter('kpiEfficiency', 0, 94.2, 2000, 1);
}

function animateCounter(id, start, end, duration, decimals = 0) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end.toFixed(decimals) + '%';
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(decimals) + '%';
        }
    }, 16);
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

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

// Console log
console.log('%c📊 Reports & Analytics Module Loaded', 'font-size: 14px; font-weight: bold; color: #2563eb;');
console.log('%cComprehensive reporting system ready', 'font-size: 12px; color: #64748b;');