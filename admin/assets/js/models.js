/* ============================================
   ALL MODALS - JAVASCRIPT FUNCTIONS
   Complete functions for all modal types
   ============================================ */

// ========== TASK REQUEST MODAL FUNCTIONS ==========
function printTaskRequest() {
    console.log('Printing task request...');
    window.print();
}

function exportTaskPDF() {
    console.log('Exporting task request as PDF...');
    showNotification('Task request PDF download started', 'info');
    
    setTimeout(() => {
        showNotification('PDF exported successfully!', 'success');
    }, 2000);
}

function contactTaskTeam() {
    console.log('Contacting task team...');
    
    const teamContact = {
        name: 'Public Works Team A',
        phone: '(555) 234-5678',
        email: 'teamA@publicworks.gov'
    };
    
    alert(`Contact Task Team\n\nTeam: ${teamContact.name}\nPhone: ${teamContact.phone}\nEmail: ${teamContact.email}`);
}

// ========== MONITORING STATION MODAL FUNCTIONS ==========
function exportStationReport() {
    console.log('Exporting station report...');
    showNotification('Generating station report...', 'info');
    
    setTimeout(() => {
        showNotification('Report exported successfully!', 'success');
    }, 2000);
}

function viewStationHistory() {
    console.log('Viewing station history...');
    showNotification('Loading historical data...', 'info');
    
    setTimeout(() => {
        showNotification('Historical data loaded', 'success');
    }, 1500);
}

function updateStationSettings() {
    console.log('Updating station settings...');
    
    if (confirm('Are you sure you want to update station settings?')) {
        showNotification('Station settings updated successfully', 'success');
    }
}

// ========== WASTE COLLECTION MODAL FUNCTIONS ==========
function exportCollectionReport() {
    console.log('Exporting collection report...');
    showNotification('Generating collection report...', 'info');
    
    setTimeout(() => {
        showNotification('Collection report exported successfully!', 'success');
    }, 2000);
}

function viewRouteMap() {
    console.log('Viewing route map...');
    showNotification('Opening route map...', 'info');
    
    setTimeout(() => {
        alert('Route Map\n\nRoute: Zone D4-085\nNext Collection: Tomorrow 6:00 AM\n\nView detailed route on the main dashboard map.');
    }, 500);
}

function updateSchedule() {
    console.log('Updating collection schedule...');
    
    if (confirm('Update collection schedule for this point?')) {
        showNotification('Schedule updated successfully', 'success');
    }
}

// ========== FEEDBACK MODAL FUNCTIONS ==========
function printFeedback() {
    console.log('Printing feedback...');
    window.print();
}

function exportFeedback() {
    console.log('Exporting feedback...');
    showNotification('Exporting feedback data...', 'info');
    
    setTimeout(() => {
        showNotification('Feedback exported successfully!', 'success');
    }, 2000);
}

function forwardFeedback() {
    console.log('Forwarding feedback...');
    
    const email = prompt('Enter email address to forward feedback:');
    if (email) {
        showNotification(`Feedback forwarded to ${email}`, 'success');
    }
}

function reopenFeedback() {
    console.log('Reopening feedback case...');
    
    if (confirm('Are you sure you want to reopen this feedback case?')) {
        showNotification('Feedback case reopened successfully', 'success');
    }
}

// ========== SHARED MODAL FUNCTIONS ==========
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
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
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

// ========== MODAL INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeModalHandlers();
});

function initializeModalHandlers() {
    // Handle all modal shown events
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            console.log('Modal shown:', this.id);
            // Add fade-in animation to content
            const modalBody = this.querySelector('.modal-body');
            if (modalBody) {
                modalBody.classList.add('fade-in');
            }
        });
        
        modal.addEventListener('hidden.bs.modal', function() {
            console.log('Modal hidden:', this.id);
        });
    });
    
    // Handle escape key for all modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            });
        }
    });
}

