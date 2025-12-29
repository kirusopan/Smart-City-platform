/* ============================================
   MY COMPLAINTS PAGE - JAVASCRIPT
   Add this to your page
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initComplaintSearch();
    initStarRating();
});

/* ============================================
   SEARCH & FILTER
   ============================================ */
function initComplaintSearch() {
    const searchInput = document.getElementById('complaintSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterComplaints(searchTerm);
        }, 300));
    }
}

function filterComplaints(searchTerm) {
    const complaints = document.querySelectorAll('.complaint-card');
    let visibleCount = 0;
    
    complaints.forEach(complaint => {
        const text = complaint.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            complaint.style.display = '';
            visibleCount++;
        } else {
            complaint.style.display = 'none';
        }
    });
    
    toggleEmptyState(visibleCount === 0);
}

function applyComplaintFilters() {
    const status = document.getElementById('filterStatus').value;
    const category = document.getElementById('filterCategory').value;
    const complaints = document.querySelectorAll('.complaint-card');
    
    let visibleCount = 0;
    
    complaints.forEach(complaint => {
        const complaintStatus = complaint.getAttribute('data-status');
        const complaintCategory = complaint.getAttribute('data-category');
        
        const statusMatch = status === 'all' || complaintStatus === status;
        const categoryMatch = category === 'all' || complaintCategory === category;
        
        if (statusMatch && categoryMatch) {
            complaint.style.display = '';
            visibleCount++;
        } else {
            complaint.style.display = 'none';
        }
    });
    
    toggleEmptyState(visibleCount === 0);
    showNotification(`Showing ${visibleCount} complaint${visibleCount !== 1 ? 's' : ''}`, 'info');
}

function resetComplaintFilters() {
    document.getElementById('filterStatus').value = 'all';
    document.getElementById('filterCategory').value = 'all';
    document.getElementById('sortBy').value = 'newest';
    document.getElementById('complaintSearch').value = '';
    
    const complaints = document.querySelectorAll('.complaint-card');
    complaints.forEach(complaint => complaint.style.display = '');
    
    toggleEmptyState(false);
    showNotification('Filters reset', 'success');
}

function sortComplaints(sortBy) {
    const container = document.querySelector('.complaints-list');
    const complaints = Array.from(document.querySelectorAll('.complaint-card'));
    
    complaints.sort((a, b) => {
        switch(sortBy) {
            case 'newest':
                // In real app, sort by actual date
                return 0;
            case 'oldest':
                return 0;
            case 'status':
                const statusA = a.getAttribute('data-status');
                const statusB = b.getAttribute('data-status');
                return statusA.localeCompare(statusB);
            case 'category':
                const catA = a.getAttribute('data-category');
                const catB = b.getAttribute('data-category');
                return catA.localeCompare(catB);
            default:
                return 0;
        }
    });
    
    complaints.forEach(complaint => container.appendChild(complaint));
    showNotification('Complaints sorted', 'info');
}

function toggleEmptyState(show) {
    const emptyState = document.querySelector('.empty-state');
    const complaintsList = document.querySelector('.complaints-list');
    
    if (emptyState) {
        emptyState.style.display = show ? 'block' : 'none';
    }
    if (complaintsList) {
        complaintsList.style.display = show ? 'none' : 'flex';
    }
}

/* ============================================
   COMPLAINT ACTIONS
   ============================================ */
function viewComplaintDetails(id) {
    showNotification(`Opening complaint #${id}...`, 'info');
    // In real app, navigate to detail page or show modal
    setTimeout(() => {
        console.log(`View details for complaint #${id}`);
    }, 500);
}

function shareComplaint(id) {
    const url = `${window.location.origin}/complaint/${id}`;
    const title = `My Complaint #${id}`;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).then(() => {
            showNotification('Complaint shared!', 'success');
        }).catch(console.error);
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        });
    }
}

/* ============================================
   TRACK BY ID
   ============================================ */
