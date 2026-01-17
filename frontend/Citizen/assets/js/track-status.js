/* ============================================
   TRACK STATUS PAGE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initTrackStatusPage();
});

function initTrackStatusPage() {
    initSearchFilter();
    initRefreshButton();
    initClearFilters();
    loadRequestsData();
}

// Sample request data (replace with API call)
const requestsData = [
    {
        id: 'REQ-1045',
        category: 'road_repair',
        title: 'Pothole on Main Street',
        description: 'Large pothole causing traffic issues',
        location: 'Main Street & 5th Avenue',
        status: 'in_progress',
        priority: 'high',
        date: 'Jan 15, 2026',
        progress: 60,
        progressText: 'Team assigned'
    },
    {
        id: 'REQ-1044',
        category: 'street_light',
        title: 'Broken street light near park',
        description: 'Street light not working',
        location: 'Central Park, North Entrance',
        status: 'resolved',
        priority: 'medium',
        date: 'Jan 12, 2026',
        progress: 100,
        progressText: 'Resolved on Jan 14, 2026',
        resolvedDate: 'Jan 14, 2026'
    },
    {
        id: 'REQ-1043',
        category: 'waste',
        title: 'Missed garbage pickup',
        description: 'Scheduled garbage collection was missed',
        location: 'Oak Street, Block 12',
        status: 'resolved',
        priority: 'low',
        date: 'Jan 10, 2026',
        progress: 100,
        progressText: 'Resolved on Jan 11, 2026',
        resolvedDate: 'Jan 11, 2026'
    },
    {
        id: 'REQ-1042',
        category: 'water',
        title: 'Low water pressure issue',
        description: 'Experiencing reduced water pressure',
        location: 'Maple Avenue, Units 50-60',
        status: 'in_progress',
        priority: 'high',
        date: 'Jan 8, 2026',
        progress: 40,
        progressText: 'Investigation ongoing'
    },
    {
        id: 'REQ-1041',
        category: 'noise',
        title: 'Construction noise disturbance',
        description: 'Excessive noise during restricted hours',
        location: 'Downtown, Block 8',
        status: 'resolved',
        priority: 'medium',
        date: 'Jan 5, 2026',
        progress: 100,
        progressText: 'Resolved on Jan 7, 2026',
        resolvedDate: 'Jan 7, 2026'
    },
    {
        id: 'REQ-1040',
        category: 'traffic',
        title: 'Malfunctioning traffic light',
        description: 'Traffic signal stuck on red',
        location: '3rd Street & Washington Ave',
        status: 'pending',
        priority: 'high',
        date: 'Jan 3, 2026',
        progress: 10,
        progressText: 'Awaiting assignment'
    }
];

// Load requests data
function loadRequestsData() {
    console.log('Loaded', requestsData.length, 'requests');
    updateStatistics();
}

// Update statistics
function updateStatistics() {
    const stats = {
        total: requestsData.length,
        inProgress: requestsData.filter(r => r.status === 'in_progress').length,
        resolved: requestsData.filter(r => r.status === 'resolved').length,
        pending: requestsData.filter(r => r.status === 'pending').length
    };

    document.querySelector('.stat-card.stat-primary .stat-value').textContent = stats.total;
    document.querySelector('.stat-card.stat-warning .stat-value').textContent = stats.inProgress;
    document.querySelector('.stat-card.stat-success .stat-value').textContent = stats.resolved;
    document.querySelector('.stat-card.stat-info .stat-value').textContent = stats.pending;
}

// Initialize search and filter
function initSearchFilter() {
    const searchInput = document.getElementById('searchRequest');
    const statusFilter = document.getElementById('statusFilter');
    const categoryFilter = document.getElementById('categoryFilter');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            filterRequests();
        }, 300));
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterRequests();
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterRequests();
        });
    }
}

// Filter requests
function filterRequests() {
    const searchTerm = document.getElementById('searchRequest').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    const cards = document.querySelectorAll('.request-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        const cardStatus = card.querySelector('.badge').textContent.toLowerCase().replace(' ', '_');
        const cardCategory = card.querySelector('.request-category span').textContent.toLowerCase().replace(' ', '_');

        let matchSearch = searchTerm === '' || cardText.includes(searchTerm);
        let matchStatus = statusFilter === 'all' || cardStatus.includes(statusFilter.replace('_', ' '));
        let matchCategory = categoryFilter === 'all' || cardCategory.includes(categoryFilter.replace('_', ' '));

        if (matchSearch && matchStatus && matchCategory) {
            card.closest('.col-lg-6').style.display = '';
            visibleCount++;
        } else {
            card.closest('.col-lg-6').style.display = 'none';
        }
    });

    // Show empty state if no results
    showEmptyState(visibleCount === 0);
}

// Show empty state
function showEmptyState(show) {
    let emptyState = document.getElementById('emptyState');
    
    if (show) {
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.id = 'emptyState';
            emptyState.className = 'col-12';
            emptyState.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-inbox"></i>
                    <h4>No Requests Found</h4>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            document.getElementById('requestsContainer').appendChild(emptyState);
        }
    } else {
        if (emptyState) {
            emptyState.remove();
        }
    }
}

// Debounce function
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

// Initialize refresh button
function initRefreshButton() {
    const refreshBtn = document.getElementById('refreshBtn');
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const originalText = this.innerHTML;
            
            // Add spinning animation
            icon.style.animation = 'spin 1s linear';
            this.disabled = true;
            
            // Simulate refresh
            setTimeout(() => {
                icon.style.animation = '';
                this.disabled = false;
                showNotification('Requests updated successfully', 'success');
                loadRequestsData();
            }, 1000);
        });
    }
}

// Initialize clear filters
function initClearFilters() {
    const clearBtn = document.getElementById('clearFilters');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            document.getElementById('searchRequest').value = '';
            document.getElementById('statusFilter').value = 'all';
            document.getElementById('categoryFilter').value = 'all';
            filterRequests();
            showNotification('Filters cleared', 'info');
        });
    }
}

// View request details
function viewDetails(requestId) {
    const request = requestsData.find(r => r.id === requestId);
    
    if (!request) {
        showNotification('Request not found', 'danger');
        return;
    }

    const modalBody = document.getElementById('modalBodyContent');
    
    // Status badge color
    let statusBadgeClass = 'badge-info';
    if (request.status === 'resolved') statusBadgeClass = 'badge-success';
    else if (request.status === 'in_progress') statusBadgeClass = 'badge-warning';
    else if (request.status === 'rejected') statusBadgeClass = 'badge-danger';

    // Priority badge color
    let priorityBadgeClass = 'badge-info';
    if (request.priority === 'high') priorityBadgeClass = 'badge-danger';
    else if (request.priority === 'medium') priorityBadgeClass = 'badge-warning';

    // Progress bar color
    let progressBarClass = 'bg-info';
    if (request.status === 'resolved') progressBarClass = 'bg-success';
    else if (request.status === 'in_progress') progressBarClass = 'bg-warning';

    modalBody.innerHTML = `
        <div class="request-detail-content">
            <div class="row mb-4">
                <div class="col-md-6">
                    <h6 class="text-muted mb-2">Request ID</h6>
                    <p style="font-family: 'Courier New', monospace; font-size: 1.125rem; font-weight: 600; color: var(--primary-color);">${request.id}</p>
                </div>
                <div class="col-md-6">
                    <h6 class="text-muted mb-2">Status</h6>
                    <span class="badge ${statusBadgeClass}">${request.status.replace('_', ' ').toUpperCase()}</span>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-md-6">
                    <h6 class="text-muted mb-2">Category</h6>
                    <p style="color: var(--text-primary);">${request.category.replace('_', ' ')}</p>
                </div>
                <div class="col-md-6">
                    <h6 class="text-muted mb-2">Priority</h6>
                    <span class="badge ${priorityBadgeClass}">${request.priority.toUpperCase()}</span>
                </div>
            </div>

            <div class="mb-4">
                <h6 class="text-muted mb-2">Title</h6>
                <p style="font-size: 1.125rem; font-weight: 600; color: var(--text-primary);">${request.title}</p>
            </div>

            <div class="mb-4">
                <h6 class="text-muted mb-2">Description</h6>
                <p style="color: var(--text-secondary);">${request.description}</p>
            </div>

            <div class="mb-4">
                <h6 class="text-muted mb-2">Location</h6>
                <p style="color: var(--text-primary);"><i class="bi bi-geo-alt text-danger me-2"></i>${request.location}</p>
            </div>

            <div class="mb-4">
                <h6 class="text-muted mb-2">Submitted Date</h6>
                <p style="color: var(--text-primary);"><i class="bi bi-calendar me-2"></i>${request.date}</p>
            </div>

            <div class="mb-4">
                <h6 class="text-muted mb-2">Progress</h6>
                <div class="progress-bar-container">
                    <div class="progress-label mb-2">
                        <span style="color: var(--text-primary);">${request.progress}%</span>
                        <span style="color: var(--text-tertiary);">${request.progressText}</span>
                    </div>
                    <div class="progress" style="height: 10px;">
                        <div class="progress-bar ${progressBarClass}" style="width: ${request.progress}%"></div>
                    </div>
                </div>
            </div>

            ${request.resolvedDate ? `
            <div class="mb-4">
                <h6 class="text-muted mb-2">Resolved Date</h6>
                <p style="color: var(--success-color); font-weight: 600;"><i class="bi bi-check-circle me-2"></i>${request.resolvedDate}</p>
            </div>
            ` : ''}

            <div class="mb-4">
                <h6 class="text-muted mb-2">Timeline</h6>
                <div class="timeline">
                    <div class="timeline-item completed">
                        <div class="timeline-content">
                            <div class="timeline-title">Request Submitted</div>
                            <div class="timeline-time">${request.date}</div>
                        </div>
                    </div>
                    ${request.status !== 'pending' ? `
                    <div class="timeline-item completed">
                        <div class="timeline-content">
                            <div class="timeline-title">Request Reviewed</div>
                            <div class="timeline-time">${request.date}</div>
                        </div>
                    </div>
                    ` : ''}
                    ${request.status === 'in_progress' || request.status === 'resolved' ? `
                    <div class="timeline-item ${request.status === 'resolved' ? 'completed' : ''}">
                        <div class="timeline-content">
                            <div class="timeline-title">Work in Progress</div>
                            <div class="timeline-time">${request.progressText}</div>
                        </div>
                    </div>
                    ` : ''}
                    ${request.status === 'resolved' ? `
                    <div class="timeline-item completed">
                        <div class="timeline-content">
                            <div class="timeline-title">Request Resolved</div>
                            <div class="timeline-time">${request.resolvedDate}</div>
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>

            <div class="d-flex gap-2">
                <button class="btn btn-outline-primary" onclick="printRequest('${request.id}')">
                    <i class="bi bi-printer"></i> Print
                </button>
                <button class="btn btn-outline-primary" onclick="downloadRequest('${request.id}')">
                    <i class="bi bi-download"></i> Download
                </button>
            </div>
        </div>
    `;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('requestDetailModal'));
    modal.show();
}

// Print request
function printRequest(requestId) {
    console.log('Printing request:', requestId);
    showNotification('Print functionality will be implemented', 'info');
}

// Download request
function downloadRequest(requestId) {
    console.log('Downloading request:', requestId);
    showNotification('Download functionality will be implemented', 'info');
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

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('Track Status JavaScript Loaded');