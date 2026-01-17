/* ============================================
   PROFILE & SETTINGS PAGE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initProfileSettings();
});

function initProfileSettings() {
    // Initialize all settings page features
    initTabNavigation();
    initFormHandlers();
    initSaveChanges();
    initPasswordChange();
    initSessionManagement();
    initThemeToggle();
}

// Tab Navigation
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.settings-tab-item');
    const tabContents = document.querySelectorAll('.settings-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Log tab change
            console.log('Switched to tab:', targetTab);
        });
    });
}

// Form Handlers
function initFormHandlers() {
    // Track form changes
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log('Form changed:', this.id, this.value);
            
            // Enable save button when changes are made
            document.getElementById('saveChanges').disabled = false;
        });
    });
}

// Save Changes
function initSaveChanges() {
    const saveBtn = document.getElementById('saveChanges');
    const cancelBtn = document.getElementById('cancelChanges');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveAllChanges();
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Discard all changes?')) {
                location.reload();
            }
        });
    }
}

// Save All Changes
function saveAllChanges() {
    const saveBtn = document.getElementById('saveChanges');
    const originalHTML = saveBtn.innerHTML;
    
    // Show loading state
    saveBtn.classList.add('btn-loading');
    saveBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Saving...';
    saveBtn.disabled = true;
    
    // Collect form data
    const formData = {
        profile: {
            firstName: document.getElementById('firstName')?.value,
            lastName: document.getElementById('lastName')?.value,
            email: document.getElementById('email')?.value,
            phone: document.getElementById('phone')?.value,
            dob: document.getElementById('dob')?.value,
            gender: document.getElementById('gender')?.value,
            address: document.getElementById('address')?.value,
            city: document.getElementById('city')?.value,
            state: document.getElementById('state')?.value,
            zip: document.getElementById('zip')?.value
        },
        notifications: {
            emailCollection: document.getElementById('emailCollection')?.checked,
            emailRequests: document.getElementById('emailRequests')?.checked,
            emailBills: document.getElementById('emailBills')?.checked,
            emailUpdates: document.getElementById('emailUpdates')?.checked,
            pushTraffic: document.getElementById('pushTraffic')?.checked,
            pushEmergency: document.getElementById('pushEmergency')?.checked,
            pushService: document.getElementById('pushService')?.checked,
            smsCollection: document.getElementById('smsCollection')?.checked,
            smsBills: document.getElementById('smsBills')?.checked
        },
        security: {
            twoFactor: document.getElementById('twoFactorSwitch')?.checked
        },
        privacy: {
            activityHistory: document.getElementById('activityHistory')?.checked,
            dataSharing: document.getElementById('dataSharing')?.checked,
            locationServices: document.getElementById('locationServices')?.checked
        }
    };
    
    console.log('Saving changes:', formData);
    
    // Simulate API call
    setTimeout(() => {
        saveBtn.classList.remove('btn-loading');
        saveBtn.innerHTML = originalHTML;
        saveBtn.disabled = false;
        
        // Show success message
        showSaveSuccess();
        showNotification('Changes saved successfully', 'success');
    }, 2000);
}

// Show Save Success
function showSaveSuccess() {
    const successMsg = document.createElement('div');
    successMsg.className = 'save-success';
    successMsg.innerHTML = '<i class="bi bi-check-circle me-2"></i> Changes saved successfully';
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => successMsg.remove(), 300);
    }, 3000);
}

// Password Change
function initPasswordChange() {
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            showPasswordChangeModal();
        });
    }
}

// Show Password Change Modal
function showPasswordChangeModal() {
    const currentPassword = prompt('Enter your current password:');
    
    if (currentPassword) {
        const newPassword = prompt('Enter your new password:');
        
        if (newPassword) {
            const confirmPassword = prompt('Confirm your new password:');
            
            if (newPassword === confirmPassword) {
                // Simulate password change
                setTimeout(() => {
                    showNotification('Password changed successfully', 'success');
                }, 500);
            } else {
                showNotification('Passwords do not match', 'danger');
            }
        }
    }
}

// Session Management
function initSessionManagement() {
    const revokeButtons = document.querySelectorAll('.session-item .btn-outline-danger');
    
    revokeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const sessionItem = this.closest('.session-item');
            const device = sessionItem.querySelector('.session-device').textContent;
            
            if (confirm(`Revoke session for ${device}?`)) {
                // Simulate session revocation
                sessionItem.style.animation = 'fadeOut 0.3s ease-out';
                
                setTimeout(() => {
                    sessionItem.remove();
                    showNotification('Session revoked successfully', 'success');
                }, 300);
            }
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeSelect = document.getElementById('themeSelect');
    
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            const theme = this.value;
            
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                // Auto mode - detect system preference
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                }
            }
            
            localStorage.setItem('theme', theme);
            showNotification('Theme updated', 'success');
        });
    }
}

// Profile Picture Upload
function handleProfilePictureUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                showNotification('File size must be less than 2MB', 'danger');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.querySelector('.profile-picture');
                img.style.backgroundImage = `url(${e.target.result})`;
                img.style.backgroundSize = 'cover';
                img.innerHTML = '';
                
                showNotification('Profile picture updated', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

// Remove Profile Picture
function removeProfilePicture() {
    if (confirm('Remove your profile picture?')) {
        const img = document.querySelector('.profile-picture');
        img.style.backgroundImage = '';
        img.innerHTML = '<i class="bi bi-person-circle"></i>';
        
        showNotification('Profile picture removed', 'success');
    }
}

// Download User Data
function downloadUserData() {
    if (confirm('Download all your data? This may take a few minutes.')) {
        showNotification('Preparing your data for download...', 'info');
        
        // Simulate data preparation
        setTimeout(() => {
            const userData = {
                profile: {
                    firstName: 'John',
                    lastName: 'Citizen',
                    email: 'john.citizen@example.com'
                },
                requests: [],
                bills: [],
                exportedAt: new Date().toISOString()
            };
            
            const json = JSON.stringify(userData, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'my-data.json';
            a.click();
            
            URL.revokeObjectURL(url);
            showNotification('Data downloaded successfully', 'success');
        }, 2000);
    }
}

// Delete Account
function deleteAccount() {
    const confirmation = prompt('This action cannot be undone. Type "DELETE" to confirm:');
    
    if (confirmation === 'DELETE') {
        if (confirm('Are you absolutely sure? All your data will be permanently deleted.')) {
            showNotification('Account deletion initiated. You will receive a confirmation email.', 'warning');
            
            // Simulate account deletion
            setTimeout(() => {
                alert('Your account has been scheduled for deletion. You have 30 days to cancel this action.');
            }, 1500);
        }
    } else if (confirmation !== null) {
        showNotification('Account deletion cancelled', 'info');
    }
}

// Validate Email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate Phone
function validatePhone(phone) {
    const re = /^\+?[\d\s\-\(\)]+$/;
    return re.test(phone);
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

// Add event listeners to buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-primary') && e.target.textContent.includes('Upload Photo')) {
        handleProfilePictureUpload();
    }
    
    if (e.target.closest('.btn-outline-danger') && e.target.textContent.includes('Remove') && e.target.closest('.profile-picture-section')) {
        removeProfilePicture();
    }
    
    if (e.target.textContent.includes('Download My Data')) {
        downloadUserData();
    }
    
    if (e.target.textContent.includes('Delete My Account')) {
        deleteAccount();
    }
});

console.log('Profile & Settings JavaScript Loaded');