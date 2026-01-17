/* ============================================
   WASTE COLLECTION SCHEDULE PAGE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initWasteCollectionPage();
});

function initWasteCollectionPage() {
    // Initialize all waste collection page features
    loadWasteData();
    initQuickActions();
    initScheduleReminders();
    highlightNextCollection();
}

// Static Waste Collection Data
const wasteData = {
    mySchedule: [
        {
            day: 'MON',
            date: 'Jan 20',
            type: 'General Waste',
            icon: 'trash3',
            color: 'success',
            time: '6:00 AM - 10:00 AM',
            isToday: true
        },
        {
            day: 'WED',
            date: 'Jan 22',
            type: 'Recyclables',
            icon: 'recycle',
            color: 'info',
            time: '6:00 AM - 10:00 AM',
            isToday: false
        },
        {
            day: 'FRI',
            date: 'Jan 24',
            type: 'General Waste',
            icon: 'trash3',
            color: 'success',
            time: '6:00 AM - 10:00 AM',
            isToday: false
        },
        {
            day: 'SAT',
            date: 'Jan 25',
            type: 'Garden Waste',
            icon: 'tree',
            color: 'warning',
            time: '7:00 AM - 11:00 AM',
            isToday: false
        }
    ],
    
    collectionHistory: [
        { date: 'Jan 17, 2026', type: 'General Waste', scheduledTime: '6:00 AM - 10:00 AM', actualTime: '7:45 AM', weight: '45 kg', status: 'Collected' },
        { date: 'Jan 15, 2026', type: 'Recyclables', scheduledTime: '6:00 AM - 10:00 AM', actualTime: '8:15 AM', weight: '18 kg', status: 'Collected' },
        { date: 'Jan 13, 2026', type: 'General Waste', scheduledTime: '6:00 AM - 10:00 AM', actualTime: '—', weight: '—', status: 'Missed' },
        { date: 'Jan 11, 2026', type: 'Garden Waste', scheduledTime: '7:00 AM - 11:00 AM', actualTime: '9:30 AM', weight: '62 kg', status: 'Collected' },
        { date: 'Jan 10, 2026', type: 'General Waste', scheduledTime: '6:00 AM - 10:00 AM', actualTime: '8:00 AM', weight: '38 kg', status: 'Collected' },
        { date: 'Jan 8, 2026', type: 'Recyclables', scheduledTime: '6:00 AM - 10:00 AM', actualTime: '7:30 AM', weight: '22 kg', status: 'Collected' }
    ],
    
    zones: [
        { zone: 'A', area: 'Downtown District', general: 'Mon, Wed, Fri', recycle: 'Tuesday', garden: 'Saturday', time: '6:00 AM - 10:00 AM', next: 'Tomorrow' },
        { zone: 'B', area: 'Residential North', general: 'Mon, Thu', recycle: 'Wednesday', garden: 'Saturday', time: '6:00 AM - 10:00 AM', next: 'In 2 Days' },
        { zone: 'C', area: 'Business Center', general: 'Daily', recycle: 'Wed, Fri', garden: '—', time: '5:00 AM - 9:00 AM', next: 'Tomorrow' },
        { zone: 'D', area: 'Suburban East', general: 'Tue, Fri', recycle: 'Thursday', garden: 'Saturday', time: '7:00 AM - 11:00 AM', next: 'In 3 Days' },
        { zone: 'E', area: 'Industrial Area', general: 'Mon, Wed, Fri', recycle: 'Tuesday', garden: '—', time: '5:00 AM - 9:00 AM', next: 'Tomorrow' },
        { zone: 'F', area: 'Residential South', general: 'Mon, Thu', recycle: 'Wednesday', garden: 'Saturday', time: '6:00 AM - 10:00 AM', next: 'In 2 Days' },
        { zone: 'G', area: 'Suburban West', general: 'Tue, Fri', recycle: 'Thursday', garden: 'Saturday', time: '7:00 AM - 11:00 AM', next: 'In 3 Days' },
        { zone: 'H', area: 'Coastal Area', general: 'Wed, Sat', recycle: 'Friday', garden: 'Saturday', time: '6:00 AM - 10:00 AM', next: 'Tomorrow' }
    ],
    
    stats: {
        collectionRate: 98.2,
        activeTrucks: 45,
        nextCollection: 'Tomorrow',
        tonsRecycled: 1245
    },
    
    categories: [
        { name: 'General Waste', schedule: 'Mon & Fri', icon: 'trash3', color: 'success' },
        { name: 'Recyclables', schedule: 'Wednesday', icon: 'recycle', color: 'info' },
        { name: 'Garden Waste', schedule: 'Saturday', icon: 'tree', color: 'warning' },
        { name: 'Hazardous Waste', schedule: 'By Appointment', icon: 'exclamation-triangle', color: 'danger' }
    ]
};

// Load Waste Data
function loadWasteData() {
    console.log('Loading waste collection data:', wasteData);
}

// Initialize Quick Actions
function initQuickActions() {
    const actionButtons = document.querySelectorAll('.btn-outline-primary');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            handleQuickAction(action);
        });
    });
}

// Handle Quick Action
function handleQuickAction(action) {
    console.log('Quick action clicked:', action);
    
    if (action.includes('Report Missed')) {
        reportMissedCollection();
    } else if (action.includes('Request Special')) {
        requestSpecialPickup();
    } else if (action.includes('Waste Guidelines')) {
        showWasteGuidelines();
    } else if (action.includes('Drop-off Center')) {
        findDropoffCenter();
    } else if (action.includes('Download')) {
        downloadSchedule();
    } else if (action.includes('Reminder')) {
        setReminder();
    }
}

// Report Missed Collection
function reportMissedCollection() {
    const confirmed = confirm('Report a missed collection?');
    
    if (confirmed) {
        showNotification('Missed collection report submitted successfully', 'success');
        
        // Log the report
        console.log('Missed collection reported at:', new Date().toISOString());
    }
}

// Request Special Pickup
function requestSpecialPickup() {
    showNotification('Opening special pickup request form...', 'info');
    
    setTimeout(() => {
        alert('Special Pickup Request Form\n\nPlease contact: (555) 123-4567\nOr email: waste@smartcity.gov');
    }, 500);
}

// Show Waste Guidelines
function showWasteGuidelines() {
    const guidelines = `
WASTE SORTING GUIDELINES:

General Waste:
- Food waste
- Non-recyclable plastics
- Contaminated paper

Recyclables:
- Clean paper & cardboard
- Glass bottles & jars
- Metal cans
- Plastic bottles (PET, HDPE)

Garden Waste:
- Grass clippings
- Tree branches
- Leaves & plants

Hazardous Waste:
- Batteries
- Electronics
- Chemicals & paint
- Light bulbs
    `;
    
    alert(guidelines);
}

// Find Drop-off Center
function findDropoffCenter() {
    showNotification('Opening drop-off center locator...', 'info');
    
    setTimeout(() => {
        const centers = `
DROP-OFF CENTERS:

1. Central Recycling Center
   Address: 123 Main Street
   Hours: Mon-Sat, 8AM-6PM

2. North Side Drop-off
   Address: 456 Oak Avenue
   Hours: Mon-Fri, 9AM-5PM

3. Hazardous Waste Facility
   Address: 789 Industrial Blvd
   Hours: Sat-Sun, 10AM-4PM
        `;
        
        alert(centers);
    }, 500);
}

// Download Schedule
function downloadSchedule() {
    console.log('Downloading collection schedule...');
    
    const scheduleText = generateScheduleText();
    const blob = new Blob([scheduleText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'waste-collection-schedule.txt';
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification('Schedule downloaded successfully', 'success');
}

// Generate Schedule Text
function generateScheduleText() {
    let text = 'WASTE COLLECTION SCHEDULE\n';
    text += '=========================\n\n';
    
    wasteData.mySchedule.forEach(item => {
        text += `${item.day} - ${item.date}\n`;
        text += `Type: ${item.type}\n`;
        text += `Time: ${item.time}\n\n`;
    });
    
    return text;
}

// Set Reminder
function setReminder() {
    const confirmed = confirm('Set reminder for next collection?\n\nYou will receive a notification 1 hour before collection time.');
    
    if (confirmed) {
        showNotification('Reminder set successfully', 'success');
        
        // Log the reminder
        console.log('Reminder set at:', new Date().toISOString());
    }
}

// Initialize Schedule Reminders
function initScheduleReminders() {
    // Check if there's a collection today
    const todayCollection = wasteData.mySchedule.find(item => item.isToday);
    
    if (todayCollection) {
        showCollectionNotification(todayCollection);
    }
}

// Show Collection Notification
function showCollectionNotification(collection) {
    console.log('Collection today:', collection.type);
    
    // You can create a notification banner here
    showNotification(`Reminder: ${collection.type} collection today (${collection.time})`, 'warning');
}

// Highlight Next Collection
function highlightNextCollection() {
    const scheduleItems = document.querySelectorAll('.schedule-item');
    
    scheduleItems.forEach(item => {
        if (item.classList.contains('schedule-today')) {
            item.style.animation = 'pulse 2s infinite';
        }
    });
}

// Calculate Collection Statistics
function calculateCollectionStats() {
    const history = wasteData.collectionHistory;
    const totalCollections = history.length;
    const successfulCollections = history.filter(c => c.status === 'Collected').length;
    const missedCollections = history.filter(c => c.status === 'Missed').length;
    
    const successRate = ((successfulCollections / totalCollections) * 100).toFixed(1);
    
    return {
        total: totalCollections,
        successful: successfulCollections,
        missed: missedCollections,
        successRate: successRate
    };
}

// Get Total Waste Weight
function getTotalWasteWeight() {
    const history = wasteData.collectionHistory;
    let totalWeight = 0;
    
    history.forEach(item => {
        if (item.weight !== '—') {
            const weight = parseInt(item.weight);
            if (!isNaN(weight)) {
                totalWeight += weight;
            }
        }
    });
    
    return totalWeight;
}

// Filter Collection History
function filterCollectionHistory(status) {
    const rows = document.querySelectorAll('.table tbody tr');
    
    rows.forEach(row => {
        const badge = row.querySelector('.badge');
        if (badge) {
            const rowStatus = badge.textContent.trim();
            
            if (status === 'all' || rowStatus === status) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

// Search Collection History
function searchCollectionHistory(query) {
    const rows = document.querySelectorAll('.table tbody tr');
    const searchTerm = query.toLowerCase();
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Get Next Collection Date
function getNextCollectionDate() {
    const today = new Date();
    const nextCollection = wasteData.mySchedule.find(item => !item.isToday);
    
    if (nextCollection) {
        return nextCollection.date;
    }
    
    return 'Not scheduled';
}

// Calculate Days Until Next Collection
function daysUntilNextCollection() {
    // This would calculate based on actual dates
    return 1; // Tomorrow
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

// Log Statistics
const stats = calculateCollectionStats();
const totalWeight = getTotalWasteWeight();

console.log('Collection Statistics:', stats);
console.log('Total Waste Collected:', totalWeight, 'kg');
console.log('Next Collection:', getNextCollectionDate());

console.log('Waste Collection JavaScript Loaded');