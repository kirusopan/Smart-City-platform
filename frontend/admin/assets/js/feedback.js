/* ============================================
   CITIZEN FEEDBACK PAGE - JAVASCRIPT
   Add this to your page or create feedback.js
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFeedbackCharts();
    initSearchFilter();
    animateFeedbackCounters();
});

/* ============================================
   CHARTS INITIALIZATION
   ============================================ */
let trendsChart, categoryChart;

function initFeedbackCharts() {
    // Feedback Trends Chart
    const trendsCtx = document.getElementById('feedbackTrendsChart').getContext('2d');
    trendsChart = new Chart(trendsCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Total Feedback',
                data: [280, 320, 295, 352],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'Resolved',
                data: [245, 285, 268, 291],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'Pending',
                data: [35, 35, 27, 61],
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
                            return value + ' cases';
                        }
                    }
                }
            }
        }
    });
    
    // Category Distribution Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Traffic', 'Utilities', 'Waste', 'Safety', 'Other'],
            datasets: [{
                data: [245, 189, 156, 123, 87],
                backgroundColor: [
                    '#2563eb',
                    '#f59e0b',
                    '#10b981',
                    '#ef4444',
                    '#06b6d4'
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

// Update trends chart based on period
function updateTrendsChart(period) {
    const datasets = {
        week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            total: [45, 52, 48, 55, 61, 38, 42],
            resolved: [38, 46, 42, 49, 54, 32, 36],
            pending: [7, 6, 6, 6, 7, 6, 6]
        },
        month: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            total: [280, 320, 295, 352],
            resolved: [245, 285, 268, 291],
            pending: [35, 35, 27, 61]
        },
        year: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            total: [980, 1020, 1150, 1080, 1200, 1180, 1250, 1220, 1280, 1300, 1350, 1247],
            resolved: [850, 890, 1010, 950, 1050, 1030, 1100, 1070, 1120, 1140, 1180, 1089],
            pending: [130, 130, 140, 130, 150, 150, 150, 150, 160, 160, 170, 158]
        }
    };
    
    const data = datasets[period];
    trendsChart.data.labels = data.labels;
    trendsChart.data.datasets[0].data = data.total;
    trendsChart.data.datasets[1].data = data.resolved;
    trendsChart.data.datasets[2].data = data.pending;
    trendsChart.update();
}

/* ============================================
   SEARCH & FILTER FUNCTIONALITY
   ============================================ */
function initSearchFilter() {
    const searchInput = document.getElementById('feedbackSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterFeedbackItems(searchTerm);
        }, 300));
    }
}

function filterFeedbackItems(searchTerm) {
    const items = document.querySelectorAll('.feedback-item');
    let visibleCount = 0;
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = '';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    if (searchTerm && visibleCount === 0) {
        showNotification('No feedback found matching your search', 'info');
    }
}

