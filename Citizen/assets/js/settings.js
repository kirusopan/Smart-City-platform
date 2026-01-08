/* ============================================
   SETTINGS PAGE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initSettingsPage();
});

function initSettingsPage() {
    initSettingsNavigation();
    initProfileForm();
    initPasswordForm();
    initPhotoUpload();
    loadSettings();
}

// Initialize settings navigation
function initSettingsNavigation() {
    const navButtons = document.querySelectorAll('.list-group-item');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all sections
            const sections = document.querySelectorAll('.settings-section');
            sections.forEach(section => section.classList.remove('active'));
            
            // Show selected section
            const sectionId = this.getAttribute('data-section') + '-section';
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
            }
        });
    });
}

// Initialize profile form
function initProfileForm() {
    const profileForm = document.getElementById('profileForm');
    
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileInfo();
        });
    }
}

// Save profile information
function saveProfileInfo() {
    const profileData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        bio: document.getElementById('bio').value
    };
    
    console.log('Saving profile:', profileData);
    
    // Show loading state
    const submitBtn = document.querySelector('#profileForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showNotification('Profile updated successfully', 'success');
    }, 1000);
}

// Initialize password form
function initPasswordForm() {
    const passwordForm = document.getElementById('passwordForm');
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePassword();
        });
    }
}

// Update password
function updatePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate
    if (!currentPassword || !newPassword || !confirmPassword) {
        showNotification('Please fill in all password fields', 'warning');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('New password must be at least 8 characters', 'warning');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match', 'danger');
        return;
    }
    
    console.log('Updating password');
    
    // Show loading state
    const submitBtn = document.querySelector('#passwordForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Updating...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear form
        document.getElementById('passwordForm').reset();
        
        showNotification('Password updated successfully', 'success');
    }, 1000);
}

// Initialize photo upload
function initPhotoUpload() {
    const photoInput = document.getElementById('photoUpload');
    
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                // Validate file
                if (!file.type.startsWith('image/')) {
                    showNotification('Please select an image file', 'warning');
                    return;
                }
                
                if (file.size > 2 * 1024 * 1024) {
                    showNotification('Image size must be less than 2MB', 'warning');
                    return;
                }
                
                // Preview image
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.querySelector('.profile-photo-preview');
                    preview.innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
                    showNotification('Profile photo updated', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Save notification settings
function saveNotificationSettings() {
    const notificationSettings = {
        requestUpdates: document.getElementById('notifRequestUpdates').checked,
        announcements: document.getElementById('notifAnnouncements').checked,
        criticalAlerts: document.getElementById('notifCriticalAlerts').checked,
        bills: document.getElementById('notifBills').checked,
        smsEmergency: document.getElementById('smsEmergency').checked,
        smsService: document.getElementById('smsService').checked
    };
    
    console.log('Saving notification settings:', notificationSettings);
    
    // Save to localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    
    showNotification('Notification preferences saved', 'success');
}

// Save preferences
function savePreferences() {
    const preferences = {
        theme: document.getElementById('themeSelect').value,
        language: document.getElementById('languageSelect').value,
        timezone: document.getElementById('timezoneSelect').value,
        dateFormat: document.getElementById('dateFormatSelect').value
    };
    
    console.log('Saving preferences:', preferences);
    
    // Save to localStorage
    localStorage.setItem('preferences', JSON.stringify(preferences));
    
    // Apply theme if changed
    if (preferences.theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else if (preferences.theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    showNotification('Preferences saved successfully', 'success');
}

// Save privacy settings
function savePrivacySettings() {
    const privacySettings = {
        profileVisibility: document.getElementById('profileVisibility').checked,
        showRequests: document.getElementById('showRequests').checked,
        dataCollection: document.getElementById('dataCollection').checked
    };
    
    console.log('Saving privacy settings:', privacySettings);
    
    // Save to localStorage
    localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
    
    showNotification('Privacy settings saved', 'success');
}

// Load settings from localStorage
function loadSettings() {
    // Load notification settings
    const notificationSettings = localStorage.getItem('notificationSettings');
    if (notificationSettings) {
        const settings = JSON.parse(notificationSettings);
        if (document.getElementById('notifRequestUpdates')) {
            document.getElementById('notifRequestUpdates').checked = settings.requestUpdates !== false;
            document.getElementById('notifAnnouncements').checked = settings.announcements !== false;
            document.getElementById('notifCriticalAlerts').checked = settings.criticalAlerts !== false;
            document.getElementById('notifBills').checked = settings.bills !== false;
            document.getElementById('smsEmergency').checked = settings.smsEmergency !== false;
            document.getElementById('smsService').checked = settings.smsService || false;
        }
    }
    
    // Load preferences
    const preferences = localStorage.getItem('preferences');
    if (preferences) {
        const prefs = JSON.parse(preferences);
        if (document.getElementById('themeSelect')) {
            document.getElementById('themeSelect').value = prefs.theme || 'light';
            document.getElementById('languageSelect').value = prefs.language || 'en';
            document.getElementById('timezoneSelect').value = prefs.timezone || 'est';
            document.getElementById('dateFormatSelect').value = prefs.dateFormat || 'mdy';
        }
    }
    
    // Load privacy settings
    const privacySettings = localStorage.getItem('privacySettings');
    if (privacySettings) {
        const settings = JSON.parse(privacySettings);
        if (document.getElementById('profileVisibility')) {
            document.getElementById('profileVisibility').checked = settings.profileVisibility || false;
            document.getElementById('showRequests').checked = settings.showRequests || false;
            document.getElementById('dataCollection').checked = settings.dataCollection !== false;
        }
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

// Handle account deletion
function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
            console.log('Deleting account...');
            showNotification('Account deletion initiated. You will receive a confirmation email.', 'warning');
        }
    }
}

// Handle data download
function downloadData() {
    console.log('Downloading user data...');
    showNotification('Your data download has been initiated. You will receive an email when ready.', 'info');
}

console.log('Settings JavaScript Loaded');