// ========== UTILITY FUNCTIONS ==========
function closeModal(modalId) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    if (modal) {
        modal.hide();
    }
}

function openModal(modalId) {
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
}

function refreshModalContent(modalId, callback) {
    const modalBody = document.querySelector(`#${modalId} .modal-body`);
    if (modalBody) {
        // Show loading state
        const originalContent = modalBody.innerHTML;
        modalBody.innerHTML = `
            <div class="text-center p-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-muted">Refreshing data...</p>
            </div>
        `;
        
        setTimeout(() => {
            if (callback && typeof callback === 'function') {
                callback();
            } else {
                modalBody.innerHTML = originalContent;
            }
            showNotification('Content refreshed successfully', 'success');
        }, 1000);
    }
}

// ========== DATA LOADING FUNCTIONS ==========
function loadTaskRequestData(taskId) {
    console.log('Loading task request data:', taskId);
    // Implement API call here
    return {
        id: taskId,
        title: 'Road Repair - Pothole on Main Street',
        status: 'In Progress',
        priority: 'High',
        progress: 65,
        // ... more data
    };
}

function loadMonitoringStationData(stationId) {
    console.log('Loading monitoring station data:', stationId);
    // Implement API call here
    return {
        id: stationId,
        name: 'Power Grid Station - District 5',
        status: 'Online',
        uptime: 99.8,
        // ... more data
    };
}

function loadWasteCollectionData(collectionId) {
    console.log('Loading waste collection data:', collectionId);
    // Implement API call here
    return {
        id: collectionId,
        name: 'Collection Point - Oak Street Zone',
        fillLevel: 75,
        status: 'Active',
        // ... more data
    };
}

function loadFeedbackData(feedbackId) {
    console.log('Loading feedback data:', feedbackId);
    // Implement API call here
    return {
        id: feedbackId,
        subject: 'Excellent Service Quality',
        rating: 5.0,
        sentiment: 'Positive',
        // ... more data
    };
}

// ========== EXPORT FUNCTIONS ==========
function exportToCSV(data, filename) {
    console.log('Exporting to CSV:', filename);
    
    const csv = convertArrayToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('CSV exported successfully', 'success');
}

function convertArrayToCSV(data) {
    const array = typeof data !== 'object' ? JSON.parse(data) : data;
    let csv = '';
    
    // Get headers
    const headers = Object.keys(array[0]);
    csv += headers.join(',') + '\n';
    
    // Get rows
    array.forEach(row => {
        const values = headers.map(header => {
            const value = row[header];
            return typeof value === 'string' ? `"${value}"` : value;
        });
        csv += values.join(',') + '\n';
    });
    
    return csv;
}

// ========== VALIDATION FUNCTIONS ==========
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
    
    return isValid;
}

// ========== COPY TO CLIPBOARD ==========
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy', 'danger');
    }
    
    document.body.removeChild(textArea);
}

// ========== FORMATTING FUNCTIONS ==========
function formatDate(date, format = 'short') {
    const d = new Date(date);
    const options = format === 'short' 
        ? { month: 'short', day: 'numeric', year: 'numeric' }
        : { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return d.toLocaleDateString('en-US', options);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(num, currency = '$') {
    return currency + formatNumber(num.toFixed(2));
}

// ========== ANIMATION HELPERS ==========
function animateProgressBar(elementId, targetValue, duration = 1000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const progressBar = element.querySelector('.progress-bar');
    if (!progressBar) return;
    
    let currentValue = 0;
    const increment = targetValue / (duration / 16);
    
    const animation = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            progressBar.style.width = targetValue + '%';
            clearInterval(animation);
        } else {
            progressBar.style.width = currentValue + '%';
        }
    }, 16);
}

function animateCounter(elementId, start, end, duration = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = formatNumber(value);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ========== DEBOUNCE FUNCTION ==========
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

// ========== CONSOLE LOG ==========
console.log('All Modal Functions Loaded Successfully');