function trackComplaintById() {
    const input = document.getElementById('trackComplaintId');
    const complaintId = input.value.trim().replace('#', '');
    
    if (!complaintId) {
        showNotification('Please enter a complaint ID', 'warning');
        return;
    }
    
    showNotification(`Searching for complaint #${complaintId}...`, 'info');
    
    // Simulate API call
    setTimeout(() => {
        // In real app, search for the complaint
        const complaint = document.querySelector(`[data-id="${complaintId}"]`);
        
        if (complaint) {
            // Scroll to complaint and highlight it
            complaint.scrollIntoView({ behavior: 'smooth', block: 'center' });
            complaint.style.animation = 'highlight 2s ease';
            showNotification('Complaint found!', 'success');
        } else {
            showNotification('Complaint not found. Please check the ID and try again.', 'danger');
        }
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('trackComplaintModal'));
        modal.hide();
        input.value = '';
    }, 1000);
}

/* ============================================
   RATING SYSTEM
   ============================================ */
let selectedRating = 0;

function initStarRating() {
    const stars = document.querySelectorAll('.star-rating-input i');
    const ratingText = document.querySelector('.rating-text-display');
    
    const ratingTexts = [
        'Click to rate',
        'Poor',
        'Fair',
        'Good',
        'Very Good',
        'Excellent'
    ];
    
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            selectedRating = index + 1;
            updateStarDisplay(selectedRating);
            if (ratingText) {
                ratingText.textContent = ratingTexts[selectedRating];
            }
        });
        
        star.addEventListener('mouseenter', function() {
            updateStarDisplay(index + 1, true);
            if (ratingText) {
                ratingText.textContent = ratingTexts[index + 1];
            }
        });
    });
    
    const ratingSection = document.querySelector('.rating-section');
    if (ratingSection) {
        ratingSection.addEventListener('mouseleave', function() {
            updateStarDisplay(selectedRating);
            if (ratingText) {
                ratingText.textContent = selectedRating > 0 ? ratingTexts[selectedRating] : 'Click to rate';
            }
        });
    }
}

function updateStarDisplay(rating, isHover = false) {
    const stars = document.querySelectorAll('.star-rating-input i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.className = 'bi bi-star-fill';
            if (!isHover) {
                star.classList.add('active');
            }
        } else {
            star.className = 'bi bi-star';
            star.classList.remove('active');
        }
    });
}

function rateComplaint(id) {
    selectedRating = 0;
    updateStarDisplay(0);
    
    const modal = new bootstrap.Modal(document.getElementById('rateServiceModal'));
    modal.show();
    
    // Store complaint ID for submission
    document.getElementById('rateServiceModal').setAttribute('data-complaint-id', id);
}

function submitRating() {
    const complaintId = document.getElementById('rateServiceModal').getAttribute('data-complaint-id');
    const comment = document.getElementById('ratingComment').value;
    
    if (selectedRating === 0) {
        showNotification('Please select a rating', 'warning');
        return;
    }
    
    showNotification('Submitting your rating...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for your feedback!', 'success');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('rateServiceModal'));
        modal.hide();
        
        // Reset form
        selectedRating = 0;
        updateStarDisplay(0);
        document.getElementById('ratingComment').value = '';
        
        // In real app, update the UI to show the rating was submitted
        console.log('Rating submitted:', { complaintId, rating: selectedRating, comment });
    }, 1000);
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

function navigateTo(page) {
    showNotification(`Navigating to ${page}...`, 'info');
    setTimeout(() => {
        // window.location.href = `${page}.html`;
        console.log(`Navigate to: ${page}`);
    }, 500);
}

// Add highlight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
        }
        50% {
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.3);
        }
    }
`;
document.head.appendChild(style);

// Console log
console.log('%c📝 My Complaints Page Loaded', 'font-size: 14px; font-weight: bold; color: #3b82f6;');