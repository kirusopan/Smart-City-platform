/* ============================================
   PROFILE & SETTINGS PAGE - JAVASCRIPT
   Add this to your page or create settings.js
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPasswordStrength();
    loadSavedSettings();
});

/* ============================================
   TAB SWITCHING
   ============================================ */
function switchTab(event, tabId) {
    event.preventDefault();
    
    // Remove active class from all nav items
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    event.currentTarget.classList.add('active');
    
    // Hide all tabs
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Scroll to top of content
    document.querySelector('.settings-content').scrollIntoView({ behavior: 'smooth' });
}

/* ============================================
   PROFILE MANAGEMENT
   ============================================ */
function saveProfile() {
    const form = document.getElementById('profileForm');
    if (form.checkValidity()) {
        showNotification('Saving profile...', 'info');
        
        setTimeout(() => {
            showNotification('Profile updated successfully!', 'success');
        }, 1000);
    } else {
        form.reportValidity();
    }
}

/* ============================================
   PASSWORD MANAGEMENT
   ============================================ */
function initPasswordStrength() {
    const newPasswordInput = document.getElementById('newPassword');
    if (!newPasswordInput) return;
    
    newPasswordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        updatePasswordStrengthUI(strength);
    });
}

function calculatePasswordStrength(password) {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    
    return Math.min(strength, 100);
}

function updatePasswordStrengthUI(strength) {
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthBar || !strengthText) return;
    
    strengthBar.style.width = strength + '%';
    
    if (strength === 0) {
        strengthBar.className = 'progress-bar bg-danger';
        strengthText.textContent = 'Enter a password';
        strengthText.className = 'text-muted';
    } else if (strength < 40) {
        strengthBar.className = 'progress-bar bg-danger';
        strengthText.textContent = 'Weak password';
        strengthText.className = 'text-danger';
    } else if (strength < 70) {
        strengthBar.className = 'progress-bar bg-warning';
        strengthText.textContent = 'Medium strength';
        strengthText.className = 'text-warning';
    } else {
        strengthBar.className = 'progress-bar bg-success';
        strengthText.textContent = 'Strong password';
        strengthText.className = 'text-success';
    }
}

function changePassword() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!newPassword || !confirmPassword) {
        showNotification('Please fill in all password fields', 'warning');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match', 'danger');
        return;
    }
    
    const strength = calculatePasswordStrength(newPassword);
    if (strength < 40) {
        showNotification('Password is too weak. Please use a stronger password.', 'warning');
        return;
    }
    
    showNotification('Updating password...', 'info');
    
    setTimeout(() => {
        showNotification('Password updated successfully!', 'success');
        document.getElementById('passwordForm').reset();
        updatePasswordStrengthUI(0);
    }, 1500);
}

/* ============================================
   SECURITY MANAGEMENT
   ============================================ */
function disable2FA() {
    if (confirm('Are you sure you want to disable Two-Factor Authentication? This will make your account less secure.')) {
        showNotification('Disabling 2FA...', 'info');
        
        setTimeout(() => {
            showNotification('Two-Factor Authentication disabled', 'success');
        }, 1000);
    }
}

function reconfigure2FA() {
    showNotification('Opening 2FA configuration...', 'info');
    // Add logic to show 2FA reconfiguration modal
}

function terminateSession(sessionId) {
    if (confirm('Are you sure you want to terminate this session?')) {
        showNotification('Terminating session...', 'info');
        
        setTimeout(() => {
            showNotification('Session terminated successfully', 'success');
            // Remove session from UI
        }, 1000);
    }
}

function terminateAllSessions() {
    if (confirm('This will log you out from all other devices. Continue?')) {
        showNotification('Terminating all sessions...', 'info');
        
        setTimeout(() => {
            showNotification('All other sessions have been terminated', 'success');
        }, 1500);
    }
}

/* ============================================
   THEME & APPEARANCE
   ============================================ */
function selectTheme(theme) {
    // Remove active class from all theme options
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Add active class to selected theme
    event.currentTarget.classList.add('active');
    
    // Apply theme
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else if (theme === 'auto') {
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        localStorage.setItem('theme', 'auto');
    }
    
    showNotification(`Theme changed to ${theme}`, 'success');
}

function selectColor(color) {
    // Remove active class from all color options
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Add active class to selected color
    event.currentTarget.classList.add('active');
    
    // Apply color
    document.documentElement.style.setProperty('--primary-color', color);
    localStorage.setItem('accentColor', color);
    
    showNotification('Accent color updated', 'success');
}

/* ============================================
   TEAM MANAGEMENT
   ============================================ */
function sendInvite() {
    const form = document.getElementById('inviteForm');
    if (form.checkValidity()) {
        showNotification('Sending invitation...', 'info');
        
        setTimeout(() => {
            showNotification('Invitation sent successfully!', 'success');
            bootstrap.Modal.getInstance(document.getElementById('inviteModal')).hide();
            form.reset();
        }, 1500);
    } else {
        form.reportValidity();
    }
}

function editMember(memberId) {
    showNotification(`Opening editor for member #${memberId}...`, 'info');
    // Add logic to show edit member modal
}

/* ============================================
   SYSTEM ACTIONS
   ============================================ */
function exportAllData() {
    showNotification('Preparing data export...', 'info');
    
    setTimeout(() => {
        showNotification('Data exported successfully!', 'success');
        // Simulate download
    }, 2000);
}

function backupDatabase() {
    showNotification('Creating database backup...', 'info');
    
    setTimeout(() => {
        showNotification('Database backup completed!', 'success');
    }, 3000);
}

