/* ============================================
   ANNOUNCEMENTS PAGE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initAnnouncementsPage();
});

function initAnnouncementsPage() {
    initAnnouncementSearch();
    initAnnouncementFilters();
    initRefreshButton();
    loadAnnouncementsData();
}

// Sample announcements data
const announcementsData = [
    {
        id: 'ANN-001',
        category: 'alert',
        priority: 'urgent',
        title: 'Water Supply Maintenance',
        excerpt: 'Scheduled maintenance will affect water supply in Districts 5 and 6',
        date: 'Jan 18, 2026',
        fullContent: 'Scheduled maintenance will affect water supply in Districts 5 and 6 on January 20, 2026, from 9:00 AM to 3:00 PM. Please store sufficient water for your needs during this period.'
    },
    {
        id: 'ANN-002',
        category: 'alert',
        priority: 'urgent',
        title: 'Emergency Road Closure',
        excerpt: 'Highway 101 will be closed for emergency repairs',
        date: 'Jan 18, 2026',
        fullContent: 'Highway 101 will be closed for emergency repairs from January 19-21. Alternative routes are available via Highway 50. Please plan your travel accordingly.'
    },
    {
        id: 'ANN-003',
        category: 'event',
        priority: 'important',
        title: 'City Marathon 2026',
        excerpt: 'Annual City Marathon scheduled for February 15',
        date: 'Jan 17, 2026',
        fullContent: 'Annual City Marathon scheduled for February 15. Registration now open at citymarathon.com. Road closures will be in effect from 6 AM to 12 PM in the downtown area.'
    },
    {
        id: 'ANN-004',
        category: 'news',
        priority: 'normal',
        title: 'New Park Opening in District 3',
        excerpt: 'Greenwood Park officially opens next month',
        date: 'Jan 16, 2026',
        fullContent: 'Greenwood Park officially opens next month. The 15-acre park features playgrounds, walking trails, and picnic areas. Grand opening ceremony on February 1st at 10 AM.'
    },
    {
        id: 'ANN-005',
        category: 'maintenance',
        priority: 'important',
        title: 'Scheduled Power Maintenance',
        excerpt: 'Power grid maintenance in Zones A & B',
        date: 'Jan 15, 2026',
        fullContent: 'Power grid maintenance in Zones A & B on January 25. Expected duration: 4 hours (8 AM - 12 PM). Affected areas will be notified via SMS and email.'
    }
];

// Load announcements
function loadAnnouncementsData() {
    console.log('Loaded', announcementsData.length, 'announcements');
}

// Initialize search
function initAnnouncementSearch() {
    const searchInput = document.getElementById('searchAnnouncement');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            filterAnnouncements();
        }, 300));
    }
}

// Initialize filters
function initAnnouncementFilters() {
    const categoryFilter = document.getElementById('categoryFilterAnn');
    const priorityFilter = document.getElementById('priorityFilterAnn');
    const clearBtn = document.getElementById('clearAnnouncementFilters');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterAnnouncements();
        });
    }
    
    if (priorityFilter) {
        priorityFilter.addEventListener('change', function() {
            filterAnnouncements();
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            document.getElementById('searchAnnouncement').value = '';
            document.getElementById('categoryFilterAnn').value = 'all';
            document.getElementById('priorityFilterAnn').value = 'all';
            filterAnnouncements();
            showNotification('Filters cleared', 'info');
        });
    }
}

// Filter announcements
function filterAnnouncements() {
    const searchTerm = document.getElementById('searchAnnouncement').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilterAnn').value;
    const priorityFilter = document.getElementById('priorityFilterAnn').value;
    
    const cards = document.querySelectorAll('#announcementsContainer > div');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        const cardCategory = card.getAttribute('data-category');
        const cardPriority = card.getAttribute('data-priority');
        
        const matchSearch = searchTerm === '' || cardText.includes(searchTerm);
        const matchCategory = categoryFilter === 'all' || cardCategory === categoryFilter;
        const matchPriority = priorityFilter === 'all' || cardPriority === priorityFilter;
        
        if (matchSearch && matchCategory && matchPriority) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    showEmptyState(visibleCount === 0);
}

// Show empty state
function showEmptyState(show) {
    let emptyState = document.getElementById('announcementsEmptyState');
    
    if (show) {
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.id = 'announcementsEmptyState';
            emptyState.className = 'col-12';
            emptyState.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-megaphone"></i>
                    <h4>No Announcements Found</h4>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            document.getElementById('announcementsContainer').appendChild(emptyState);
        }
    } else {
        if (emptyState) {
            emptyState.remove();
        }
    }
}

// Initialize refresh button
function initRefreshButton() {
    const refreshBtn = document.getElementById('refreshAnnouncementsBtn');
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const originalText = this.innerHTML;
            
            icon.style.animation = 'spin 1s linear';
            this.disabled = true;
            
            setTimeout(() => {
                icon.style.animation = '';
                this.disabled = false;
                showNotification('Announcements refreshed successfully', 'success');
                loadAnnouncementsData();
            }, 1000);
        });
    }
}

// View announcement detail
function viewAnnouncementDetail(announcementId) {
    const announcement = announcementsData.find(a => a.id === announcementId);
    
    if (!announcement) {
        // Use static content from the page
        showAnnouncementDetailModal(announcementId);
        return;
    }
    
    const modalBody = document.getElementById('announcementModalBody');
    
    let priorityBadgeClass = 'badge-info';
    if (announcement.priority === 'urgent') priorityBadgeClass = 'badge-danger';
    else if (announcement.priority === 'important') priorityBadgeClass = 'badge-warning';
    
    let categoryIcon = 'bi-megaphone';
    let categoryColor = 'text-primary';
    if (announcement.category === 'alert') {
        categoryIcon = 'bi-exclamation-triangle-fill';
        categoryColor = 'text-danger';
    } else if (announcement.category === 'event') {
        categoryIcon = 'bi-calendar-event';
        categoryColor = 'text-primary';
    } else if (announcement.category === 'news') {
        categoryIcon = 'bi-newspaper';
        categoryColor = 'text-info';
    } else if (announcement.category === 'maintenance') {
        categoryIcon = 'bi-tools';
        categoryColor = 'text-warning';
    } else if (announcement.category === 'update') {
        categoryIcon = 'bi-arrow-repeat';
        categoryColor = 'text-success';
    }
    
    modalBody.innerHTML = `
        <div class="announcement-detail-content">
            <div class="announcement-detail-header">
                <h3 class="announcement-detail-title">${announcement.title}</h3>
                <div class="announcement-detail-meta">
                    <div class="announcement-detail-meta-item">
                        <i class="bi ${categoryIcon} ${categoryColor}"></i>
                        <span>${announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}</span>
                    </div>
                    <div class="announcement-detail-meta-item">
                        <i class="bi bi-calendar"></i>
                        <span>${announcement.date}</span>
                    </div>
                    <div class="announcement-detail-meta-item">
                        <span class="badge ${priorityBadgeClass}">${announcement.priority.toUpperCase()}</span>
                    </div>
                </div>
            </div>
            
            <div class="announcement-detail-body">
                <p>${announcement.fullContent}</p>
                
                <h5>Additional Information</h5>
                <ul>
                    <li>For urgent inquiries, please contact City Services at (555) 123-4567</li>
                    <li>Updates will be posted on the city website and mobile app</li>
                    <li>Sign up for SMS alerts to receive real-time notifications</li>
                </ul>
                
                <h5>Related Resources</h5>
                <p>Visit our website or download the mobile app for more information and real-time updates.</p>
            </div>
            
            <div class="d-flex gap-2 mt-4">
                <button class="btn btn-primary" onclick="subscribeToUpdates('${announcement.id}')">
                    <i class="bi bi-bell"></i> Subscribe to Updates
                </button>
                <button class="btn btn-outline-primary" onclick="shareAnnouncement('${announcement.id}')">
                    <i class="bi bi-share"></i> Share
                </button>
                <button class="btn btn-outline-secondary" onclick="printAnnouncement('${announcement.id}')">
                    <i class="bi bi-printer"></i> Print
                </button>
            </div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('announcementDetailModal'));
    modal.show();
}

// Show announcement detail modal with generic content
function showAnnouncementDetailModal(announcementId) {
    const modalBody = document.getElementById('announcementModalBody');
    
    modalBody.innerHTML = `
        <div class="announcement-detail-content">
            <div class="announcement-detail-header">
                <h3 class="announcement-detail-title">Announcement Details</h3>
                <div class="announcement-detail-meta">
                    <div class="announcement-detail-meta-item">
                        <i class="bi bi-megaphone text-primary"></i>
                        <span>Important Update</span>
                    </div>
                    <div class="announcement-detail-meta-item">
                        <i class="bi bi-calendar"></i>
                        <span>January 2026</span>
                    </div>
                </div>
            </div>
            
            <div class="announcement-detail-body">
                <p>This announcement contains important information for all citizens.</p>
                
                <h5>Key Points</h5>
                <ul>
                    <li>Regular updates will be provided as more information becomes available</li>
                    <li>Citizens can contact city services for additional questions</li>
                    <li>Check the city website for the latest information</li>
                </ul>
                
                <h5>Stay Informed</h5>
                <p>Subscribe to our notification system to receive real-time updates about important city announcements and events.</p>
            </div>
            
            <div class="d-flex gap-2 mt-4">
                <button class="btn btn-primary" onclick="subscribeToUpdates('${announcementId}')">
                    <i class="bi bi-bell"></i> Subscribe to Updates
                </button>
                <button class="btn btn-outline-primary" onclick="shareAnnouncement('${announcementId}')">
                    <i class="bi bi-share"></i> Share
                </button>
            </div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('announcementDetailModal'));
    modal.show();
}

// Share announcement
function shareAnnouncement(announcementId) {
    console.log('Sharing announcement:', announcementId);
    showNotification('Share link copied to clipboard', 'success');
}

// Subscribe to updates
function subscribeToUpdates(announcementId) {
    console.log('Subscribing to updates for:', announcementId);
    showNotification('Successfully subscribed to updates', 'success');
}

// Print announcement
function printAnnouncement(announcementId) {
    console.log('Printing announcement:', announcementId);
    window.print();
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

console.log('Announcements JavaScript Loaded');



