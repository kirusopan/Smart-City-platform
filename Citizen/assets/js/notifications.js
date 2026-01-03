/* ============================================
   NOTIFICATION CENTER PAGE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initNotificationCenter();
});

// Static Notification Data
const notificationData = {
    notifications: [
        { id: 1, category: 'traffic', title: 'Traffic Alert: Major Accident', message: 'Heavy traffic reported on Highway 101 near Exit 45. Consider alternate routes.', time: '5 mins ago', unread: true, priority: 'high' },
        { id: 2, category: 'waste', title: 'Waste Collection Reminder', message: 'General waste collection scheduled for tomorrow at 6:00 AM. Please place bins outside.', time: '1 hour ago', unread: true, priority: 'medium' },
        { id: 3, category: 'bills', title: 'Bill Payment Due', message: 'Your electricity bill of $125.00 is due on January 25, 2026.', time: '3 hours ago', unread: false, priority: 'medium' },
        { id: 4, category: 'alerts', title: 'Service Request Update', message: 'Your request #REQ-1045 (Pothole on Main Street) is now in progress.', time: '5 hours ago', unread: true, priority: 'low' },
        { id: 5, category: 'system', title: 'Account Security Update', message: 'New login detected from iPhone 14 in Los Angeles, CA.', time: 'Yesterday at 2:30 PM', unread: false, priority: 'medium' },
        { id: 6, category: 'waste', title: 'Collection Completed', message: 'General waste collected successfully. Weight: 45 kg. Thank you for recycling!', time: 'Yesterday at 7:45 AM', unread: true, priority: 'low' },
        { id: 7, category: 'traffic', title: 'Road Construction Notice', message: 'Planned road maintenance on Main Street from Jan 22-24. Expect delays.', time: 'Yesterday at 9:00 AM', unread: false, priority: 'medium' },
        { id: 8, category: 'bills', title: 'Payment Received', message: 'Your payment of $238.00 for water services has been processed successfully.', time: '3 days ago', unread: false, priority: 'low' },
        { id: 9, category: 'system', title: 'New Feature Available', message: 'Check out our new real-time traffic map feature! Get live updates on your commute.', time: '4 days ago', unread: true, priority: 'low' },
        { id: 10, category: 'traffic', title: 'Traffic Incident Resolved', message: 'Accident on Highway 101 has been cleared. Traffic is returning to normal.', time: '5 days ago', unread: false, priority: 'low' },
        { id: 11, category: 'waste', title: 'Missed Collection', message: 'We missed your general waste collection on Jan 13. Rescheduled for Jan 15.', time: '6 days ago', unread: true, priority: 'high' },
        { id: 12, category: 'bills', title: 'New Bill Generated', message: 'Your January utility bill is now available. Total amount: $245.00', time: '1 week ago', unread: false, priority: 'medium' },
        { id: 13, category: 'system', title: 'Welcome to Smart City Portal', message: 'Thank you for registering! Explore all the features available to make your city life easier.', time: '2 weeks ago', unread: false, priority: 'low' },
        { id: 14, category: 'alerts', title: 'Security Alert', message: 'Failed login attempt detected from unknown device. Please verify your account security.', time: '2 weeks ago', unread: true, priority: 'high' },
        { id: 15, category: 'traffic', title: 'Road Repair Completed', message: 'The pothole repair on Oak Street has been completed. Thank you for reporting!', time: '3 weeks ago', unread: false, priority: 'low' }
    ],
    counts: {
        all: 24,
        unread: 8,
        traffic: 5,
        waste: 4,
        bills: 3,
        alerts: 2,
        system: 10
    }
};

function initNotificationCenter() {
    // Initialize all notification center features
    initFilterButtons();
    initMarkAllRead();
    initClearAll();
    initNotificationActions();
    updateNotificationCounts();
}

// Initialize Filter Buttons
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter notifications
            filterNotifications(filter);
        });
    });
}

// Filter Notifications
function filterNotifications(filter) {
    const notifications = document.querySelectorAll('.notification-item');
    
    notifications.forEach(notification => {
        const category = notification.getAttribute('data-category');
        const isUnread = notification.classList.contains('unread');
        
        if (filter === 'all') {
            notification.classList.remove('hidden');
        } else if (filter === 'unread') {
            notification.classList.toggle('hidden', !isUnread);
        } else {
            notification.classList.toggle('hidden', category !== filter);
        }
    });
    
    console.log('Filtered notifications by:', filter);
}

// Mark All as Read
function initMarkAllRead() {
    const markAllBtn = document.getElementById('markAllRead');
    
    if (markAllBtn) {
        markAllBtn.addEventListener('click', function() {
            markAllNotificationsAsRead();
        });
    }
}

// Mark All Notifications as Read
function markAllNotificationsAsRead() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    
    if (unreadNotifications.length === 0) {
        showNotification('No unread notifications', 'info');
        return;
    }
    
    const confirmed = confirm(`Mark all ${unreadNotifications.length} notifications as read?`);
    
    if (confirmed) {
        unreadNotifications.forEach(notification => {
            notification.classList.remove('unread');
        });
        
        updateNotificationCounts();
        showNotification('All notifications marked as read', 'success');
    }
}

// Clear All Notifications
function initClearAll() {
    const clearAllBtn = document.getElementById('clearAll');
    
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function() {
            clearAllNotifications();
        });
    }
}

// Clear All Notifications
function clearAllNotifications() {
    const notifications = document.querySelectorAll('.notification-item');
    
    if (notifications.length === 0) {
        showNotification('No notifications to clear', 'info');
        return;
    }
    
    const confirmed = confirm('Clear all notifications? This action cannot be undone.');
    
    if (confirmed) {
        notifications.forEach(notification => {
            notification.classList.add('removing');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        setTimeout(() => {
            showEmptyState();
            updateNotificationCounts();
            showNotification('All notifications cleared', 'success');
        }, 400);
    }
}

// Show Empty State
function showEmptyState() {
    const notificationsList = document.querySelector('.notifications-list');
    
    notificationsList.innerHTML = `
        <div class="notifications-empty">
            <i class="bi bi-bell-slash"></i>
            <h5>No Notifications</h5>
            <p>You're all caught up! No new notifications.</p>
        </div>
    `;
}

// Initialize Notification Actions
function initNotificationActions() {
    const notifications = document.querySelectorAll('.notification-item');
    
    notifications.forEach(notification => {
        // Click on notification item
        notification.addEventListener('click', function(e) {
            if (!e.target.closest('.notification-action-btn') && !e.target.closest('.notification-menu-btn')) {
                markAsRead(this);
            }
        });
        
        // Action buttons
        const actionButtons = notification.querySelectorAll('.notification-action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                handleNotificationAction(this, notification);
            });
        });
        
        // Menu button
        const menuBtn = notification.querySelector('.notification-menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showNotificationMenu(notification);
            });
        }
    });
}

// Mark Notification as Read
function markAsRead(notification) {
    if (notification.classList.contains('unread')) {
        notification.classList.remove('unread');
        updateNotificationCounts();
        console.log('Notification marked as read:', notification.getAttribute('data-id'));
    }
}

// Handle Notification Action
function handleNotificationAction(button, notification) {
    const action = button.textContent.trim();
    const notificationId = notification.getAttribute('data-id');
    
    console.log('Action clicked:', action, 'for notification:', notificationId);
    
    if (action.includes('View on Map')) {
        showNotification('Opening traffic map...', 'info');
    } else if (action.includes('View Schedule')) {
        showNotification('Opening collection schedule...', 'info');
    } else if (action.includes('Pay Now')) {
        showNotification('Opening payment portal...', 'info');
    } else if (action.includes('Track Request')) {
        showNotification('Opening request tracker...', 'info');
    } else if (action.includes('Explore Now')) {
        showNotification('Opening new feature...', 'info');
    } else if (action.includes('View Details')) {
        showNotification('Loading details...', 'info');
    } else if (action.includes('Download Invoice')) {
        downloadInvoice(notificationId);
    } else if (action.includes('Review Security')) {
        showNotification('Opening security settings...', 'info');
    } else if (action.includes('Dismiss')) {
        dismissNotification(notification);
    }
    
    markAsRead(notification);
}

// Show Notification Menu
function showNotificationMenu(notification) {
    const notificationId = notification.getAttribute('data-id');
    
    const menu = `
Options for notification:
1. Mark as read
2. Delete notification
3. Mute similar notifications
    `;
    
    const choice = prompt(menu + '\n\nEnter choice (1-3):');
    
    switch (choice) {
        case '1':
            markAsRead(notification);
            showNotification('Marked as read', 'success');
            break;
        case '2':
            dismissNotification(notification);
            break;
        case '3':
            showNotification('Similar notifications muted', 'success');
            break;
    }
}

// Dismiss Notification
function dismissNotification(notification) {
    notification.classList.add('removing');
    
    setTimeout(() => {
        notification.remove();
        updateNotificationCounts();
        showNotification('Notification dismissed', 'success');
    }, 300);
}

// Download Invoice
function downloadInvoice(notificationId) {
    showNotification('Downloading invoice...', 'info');
    
    setTimeout(() => {
        const invoiceData = {
            id: notificationId,
            date: new Date().toISOString(),
            amount: 245.00
        };
        
        const json = JSON.stringify(invoiceData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${notificationId}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        showNotification('Invoice downloaded', 'success');
    }, 1000);
}

// Update Notification Counts
function updateNotificationCounts() {
    const allNotifications = document.querySelectorAll('.notification-item');
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    
    const counts = {
        all: allNotifications.length,
        unread: unreadNotifications.length,
        traffic: document.querySelectorAll('.notification-item[data-category="traffic"]').length,
        waste: document.querySelectorAll('.notification-item[data-category="waste"]').length,
        bills: document.querySelectorAll('.notification-item[data-category="bills"]').length,
        alerts: document.querySelectorAll('.notification-item[data-category="alerts"]').length,
        system: document.querySelectorAll('.notification-item[data-category="system"]').length
    };
    
    // Update filter counts
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        const countBadge = btn.querySelector('.filter-count');
        
        if (countBadge && counts[filter] !== undefined) {
            countBadge.textContent = counts[filter];
        }
    });
    
    console.log('Notification counts updated:', counts);
}

// Load More Notifications
function loadMoreNotifications() {
    showNotification('Loading more notifications...', 'info');
    
    setTimeout(() => {
        showNotification('No more notifications to load', 'info');
    }, 1000);
}

// Search Notifications
function searchNotifications(query) {
    const notifications = document.querySelectorAll('.notification-item');
    const searchTerm = query.toLowerCase();
    
    notifications.forEach(notification => {
        const title = notification.querySelector('.notification-title').textContent.toLowerCase();
        const message = notification.querySelector('.notification-message').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || message.includes(searchTerm)) {
            notification.classList.remove('hidden');
        } else {
            notification.classList.add('hidden');
        }
    });
}

// Get Notification Statistics
function getNotificationStats() {
    const stats = {
        total: document.querySelectorAll('.notification-item').length,
        unread: document.querySelectorAll('.notification-item.unread').length,
        byCategory: {}
    };
    
    ['traffic', 'waste', 'bills', 'alerts', 'system'].forEach(category => {
        stats.byCategory[category] = document.querySelectorAll(`.notification-item[data-category="${category}"]`).length;
    });
    
    return stats;
}

// Show Notification Toast
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

// Initialize Load More Button
document.querySelector('.notification-load-more button')?.addEventListener('click', function() {
    loadMoreNotifications();
});

// Log initial stats
console.log('Notification Statistics:', getNotificationStats());
console.log('Notification Center JavaScript Loaded');