function applyFilters() {
    const status = document.getElementById('filterStatus').value;
    const category = document.getElementById('filterCategory').value;
    const priority = document.getElementById('filterPriority').value;
    const items = document.querySelectorAll('.feedback-item');
    
    let visibleCount = 0;
    
    items.forEach(item => {
        const itemStatus = item.getAttribute('data-status');
        const itemCategory = item.getAttribute('data-category');
        const itemPriority = item.getAttribute('data-priority');
        
        const statusMatch = status === 'all' || itemStatus === status;
        const categoryMatch = category === 'all' || itemCategory === category;
        const priorityMatch = priority === 'all' || itemPriority === priority;
        
        if (statusMatch && categoryMatch && priorityMatch) {
            item.style.display = '';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    showNotification(`Showing ${visibleCount} feedback items`, 'info');
}

function resetFilters() {
    document.getElementById('filterStatus').value = 'all';
    document.getElementById('filterCategory').value = 'all';
    document.getElementById('filterPriority').value = 'all';
    document.getElementById('feedbackSearch').value = '';
    
    const items = document.querySelectorAll('.feedback-item');
    items.forEach(item => item.style.display = '');
    
    showNotification('Filters reset', 'success');
}

/* ============================================
   VIEW SWITCHING
   ============================================ */
function switchView(view) {
    const listView = document.getElementById('feedbackListView');
    const buttons = document.querySelectorAll('.view-toggle .btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.btn').classList.add('active');
    
    if (view === 'grid') {
        listView.style.display = 'grid';
        listView.style.gridTemplateColumns = 'repeat(auto-fill, minmax(400px, 1fr))';
        listView.style.gap = '1rem';
        showNotification('Switched to grid view', 'info');
    } else {
        listView.style.display = 'flex';
        listView.style.flexDirection = 'column';
        showNotification('Switched to list view', 'info');
    }
}

/* ============================================
   FEEDBACK MANAGEMENT
   ============================================ */

// View feedback detail
function viewFeedbackDetail(id) {
    showNotification(`Opening feedback #FB-${id}...`, 'info');
    // Add your logic to show feedback detail modal or navigate to detail page
    // You can create a detailed modal showing full feedback info, history, attachments, etc.
}

// Assign feedback to team member
function assignFeedback(id) {
    // In a real app, this would open a modal to select team member
    showNotification(`Assigning feedback #FB-${id}...`, 'info');
    
    setTimeout(() => {
        showNotification('Feedback assigned successfully!', 'success');
        // Update the UI to reflect the assignment
    }, 1000);
}

// Update feedback status
function updateStatus(id) {
    // In a real app, this would open a modal to change status
    showNotification(`Updating status for #FB-${id}...`, 'info');
    
    setTimeout(() => {
        showNotification('Status updated successfully!', 'success');
        // Update the UI to reflect status change
    }, 1000);
}

// Submit new feedback
function submitFeedback() {
    const form = document.getElementById('feedbackForm');
    
    if (form.checkValidity()) {
        showNotification('Submitting feedback...', 'info');
        
        setTimeout(() => {
            showNotification('Feedback submitted successfully!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('addFeedbackModal')).hide();
            form.reset();
            
            // Add new feedback to list (in real app, this would reload or update the list)
            animateFeedbackCounters();
        }, 1500);
    } else {
        form.reportValidity();
    }
}

/* ============================================
   QUICK ACTIONS
   ============================================ */

function bulkAssign() {
    showNotification('Opening bulk assignment tool...', 'info');
    // Add logic for bulk assignment modal
}

function sendNotification() {
    showNotification('Opening notification composer...', 'info');
    // Add logic for sending notifications to citizens
}

function generateReport() {
    showNotification('Generating feedback report...', 'info');
    
    setTimeout(() => {
        showNotification('Report generated successfully!', 'success');
    }, 2000);
}

function exportData() {
    showNotification('Exporting feedback data...', 'info');
    
    setTimeout(() => {
        showNotification('Data exported to CSV!', 'success');
    }, 1500);
}

function exportFeedbackReport() {
    showNotification('Preparing comprehensive report...', 'info');
    
    setTimeout(() => {
        showNotification('Report exported successfully!', 'success');
    }, 2000);
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function animateFeedbackCounters() {
    animateCounter('totalFeedback', 0, 1247, 2000);
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

// Debounce function for search
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

// Simulate real-time feedback updates
let feedbackUpdateInterval = setInterval(() => {
    // Randomly update pending count
    const stats = [
        { id: 'totalFeedback', min: 1240, max: 1260 },
    ];
    
    // Uncomment to enable real-time simulation
    // stats.forEach(stat => {
    //     const element = document.getElementById(stat.id);
    //     if (element) {
    //         const currentValue = parseInt(element.textContent.replace(/,/g, ''));
    //         const change = Math.floor(Math.random() * 5) - 2;
    //         const newValue = Math.max(stat.min, Math.min(stat.max, currentValue + change));
    //         element.textContent = newValue.toLocaleString();
    //     }
    // });
}, 10000); // Update every 10 seconds

/* ============================================
   AUTO-PRIORITY DETECTION
   ============================================ */

// Automatically detect priority based on keywords (for future enhancement)
function detectPriority(description) {
    const urgentKeywords = ['emergency', 'urgent', 'immediate', 'critical', 'danger'];
    const highKeywords = ['broken', 'not working', 'failure', 'serious'];
    const lowKeywords = ['suggestion', 'request', 'could', 'maybe', 'consider'];
    
    const text = description.toLowerCase();
    
    if (urgentKeywords.some(keyword => text.includes(keyword))) {
        return 'urgent';
    } else if (highKeywords.some(keyword => text.includes(keyword))) {
        return 'high';
    } else if (lowKeywords.some(keyword => text.includes(keyword))) {
        return 'low';
    } else {
        return 'medium';
    }
}

// Console log
console.log('%c💬 Citizen Feedback Module Loaded', 'font-size: 14px; font-weight: bold; color: #2563eb;');
console.log('%cFeedback management system ready', 'font-size: 12px; color: #64748b;');