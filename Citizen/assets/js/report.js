/* ============================================
   REPORT ISSUE PAGE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initReportIssueForm();
});

function initReportIssueForm() {
    // Initialize all form features
    handleFormSubmission();
    handlePhotoUpload();
    handleLocationFeature();
    handleSaveDraft();
    handleFormValidation();
    handleAnonymousOption();
}

// Form Submission Handler
function handleFormSubmission() {
    const form = document.getElementById('reportIssueForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateReportForm()) {
                submitReport();
            }
        });
    }
}

// Validate Report Form
function validateReportForm() {
    const form = document.getElementById('reportIssueForm');
    let isValid = true;
    let errorMessages = [];
    
    // Check category selection
    const category = form.querySelector('input[name="category"]:checked');
    if (!category) {
        errorMessages.push('Please select an issue category');
        isValid = false;
    }
    
    // Check title
    const title = document.getElementById('issueTitle').value.trim();
    if (title.length < 5) {
        errorMessages.push('Issue title must be at least 5 characters');
        isValid = false;
    }
    
    // Check description
    const description = document.getElementById('issueDescription').value.trim();
    if (description.length < 20) {
        errorMessages.push('Description must be at least 20 characters');
        isValid = false;
    }
    
    // Check location
    const location = document.getElementById('issueLocation').value.trim();
    if (!location) {
        errorMessages.push('Please provide a location');
        isValid = false;
    }
    
    // Check contact info
    const phone = document.getElementById('contactPhone').value.trim();
    if (!phone) {
        errorMessages.push('Please provide a phone number');
        isValid = false;
    }
    
    const email = document.getElementById('contactEmail').value.trim();
    if (!email || !validateEmail(email)) {
        errorMessages.push('Please provide a valid email address');
        isValid = false;
    }
    
    // Check terms agreement
    const agreeTerms = document.getElementById('agreeTerms').checked;
    if (!agreeTerms) {
        errorMessages.push('You must agree to the terms');
        isValid = false;
    }
    
    if (!isValid) {
        showNotification(errorMessages.join('<br>'), 'danger');
    }
    
    return isValid;
}

// Validate Email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Submit Report
function submitReport() {
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.classList.add('btn-loading');
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Gather form data
    const formData = {
        category: document.querySelector('input[name="category"]:checked').value,
        title: document.getElementById('issueTitle').value,
        description: document.getElementById('issueDescription').value,
        priority: document.querySelector('input[name="priority"]:checked').value,
        location: document.getElementById('issueLocation').value,
        contactName: document.getElementById('contactName').value,
        contactPhone: document.getElementById('contactPhone').value,
        contactEmail: document.getElementById('contactEmail').value,
        anonymous: document.getElementById('anonymousReport').checked,
        timestamp: new Date().toISOString()
    };
    
    console.log('Submitting report:', formData);
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('btn-loading');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        document.getElementById('reportIssueForm').reset();
        clearPhotoPreview();
        
    }, 2000);
}

// Show Success Message
function showSuccessMessage() {
    const requestId = 'REQ-' + Math.floor(Math.random() * 10000);
    const cardBody = document.querySelector('.col-lg-8 .card-body');
    
    cardBody.innerHTML = `
        <div class="success-message">
            <i class="bi bi-check-circle"></i>
            <h3>Report Submitted Successfully!</h3>
            <p class="mb-3">Your report has been received and assigned reference number:</p>
            <h4 style="color: var(--primary-color); font-weight: 700;">${requestId}</h4>
            <p class="mt-3 mb-4">You will receive updates via email and can track the status in your dashboard.</p>
            <div class="d-flex gap-2 justify-content-center">
                <button class="btn btn-primary" onclick="location.reload()">
                    <i class="bi bi-plus-lg"></i> Submit Another Report
                </button>
                <button class="btn btn-outline-primary" onclick="window.location.href='dashboard.html'">
                    <i class="bi bi-house"></i> Go to Dashboard
                </button>
            </div>
        </div>
    `;
}

// Handle Photo Upload
function handlePhotoUpload() {
    const photoInput = document.getElementById('issuePhotos');
    
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            const maxFiles = 5;
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            if (files.length > maxFiles) {
                showNotification(`You can only upload up to ${maxFiles} photos`, 'warning');
                return;
            }
            
            files.forEach(file => {
                if (file.size > maxSize) {
                    showNotification(`File ${file.name} is too large. Maximum size is 5MB`, 'warning');
                    return;
                }
                
                if (!file.type.startsWith('image/')) {
                    showNotification(`File ${file.name} is not an image`, 'warning');
                    return;
                }
                
                previewPhoto(file);
            });
        });
    }
}

// Preview Photo
function previewPhoto(file) {
    const reader = new FileReader();
    const previewContainer = document.getElementById('photoPreview');
    
    reader.onload = function(e) {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${e.target.result}" alt="Photo preview">
            <button type="button" class="photo-remove" onclick="this.parentElement.remove()">
                <i class="bi bi-x"></i>
            </button>
        `;
        previewContainer.appendChild(photoItem);
    };
    
    reader.readAsDataURL(file);
}

// Clear Photo Preview
function clearPhotoPreview() {
    document.getElementById('photoPreview').innerHTML = '';
}

// Handle Location Feature
function handleLocationFeature() {
    const locationBtn = document.getElementById('useMyLocation');
    
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            if (!navigator.geolocation) {
                showNotification('Geolocation is not supported by your browser', 'danger');
                return;
            }
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-hourglass-split"></i> Getting location...';
            this.disabled = true;
            
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // Update location input
                    document.getElementById('issueLocation').value = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
                    
                    // Update map
                    updateLocationMap(lat, lng);
                    
                    // Reset button
                    locationBtn.innerHTML = originalText;
                    locationBtn.disabled = false;
                    
                    showNotification('Location obtained successfully', 'success');
                },
                function(error) {
                    console.error('Geolocation error:', error);
                    showNotification('Unable to get your location', 'danger');
                    locationBtn.innerHTML = originalText;
                    locationBtn.disabled = false;
                }
            );
        });
    }
}

// Update Location Map
function updateLocationMap(lat, lng) {
    const mapDiv = document.getElementById('locationMap');
    
    mapDiv.innerHTML = `
        <div style="width: 100%; height: 100%; background: var(--bg-secondary); display: flex; align-items: center; justify-content: center;">
            <div class="text-center">
                <i class="bi bi-geo-alt-fill text-primary" style="font-size: 3rem;"></i>
                <p class="mb-0 mt-2"><strong>Location Set</strong></p>
                <small class="text-muted">Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}</small>
            </div>
        </div>
    `;
}

// Handle Save Draft
function handleSaveDraft() {
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            const draftData = {
                category: document.querySelector('input[name="category"]:checked')?.value || '',
                title: document.getElementById('issueTitle').value,
                description: document.getElementById('issueDescription').value,
                priority: document.querySelector('input[name="priority"]:checked')?.value || 'low',
                location: document.getElementById('issueLocation').value,
                savedAt: new Date().toISOString()
            };
            
            // Save to localStorage
            localStorage.setItem('reportIssueDraft', JSON.stringify(draftData));
            
            showNotification('Draft saved successfully', 'success');
        });
    }
    
    // Load draft if exists
    loadDraft();
}

// Load Draft
function loadDraft() {
    const draft = localStorage.getItem('reportIssueDraft');
    
    if (draft) {
        try {
            const draftData = JSON.parse(draft);
            
            // Ask user if they want to load the draft
            if (confirm('You have a saved draft. Would you like to load it?')) {
                if (draftData.category) {
                    const categoryInput = document.querySelector(`input[name="category"][value="${draftData.category}"]`);
                    if (categoryInput) categoryInput.checked = true;
                }
                
                document.getElementById('issueTitle').value = draftData.title || '';
                document.getElementById('issueDescription').value = draftData.description || '';
                document.getElementById('issueLocation').value = draftData.location || '';
                
                if (draftData.priority) {
                    const priorityInput = document.querySelector(`input[name="priority"][value="${draftData.priority}"]`);
                    if (priorityInput) priorityInput.checked = true;
                }
                
                showNotification('Draft loaded successfully', 'success');
            }
        } catch (e) {
            console.error('Error loading draft:', e);
        }
    }
}

// Handle Form Validation
function handleFormValidation() {
    const form = document.getElementById('reportIssueForm');
    
    // Real-time validation
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    });
    
    // Description character counter
    const description = document.getElementById('issueDescription');
    if (description) {
        description.addEventListener('input', function() {
            const charCount = this.value.length;
            const minChars = 20;
            const sibling = this.nextElementSibling;
            
            if (sibling && sibling.tagName === 'SMALL') {
                if (charCount < minChars) {
                    sibling.textContent = `Minimum 20 characters (${charCount}/${minChars})`;
                    sibling.style.color = 'var(--danger-color)';
                } else {
                    sibling.textContent = `${charCount} characters`;
                    sibling.style.color = 'var(--success-color)';
                }
            }
        });
    }
}

// Handle Anonymous Option
function handleAnonymousOption() {
    const anonymousCheckbox = document.getElementById('anonymousReport');
    
    if (anonymousCheckbox) {
        anonymousCheckbox.addEventListener('change', function() {
            const contactFields = ['contactName', 'contactPhone', 'contactEmail'];
            
            contactFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) {
                    if (this.checked) {
                        field.disabled = true;
                        field.style.opacity = '0.5';
                    } else {
                        field.disabled = false;
                        field.style.opacity = '1';
                    }
                }
            });
        });
    }
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

// Clear form on reset
document.getElementById('reportIssueForm')?.addEventListener('reset', function() {
    clearPhotoPreview();
    document.getElementById('locationMap').innerHTML = `
        <div class="text-center">
            <i class="bi bi-geo-alt" style="font-size: 3rem;"></i>
            <p class="mb-0 mt-2">Click "Use My Current Location" or enter address</p>
        </div>
    `;
});

console.log('Report Issue JavaScript Loaded');