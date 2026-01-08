/* ============================================
   ALERTS PAGE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initAlertsPage();
});

function initAlertsPage() {
    initAlertTabs();
    initMarkAllRead();
    initAlertSettings();
    initLoadMore();
}

// Initialize alert tabs
function initAlertTabs() {
    const tabs = document.querySelectorAll('.alert-tabs .nav-link');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter alerts
            const filter = this.getAttribute('data-filter');
            filterAlerts(filter);
        });
    });
}

// Filter alerts
function filterAlerts(filter) {
    const alerts = document.querySelectorAll('#alertsContainer > div');
    let visibleCount = 0;
    
    alerts.forEach(alert => {
        const type = alert.getAttribute('data-type');
        const read = alert.getAttribute('data-read');
        
        let show = false;
        
        if (filter === 'all') {
            show = true;
        } else if (filter === 'unread') {
            show = read === 'false';
        } else {
            show = type === filter;
        }
        
        if (show) {
            alert.style.display = '';
            visibleCount++;
        } else {
            alert.style.display = 'none';
        }
    });
    
    showEmptyState(visibleCount === 0);
}

// Show empty state
function showEmptyState(show) {
    let emptyState = document.getElementById('alertsEmptyState');
    
    if (show) {
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.id = 'alertsEmptyState';
            emptyState.className = 'col-12';
            emptyState.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-bell-slash"></i>
                    <h4>No Alerts Found</h4>
                    <p>No alerts match the selected filter</p>
                </div>
            `;
            document.getElementById('alertsContainer').appendChild(emptyState);
        }
    } else {
        if (emptyState) {
            emptyState.remove();
        }
    }
}

// Initialize mark all read
function initMarkAllRead() {
    const markAllBtn = document.getElementById('markAllReadBtn');
    
    if (markAllBtn) {
        markAllBtn.addEventListener('click', function() {
            const unreadAlerts = document.querySelectorAll('[data-read="false"]');
            
            if (unreadAlerts.length === 0) {
                showNotification('All alerts are already marked as read', 'info');
                return;
            }
            
            // Mark all as read
            unreadAlerts.forEach(alert => {
                alert.setAttribute('data-read', 'true');
                const alertItem = alert.querySelector('.alert-item');
                if (alertItem) {
                    alertItem.classList.add('alert-read');
                }
                
                // Remove unread badge
                const unreadBadge = alert.querySelector('.badge-outline-danger');
                if (unreadBadge) {
                    unreadBadge.remove();
                }
                
                // Remove mark read button
                const markReadBtn = alert.querySelector('button[onclick*="markAsRead"]');
                if (markReadBtn) {
                    markReadBtn.remove();
                }
            });
            
            // Update stats
            updateAlertStats();
            
            showNotification(`${unreadAlerts.length} alerts marked as read`, 'success');
        });
    }
}

// Mark single alert as read
function markAsRead(alertId) {
    const alertElements = document.querySelectorAll('#alertsContainer > div');
    
    alertElements.forEach(alert => {
        const viewBtn = alert.querySelector(`button[onclick*="${alertId}"]`);
        if (viewBtn) {
            alert.setAttribute('data-read', 'true');
            const alertItem = alert.querySelector('.alert-item');
            if (alertItem) {
                alertItem.classList.add('alert-read');
            }
            
            // Remove unread badge
            const unreadBadge = alert.querySelector('.badge-outline-danger');
            if (unreadBadge) {
                unreadBadge.remove();
            }
            
            // Remove mark read button
            const markReadBtn = alert.querySelector(`button[onclick="markAsRead('${alertId}')"]`);
            if (markReadBtn) {
                markReadBtn.remove();
            }
        }
    });
    
    updateAlertStats();
    showNotification('Alert marked as read', 'success');
}

// Update alert statistics
function updateAlertStats() {
    const critical = document.querySelectorAll('[data-type="critical"]').length;
    const warning = document.querySelectorAll('[data-type="warning"]').length;
    const info = document.querySelectorAll('[data-type="info"]').length;
    const resolved = document.querySelectorAll('[data-type="resolved"]').length;
    
    document.querySelector('.stat-card.stat-danger .stat-value').textContent = critical;
    document.querySelector('.stat-card.stat-warning .stat-value').textContent = warning;
    document.querySelector('.stat-card.stat-info .stat-value').textContent = info;
    document.querySelector('.stat-card.stat-success .stat-value').textContent = resolved;
}

// View alert detail
function viewAlertDetail(alertId) {
    const modalBody = document.getElementById('alertModalBody');
    
    // Sample alert details
    const alertDetails = {
        'ALT-001': {
            title: 'Emergency: Power Outage in District 7',
            type: 'Critical',
            time: '5 minutes ago',
            location: 'District 7, Zones A-C',
            category: 'Utilities',
            description: 'Major power outage affecting approximately 10,000 residents. Restoration crews have been dispatched and are working to restore service as quickly as possible.',
            updates: [
                '5 minutes ago: Outage reported, crews dispatched',
                '10 minutes ago: Cause identified as transformer failure',
                '15 minutes ago: Estimated restoration time: 3-4 hours'
            ],
            actions: 'Emergency services are on standby. Residents are advised to conserve battery power and avoid using candles.'
        }
    };
    
    const alert = alertDetails[alertId] || {
        title: 'Alert Details',
        type: 'Information',
        time: 'Recently',
        location: 'City Wide',
        category: 'General',
        description: 'Alert details and updates will be displayed here.',
        updates: ['Alert information is being processed'],
        actions: 'Stay tuned for more information.'
    };
    
    modalBody.innerHTML = `
        <div class="alert-detail-content">
            <div class="alert-detail-header">
                <h3 class="alert-detail-title">${alert.title}</h3>
                <div class="alert-detail-meta">
                    <div class="alert-detail-meta-item">
                        <i class="bi bi-exclamation-octagon text-danger"></i>
                        <span>${alert.type}</span>
                    </div>
                    <div class="alert-detail-meta-item">
                        <i class="bi bi-clock"></i>
                        <span>${alert.time}</span>
                    </div>
                    <div class="alert-detail-meta-item">
                        <i class="bi bi-geo-alt"></i>
                        <span>${alert.location}</span>
                    </div>
                    <div class="alert-detail-meta-item">
                        <i class="bi bi-tag"></i>
                        <span>${alert.category}</span>
                    </div>
                </div>
            </div>
            
            <div class="alert-detail-body">
                <h6>Description</h6>
                <p>${alert.description}</p>
                
                <h6>Recent Updates</h6>
                <ul>
                    ${alert.updates.map(update => `<li>${update}</li>`).join('')}
                </ul>
                
                <h6>Recommended Actions</h6>
                <p>${alert.actions}</p>
                
                <h6>Contact Information</h6>
                <p>For emergencies, call 911. For non-emergency inquiries, contact City Services at (555) 123-4567.</p>
            </div>
            
            <div class="d-flex gap-2 mt-4">
                <button class="btn btn-primary" onclick="subscribeToAlert('${alertId}')">
                    <i class="bi bi-bell"></i> Subscribe to Updates
                </button>
                <button class="btn btn-outline-primary" onclick="shareAlert('${alertId}')">
                    <i class="bi bi-share"></i> Share
                </button>
                <button class="btn btn-outline-secondary" onclick="printAlert()">
                    <i class="bi bi-printer"></i> Print
                </button>
            </div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('alertDetailModal'));
    modal.show();
}

// Subscribe to alert updates
function subscribeToAlert(alertId) {
    console.log('Subscribing to alert:', alertId);
    showNotification('Successfully subscribed to alert updates', 'success');
}

// Share alert
function shareAlert(alertId) {
    console.log('Sharing alert:', alertId);
    showNotification('Alert link copied to clipboard', 'success');
}

// Print alert
function printAlert() {
    window.print();
}

// Initialize alert settings
function initAlertSettings() {
    const settingsBtn = document.getElementById('alertSettingsBtn');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('alertSettingsModal'));
            modal.show();
        });
    }
}

// Save alert settings
function saveAlertSettings() {
    const criticalAlerts = document.getElementById('criticalAlerts').checked;
    const warningAlerts = document.getElementById('warningAlerts').checked;
    const infoAlerts = document.getElementById('infoAlerts').checked;
    const emailNotif = document.getElementById('emailNotif').checked;
    const smsNotif = document.getElementById('smsNotif').checked;
    const pushNotif = document.getElementById('pushNotif').checked;
    
    const settings = {
        criticalAlerts,
        warningAlerts,
        infoAlerts,
        emailNotif,
        smsNotif,
        pushNotif
    };
    
    console.log('Saving alert settings:', settings);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('alertSettingsModal'));
    modal.hide();
    
    showNotification('Alert settings saved successfully', 'success');
}

// Initialize load more
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
            this.disabled = true;
            
            // Simulate loading
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                showNotification('No more alerts to load', 'info');
            }, 1000);
        });
    }
}

// Show notification
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

console.log('Alerts JavaScript Loaded');