function clearCache() {
    if (confirm('This will clear all cached data. Continue?')) {
        showNotification('Clearing cache...', 'info');
        
        setTimeout(() => {
            showNotification('Cache cleared successfully!', 'success');
        }, 1500);
    }
}

function resetAllSettings() {
    if (confirm('This will reset ALL settings to factory defaults. This action cannot be undone. Continue?')) {
        showNotification('Resetting all settings...', 'info');
        
        setTimeout(() => {
            showNotification('All settings have been reset', 'success');
            setTimeout(() => {
                location.reload();
            }, 1000);
        }, 2000);
    }
}

function deleteAccount() {
    const confirmed = prompt('This will PERMANENTLY delete your account and all data. Type "DELETE" to confirm:');
    
    if (confirmed === 'DELETE') {
        showNotification('Deleting account...', 'danger');
        
        setTimeout(() => {
            showNotification('Account deleted. Redirecting...', 'danger');
            setTimeout(() => {
                // Redirect to login or homepage
                window.location.href = '/login';
            }, 2000);
        }, 2000);
    } else if (confirmed !== null) {
        showNotification('Account deletion cancelled', 'info');
    }
}

/* ============================================
   SAVE ALL SETTINGS
   ============================================ */
function saveAllSettings() {
    showNotification('Saving all settings...', 'info');
    
    // Collect all settings
    const settings = {
        profile: collectProfileSettings(),
        preferences: collectPreferences(),
        notifications: collectNotificationSettings(),
        appearance: collectAppearanceSettings()
    };
    
    // Save to localStorage (in real app, save to server)
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    setTimeout(() => {
        showNotification('All settings saved successfully!', 'success');
    }, 1000);
}

function resetSettings() {
    if (confirm('Reset all settings to default values?')) {
        localStorage.removeItem('userSettings');
        showNotification('Settings reset to defaults', 'success');
        setTimeout(() => location.reload(), 1000);
    }
}

/* ============================================
   SETTINGS COLLECTION
   ============================================ */
function collectProfileSettings() {
    // Collect profile form data
    return {
        // Add your profile fields here
    };
}

function collectPreferences() {
    return {
        language: document.querySelector('select[id*="language"]')?.value,
        timezone: document.querySelector('select[id*="timezone"]')?.value,
        autoRefresh: document.getElementById('autoRefresh')?.checked
    };
}

function collectNotificationSettings() {
    return {
        emailAlerts: document.getElementById('emailAlerts')?.checked,
        emailFeedback: document.getElementById('emailFeedback')?.checked,
        emailTraffic: document.getElementById('emailTraffic')?.checked,
        emailReports: document.getElementById('emailReports')?.checked,
        pushBrowser: document.getElementById('pushBrowser')?.checked,
        pushUrgent: document.getElementById('pushUrgent')?.checked,
        smsCritical: document.getElementById('smsCritical')?.checked,
        smsEmergency: document.getElementById('smsEmergency')?.checked
    };
}

function collectAppearanceSettings() {
    return {
        theme: localStorage.getItem('theme') || 'light',
        accentColor: localStorage.getItem('accentColor') || '#2563eb',
        compactMode: document.getElementById('compactMode')?.checked,
        sidebarCollapsed: document.getElementById('sidebarCollapsed')?.checked,
        showAnimations: document.getElementById('showAnimations')?.checked
    };
}

/* ============================================
   LOAD SAVED SETTINGS
   ============================================ */
function loadSavedSettings() {
    const savedSettings = localStorage.getItem('userSettings');
    if (!savedSettings) return;
    
    try {
        const settings = JSON.parse(savedSettings);
        
        // Apply saved preferences
        if (settings.preferences) {
            if (settings.preferences.autoRefresh !== undefined) {
                const autoRefreshCheckbox = document.getElementById('autoRefresh');
                if (autoRefreshCheckbox) autoRefreshCheckbox.checked = settings.preferences.autoRefresh;
            }
        }
        
        // Apply saved notification settings
        if (settings.notifications) {
            Object.keys(settings.notifications).forEach(key => {
                const checkbox = document.getElementById(key);
                if (checkbox) checkbox.checked = settings.notifications[key];
            });
        }
        
        // Apply saved appearance settings
        if (settings.appearance) {
            Object.keys(settings.appearance).forEach(key => {
                const checkbox = document.getElementById(key);
                if (checkbox && typeof settings.appearance[key] === 'boolean') {
                    checkbox.checked = settings.appearance[key];
                }
            });
        }
    } catch (error) {
        console.error('Error loading saved settings:', error);
    }
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

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
   PREVENT ACCIDENTAL NAVIGATION
   ============================================ */
let hasUnsavedChanges = false;

// Track form changes
document.addEventListener('input', function(e) {
    if (e.target.closest('form')) {
        hasUnsavedChanges = true;
    }
});

// Warn before leaving with unsaved changes
window.addEventListener('beforeunload', function(e) {
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
    }
});

// Clear unsaved changes flag on save
document.addEventListener('click', function(e) {
    if (e.target.closest('[onclick*="save"]') || e.target.closest('[onclick*="Save"]')) {
        setTimeout(() => {
            hasUnsavedChanges = false;
        }, 1500);
    }
});

// Console log
console.log('%c⚙️ Settings Module Loaded', 'font-size: 14px; font-weight: bold; color: #2563eb;');
console.log('%cProfile & Settings ready', 'font-size: 12px; color: #64748b;');