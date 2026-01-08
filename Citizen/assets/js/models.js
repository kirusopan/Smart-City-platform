/* ============================================
   MODAL SHARED FUNCTIONS - JAVASCRIPT
   Functions for both announcement and request modals
   ============================================ */

// Print Request/Announcement
function printRequest(id) {
    console.log('Printing:', id);
    window.print();
}

function printAnnouncement(id) {
    console.log('Printing announcement:', id);
    window.print();
}

// Download Request/Announcement
function downloadRequest(id) {
    console.log('Downloading:', id);
    showNotification('Download started. PDF will be ready shortly.', 'info');
    
    // Simulate download
    setTimeout(() => {
        showNotification('Download completed successfully!', 'success');
    }, 2000);
}

// Contact Support
function contactSupport(id) {
    console.log('Contacting support for:', id);
    showNotification('Redirecting to support...', 'info');
    
    setTimeout(() => {
        alert('Support Contact\n\nPhone: (555) 123-4567\nEmail: support@smartcity.gov\n\nReference: ' + id);
    }, 500);
}

// Subscribe to Updates
function subscribeToUpdates(id) {
    console.log('Subscribing to updates:', id);
    
    // Show confirmation
    if (confirm('Would you like to receive email and SMS notifications for this announcement?')) {
        showNotification('Successfully subscribed to updates!', 'success');
    }
}

// Share Announcement/Request
function shareAnnouncement(id) {
    console.log('Sharing:', id);
    
    const url = window.location.href + '?ref=' + id;
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'Smart City Announcement',
            text: 'Check out this announcement from Smart City',
            url: url
        }).then(() => {
            showNotification('Shared successfully!', 'success');
        }).catch((error) => {
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

// Copy to Clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

// Fallback Copy Method
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Link copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy link', 'danger');
    }
    
    document.body.removeChild(textArea);
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
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
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

// View Details - Generic Function
function viewDetails(id) {
    console.log('Viewing details for:', id);
    
    // Determine if it's a request or announcement
    if (id.startsWith('REQ-')) {
        viewRequestDetail(id);
    } else if (id.startsWith('ANN-')) {
        viewAnnouncementDetail(id);
    }
}

// View Request Detail
function viewRequestDetail(requestId) {
    const modal = new bootstrap.Modal(document.getElementById('requestDetailModal'));
    modal.show();
}

// Close Modal
function closeModal(modalId) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    if (modal) {
        modal.hide();
    }
}

// Refresh Modal Content
function refreshModalContent(modalId) {
    const modalBody = document.querySelector(`#${modalId} .modal-body`);
    if (modalBody) {
        const originalContent = modalBody.innerHTML;
        modalBody.innerHTML = '<div class="text-center p-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';
        
        setTimeout(() => {
            modalBody.innerHTML = originalContent;
            showNotification('Content refreshed', 'success');
        }, 1000);
    }
}

// Initialize Modal Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    
    // Handle modal shown event
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            console.log('Modal shown:', this.id);
        });
        
        modal.addEventListener('hidden.bs.modal', function() {
            console.log('Modal hidden:', this.id);
        });
    });
    
    // Handle escape key
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
    
});

console.log('Modal Shared Functions Loaded');