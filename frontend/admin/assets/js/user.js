/* ============================================
   USERS MANAGEMENT PAGE - JAVASCRIPT
   Add this to your page or create users.js
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initUserCharts();
    initSearchFilter();
    updateUserCounts();
});

/* ============================================
   CHARTS INITIALIZATION
   ============================================ */
let userGrowthChart, roleDistributionChart;

function initUserCharts() {
    // User Growth Chart
    const growthCtx = document.getElementById('userGrowthChart').getContext('2d');
    userGrowthChart = new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Total Users',
                data: [95, 102, 108, 115, 122, 128, 135, 140, 145, 150, 153, 156],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
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
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return value + ' users';
                        }
                    }
                }
            }
        }
    });
    
    // Role Distribution Chart
    const roleCtx = document.getElementById('roleDistributionChart').getContext('2d');
    roleDistributionChart = new Chart(roleCtx, {
        type: 'doughnut',
        data: {
            labels: ['Admin', 'Manager', 'Staff', 'Viewer'],
            datasets: [{
                data: [12, 35, 89, 20],
                backgroundColor: [
                    '#ef4444',
                    '#2563eb',
                    '#10b981',
                    '#64748b'
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

/* ============================================
   SEARCH & FILTER FUNCTIONALITY
   ============================================ */
function initSearchFilter() {
    const searchInput = document.getElementById('userSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterUsers(searchTerm);
        }, 300));
    }
}

function filterUsers(searchTerm = '') {
    const role = document.getElementById('filterRole').value;
    const status = document.getElementById('filterStatus').value;
    const department = document.getElementById('filterDepartment').value;
    const rows = document.querySelectorAll('.user-row');
    
    let visibleCount = 0;
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const rowRole = row.getAttribute('data-role');
        const rowStatus = row.getAttribute('data-status');
        const rowDepartment = row.getAttribute('data-department');
        
        const searchMatch = !searchTerm || text.includes(searchTerm);
        const roleMatch = role === 'all' || rowRole === role;
        const statusMatch = status === 'all' || rowStatus === status;
        const departmentMatch = department === 'all' || rowDepartment === department;
        
        if (searchMatch && roleMatch && statusMatch && departmentMatch) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    document.getElementById('showingCount').textContent = visibleCount;
    
    if (visibleCount === 0) {
        showNotification('No users found matching your criteria', 'info');
    }
}

function applyUserFilters() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    filterUsers(searchTerm);
}

function resetUserFilters() {
    document.getElementById('filterRole').value = 'all';
    document.getElementById('filterStatus').value = 'all';
    document.getElementById('filterDepartment').value = 'all';
    document.getElementById('userSearch').value = '';
    
    const rows = document.querySelectorAll('.user-row');
    rows.forEach(row => row.style.display = '');
    
    updateUserCounts();
    showNotification('Filters reset', 'success');
}

function updateUserCounts() {
    const rows = document.querySelectorAll('.user-row');
    const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');
    document.getElementById('showingCount').textContent = visibleRows.length;
}

/* ============================================
   SELECT ALL FUNCTIONALITY
   ============================================ */
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(cb => {
        const row = cb.closest('.user-row');
        if (row.style.display !== 'none') {
            cb.checked = checkbox.checked;
        }
    });
}

function getSelectedUsers() {
    const checkboxes = document.querySelectorAll('.user-checkbox:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

/* ============================================
   USER MANAGEMENT ACTIONS
   ============================================ */

// Add new user
function addNewUser() {
    const form = document.getElementById('addUserForm');
    
    if (form.checkValidity()) {
        showNotification('Creating user account...', 'info');
        
        setTimeout(() => {
            showNotification('User created successfully!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
            form.reset();
            
            // Update counter
            const totalUsers = document.getElementById('totalUsers');
            const currentCount = parseInt(totalUsers.textContent);
            totalUsers.textContent = currentCount + 1;
        }, 1500);
    } else {
        form.reportValidity();
    }
}

// View user details
function viewUser(userId) {
    showNotification(`Loading user #${userId} details...`, 'info');
    
    // In real app, fetch user data from API
    setTimeout(() => {
        const modal = new bootstrap.Modal(document.getElementById('viewUserModal'));
        modal.show();
    }, 500);
}

// Edit user
function editUser(userId) {
    showNotification(`Opening editor for user #${userId}...`, 'info');
    // In real app, open edit modal with user data
}

// Delete user
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        showNotification('Deleting user...', 'info');
        
        setTimeout(() => {
            showNotification('User deleted successfully', 'success');
            // Remove row from table
            // Update counters
        }, 1000);
    }
}

// Reset password
function resetPassword(userId) {
    if (confirm('Send password reset link to this user?')) {
        showNotification('Sending password reset email...', 'info');
        
        setTimeout(() => {
            showNotification('Password reset link sent successfully!', 'success');
        }, 1500);
    }
}

// View activity
function viewActivity(userId) {
    showNotification(`Loading activity log for user #${userId}...`, 'info');
    // In real app, open activity modal
}

// Activate user
function activateUser(userId) {
    if (confirm('Activate this user account?')) {
        showNotification('Activating user...', 'info');
        
        setTimeout(() => {
            showNotification('User activated successfully!', 'success');
            // Update status badge in table
        }, 1000);
    }
}

// Resend invite
function resendInvite(userId) {
    showNotification('Resending invitation...', 'info');
    
    setTimeout(() => {
        showNotification('Invitation email sent!', 'success');
    }, 1500);
}

// Cancel invite
function cancelInvite(userId) {
    if (confirm('Cancel this invitation?')) {
        showNotification('Cancelling invitation...', 'info');
        
        setTimeout(() => {
            showNotification('Invitation cancelled', 'success');
            // Remove row from table
        }, 1000);
    }
}

/* ============================================
   BULK ACTIONS
   ============================================ */
function bulkAction(action) {
    const selectedUsers = getSelectedUsers();
    
    if (selectedUsers.length === 0) {
        showNotification('Please select at least one user', 'warning');
        return;
    }
    
    let confirmMessage = '';
    let successMessage = '';
    
    switch(action) {
        case 'activate':
            confirmMessage = `Activate ${selectedUsers.length} selected user(s)?`;
            successMessage = 'Users activated successfully';
            break;
        case 'suspend':
            confirmMessage = `Suspend ${selectedUsers.length} selected user(s)?`;
            successMessage = 'Users suspended successfully';
            break;
        case 'delete':
            confirmMessage = `Delete ${selectedUsers.length} selected user(s)? This action cannot be undone.`;
            successMessage = 'Users deleted successfully';
            break;
    }
    
    if (confirm(confirmMessage)) {
        showNotification(`Processing ${selectedUsers.length} user(s)...`, 'info');
        
        setTimeout(() => {
            showNotification(successMessage, 'success');
            // Uncheck all checkboxes
            document.getElementById('selectAll').checked = false;
            document.querySelectorAll('.user-checkbox').forEach(cb => cb.checked = false);
        }, 2000);
    }
}

/* ============================================
   EXPORT FUNCTIONALITY
   ============================================ */
function exportUsers() {
    showNotification('Preparing user data export...', 'info');
    
    setTimeout(() => {
        showNotification('Users exported to CSV successfully!', 'success');
        
        // Simulate download
        // In real app, generate and download CSV file
    }, 2000);
}

/* ============================================
   PAGINATION
   ============================================ */
function changePageSize(size) {
    showNotification(`Showing ${size} users per page`, 'info');
    // In real app, reload table with new page size
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
   COUNTER ANIMATION
   ============================================ */
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

// Animate total users counter on load
setTimeout(() => {
    animateCounter('totalUsers', 0, 156, 2000);
}, 100);

/* ============================================
   AUTO-REFRESH SIMULATION
   ============================================ */

// Update online status randomly (simulation)
setInterval(() => {
    // Uncomment to enable real-time simulation
    // const onlineIndicators = document.querySelectorAll('.text-success i.bi-circle-fill');
    // onlineIndicators.forEach(indicator => {
    //     if (Math.random() > 0.9) {
    //         indicator.parentElement.innerHTML = '<span class="text-muted"><i class="bi bi-circle-fill" style="font-size: 0.5rem;"></i> Offline</span>';
    //     }
    // });
}, 30000); // Every 30 seconds

// Console log
console.log('%c👥 Users Management Module Loaded', 'font-size: 14px; font-weight: bold; color: #2563eb;');
console.log('%cUser administration system ready', 'font-size: 12px; color: #64748b;');