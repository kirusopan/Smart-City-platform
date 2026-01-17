// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initSidebar();
  initThemeToggle();
  initActiveMenu();
  initNotifications();
});

/* ============================================
   SIDEBAR FUNCTIONALITY
   ============================================ */
function initSidebar() {
  const sidebar = document.getElementById("citizenSidebar");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const sidebarClose = document.getElementById("sidebarClose");

  // Toggle sidebar on mobile
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");

      // Add overlay
      if (sidebar.classList.contains("active")) {
        createOverlay();
      } else {
        removeOverlay();
      }
    });
  }

  // Close sidebar
  if (sidebarClose) {
    sidebarClose.addEventListener("click", function () {
      sidebar.classList.remove("active");
      removeOverlay();
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 991) {
      if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        sidebar.classList.remove("active");
        removeOverlay();
      }
    }
  });
}

// Create overlay for mobile sidebar
function createOverlay() {
  if (!document.querySelector(".sidebar-overlay")) {
    const overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 998;
            animation: fadeIn 0.3s ease;
        `;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", function () {
      document.getElementById("citizenSidebar").classList.remove("active");
      removeOverlay();
    });
  }
}

// Remove overlay
function removeOverlay() {
  const overlay = document.querySelector(".sidebar-overlay");
  if (overlay) {
    overlay.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => overlay.remove(), 300);
  }
}

/* ============================================
   THEME TOGGLE (DARK/LIGHT MODE)
   ============================================ */
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem("citizenTheme") || "light";
  html.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = html.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("citizenTheme", newTheme);
      updateThemeIcon(newTheme);

      // Add animation effect
      this.style.transform = "rotate(360deg)";
      setTimeout(() => {
        this.style.transform = "rotate(0deg)";
      }, 300);
    });
  }
}

// Update theme icon
function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (theme === "dark") {
      icon.className = "bi bi-sun";
    } else {
      icon.className = "bi bi-moon-stars";
    }
  }
}

/* ============================================
   ACTIVE MENU ITEM
   ============================================ */
function initActiveMenu() {
  const currentPage =
    window.location.pathname.split("/").pop() || "citizen-dashboard.html";
  const menuItems = document.querySelectorAll(".nav-link");

  menuItems.forEach((item) => {
    const href = item.getAttribute("href");
    if (
      href === currentPage ||
      (href === "#" && currentPage === "citizen-dashboard.html")
    ) {
      // Remove active class from all items
      menuItems.forEach((mi) => mi.classList.remove("active"));
      // Add active class to current item
      item.classList.add("active");
    }
  });
}

/* ============================================
   NOTIFICATIONS
   ============================================ */
function initNotifications() {
  // Mark notification as read
  const notificationItems = document.querySelectorAll(".notification-item");
  notificationItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.remove("unread");
      updateNotificationCount();
    });
  });

  // Mark all as read
  const markAllReadBtn = document.querySelector(".mark-all-read");
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", function (e) {
      e.preventDefault();
      notificationItems.forEach((item) => item.classList.remove("unread"));
      updateNotificationCount();
      showNotification("All notifications marked as read", "success");
    });
  }
}

function updateNotificationCount() {
  const unreadCount = document.querySelectorAll(
    ".notification-item.unread"
  ).length;
  const badge = document.querySelector(".notification-badge");
  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = "block";
    } else {
      badge.style.display = "none";
    }
  }
}

/* ============================================
   NAVIGATION
   ============================================ */
function navigateTo(page) {
  showNotification(`Navigating to ${page}...`, "info");
  // In real app, navigate to actual page
  setTimeout(() => {
    // window.location.href = `${page}.html`;
    console.log(`Navigate to: ${page}`);
  }, 500);
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Show notification/toast
function showNotification(message, type = "info") {
  const toastContainer = getOrCreateToastContainer();

  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
  toastEl.setAttribute("role", "alert");
  toastEl.setAttribute("aria-live", "assertive");
  toastEl.setAttribute("aria-atomic", "true");

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

  // Remove toast after it's hidden
  toastEl.addEventListener("hidden.bs.toast", function () {
    toastEl.remove();
  });
}

// Get or create toast container
function getOrCreateToastContainer() {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container position-fixed top-0 end-0 p-3";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }
  return container;
}

// Format date for display
function formatDate(date) {
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Debounce function for search/input
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

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      showNotification("Copied to clipboard!", "success");
    })
    .catch(function () {
      showNotification("Failed to copy", "danger");
    });
}

// Share functionality
function shareContent(title, text, url) {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: text,
        url: url,
      })
      .then(() => {
        showNotification("Shared successfully!", "success");
      })
      .catch((error) => {
        console.log("Error sharing:", error);
      });
  } else {
    // Fallback - copy to clipboard
    copyToClipboard(url);
  }
}

// Get user location
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation not supported"));
    }
  });
}

// Validate form
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;

  let isValid = true;
  const inputs = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("is-invalid");
      isValid = false;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
  });

  return isValid;
}

// Initialize search functionality
function initSearch(inputId, targetClass, callback) {
  const searchInput = document.getElementById(inputId);
  if (!searchInput) return;

  const debouncedSearch = debounce(function (e) {
    const searchTerm = e.target.value.toLowerCase();
    if (callback) {
      callback(searchTerm);
    } else {
      // Default search behavior
      const items = document.querySelectorAll(targetClass);
      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? "" : "none";
      });
    }
  }, 300);

  searchInput.addEventListener("input", debouncedSearch);
}

/* ============================================
   KEYBOARD SHORTCUTS
   ============================================ */
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + K: Focus search
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    const searchInput = document.querySelector(".search-box input");
    if (searchInput) searchInput.focus();
  }

  // ESC: Close modals and dropdowns
  if (e.key === "Escape") {
    const sidebar = document.getElementById("citizenSidebar");
    if (sidebar && sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
      removeOverlay();
    }
  }
});

/* ============================================
   SCROLL TO TOP
   ============================================ */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Show scroll to top button on scroll
let scrollButton;
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    if (!scrollButton) {
      scrollButton = document.createElement("button");
      scrollButton.className = "scroll-to-top";
      scrollButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
      scrollButton.style.cssText = `
                position: fixed;
                bottom: 5rem;
                right: 2rem;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                color: var(--primary-color);
                font-size: 1.25rem;
                cursor: pointer;
                z-index: 997;
                box-shadow: var(--shadow-md);
                transition: all 0.3s ease;
            `;
      scrollButton.addEventListener("click", scrollToTop);
      document.body.appendChild(scrollButton);
    }
    scrollButton.style.opacity = "1";
    scrollButton.style.pointerEvents = "auto";
  } else if (scrollButton) {
    scrollButton.style.opacity = "0";
    scrollButton.style.pointerEvents = "none";
  }
});

/* ============================================
   ADD ANIMATIONS
   ============================================ */
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .scroll-to-top:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
`;
document.head.appendChild(style);

/* ============================================
   CONSOLE WELCOME MESSAGE
   ============================================ */
console.log(
  "%c👥 Citizen Portal Loaded",
  "font-size: 16px; font-weight: bold; color: #3b82f6;"
);
console.log(
  "%cWelcome to SmartCity Citizen Services",
  "font-size: 12px; color: #6b7280;"
);

/* ============================================
   CITIZEN PANEL
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadUserData();
  initAnimations();
});

/* ============================================
   USER DATA & PERSONALIZATION
   ============================================ */
function loadUserData() {
  // In real app, fetch user data from API
  const userData = {
    name: "John",
    totalReports: 8,
    resolvedReports: 6,
    pendingReports: 2,
  };

  // Update UI with user data
  console.log("User data loaded:", userData);
}

/* ============================================
   NAVIGATION FUNCTIONS
   ============================================ */
function navigateTo(page) {
  showNotification(`Navigating to ${page} page...`, "info");

  // In real app, navigate to actual page
  setTimeout(() => {
    // window.location.href = `${page}.html`;
    console.log(`Navigate to: ${page}`);
  }, 500);
}

function viewNotifications() {
  showNotification("Opening notifications...", "info");
  // In real app, show notifications modal or panel
}

/* ============================================
   REPORT SUBMISSION
   ============================================ */
function submitReport() {
  const form = document.getElementById("reportIssueForm");

  if (form.checkValidity()) {
    showNotification("Submitting your report...", "info");

    // Simulate API call
    setTimeout(() => {
      showNotification(
        "Report submitted successfully! We'll notify you of updates.",
        "success"
      );

      // Hide modal
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("reportIssueModal")
      );
      modal.hide();

      // Reset form
      form.reset();

      // Add new activity to timeline
      addNewActivity();
    }, 1500);
  } else {
    form.reportValidity();
  }
}

function addNewActivity() {
  // In real app, refresh activity feed from API
  console.log("Activity feed updated");
}

/* ============================================
   EMERGENCY CONTACTS
   ============================================ */
function callEmergency(number) {
  if (confirm(`Are you sure you want to call ${number}?`)) {
    showNotification(`Calling ${number}...`, "info");
    // In real app, initiate phone call
    window.location.href = `tel:${number}`;
  }
}

/* ============================================
   ANIMATIONS
   ============================================ */
function initAnimations() {
  // Animate service cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll(".service-card, .info-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.5s ease";
    observer.observe(card);
  });
}

/* ============================================
   NOTIFICATION SYSTEM
   ============================================ */
function showNotification(message, type = "info") {
  const toastContainer = getOrCreateToastContainer();

  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
  toastEl.setAttribute("role", "alert");
  toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

  toastContainer.appendChild(toastEl);
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();

  toastEl.addEventListener("hidden.bs.toast", function () {
    toastEl.remove();
  });
}

function getOrCreateToastContainer() {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container position-fixed top-0 end-0 p-3";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }
  return container;
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Format date for display
function formatDate(date) {
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
}

// Get user location
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation not supported"));
    }
  });
}

// Enable location for report
async function enableLocation() {
  try {
    const location = await getUserLocation();
    showNotification("Location detected successfully!", "success");
    console.log("User location:", location);
    // In real app, use this location to pre-fill address
  } catch (error) {
    showNotification(
      "Unable to detect location. Please enter manually.",
      "warning"
    );
  }
}

/* ============================================
   SEARCH & FILTER (for complaint tracking page)
   ============================================ */
function searchComplaints(query) {
  // In real app, search through user's complaints
  console.log("Searching complaints:", query);
}

function filterByStatus(status) {
  // In real app, filter complaints by status
  console.log("Filtering by status:", status);
}

/* ============================================
   FEEDBACK & RATING
   ============================================ */
function submitFeedback(complaintId, rating, comment) {
  showNotification("Submitting your feedback...", "info");

  // Simulate API call
  setTimeout(() => {
    showNotification("Thank you for your feedback!", "success");
  }, 1000);
}

function rateService(complaintId, rating) {
  showNotification(`You rated this service ${rating} stars`, "success");

  // In real app, send rating to API
  console.log("Service rated:", { complaintId, rating });
}

/* ============================================
   DOCUMENT UPLOAD
   ============================================ */
function uploadDocument(file) {
  if (!file) return;

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    showNotification("Please upload only image files (JPG, PNG)", "danger");
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showNotification("File size must be less than 5MB", "danger");
    return;
  }

  showNotification("Uploading image...", "info");

  // In real app, upload to server
  setTimeout(() => {
    showNotification("Image uploaded successfully!", "success");
  }, 1000);
}

/* ============================================
   SHARE FUNCTIONALITY
   ============================================ */
function shareAnnouncement(title, url) {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        url: url,
      })
      .then(() => {
        showNotification("Announcement shared!", "success");
      })
      .catch(console.error);
  } else {
    // Fallback - copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      showNotification("Link copied to clipboard!", "success");
    });
  }
}

/* ============================================
   ACCESSIBILITY
   ============================================ */

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  // ESC key to close modals
  if (e.key === "Escape") {
    const modals = document.querySelectorAll(".modal.show");
    modals.forEach((modal) => {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) modalInstance.hide();
    });
  }
});

// Focus trap for modals
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}

/* ============================================
   AUTO-SAVE DRAFT (for forms)
   ============================================ */
let autoSaveTimer;

function autoSaveDraft(formId) {
  clearTimeout(autoSaveTimer);

  autoSaveTimer = setTimeout(() => {
    const form = document.getElementById(formId);
    if (!form) return;

    const formData = new FormData(form);
    const draftData = {};

    formData.forEach((value, key) => {
      draftData[key] = value;
    });

    // Save to localStorage
    localStorage.setItem(`draft_${formId}`, JSON.stringify(draftData));
    console.log("Draft saved");
  }, 2000);
}

// Load draft on form init
function loadDraft(formId) {
  const draft = localStorage.getItem(`draft_${formId}`);
  if (!draft) return;

  const draftData = JSON.parse(draft);
  const form = document.getElementById(formId);

  Object.keys(draftData).forEach((key) => {
    const field = form.elements[key];
    if (field) field.value = draftData[key];
  });

  showNotification("Draft restored", "info");
}

// Clear draft after successful submission
function clearDraft(formId) {
  localStorage.removeItem(`draft_${formId}`);
}

/* ============================================
   INITIALIZE FILE UPLOAD PREVIEW
   ============================================ */
function initFileUploadPreview() {
  const fileInputs = document.querySelectorAll('input[type="file"]');

  fileInputs.forEach((input) => {
    input.addEventListener("change", function (e) {
      const files = e.target.files;
      if (files.length > 0) {
        showNotification(`${files.length} file(s) selected`, "info");

        // Preview images
        Array.from(files).forEach((file) => {
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (e) {
              console.log("Image loaded for preview");
              // In real app, show preview
            };
            reader.readAsDataURL(file);
          }
        });
      }
    });
  });
}

// Initialize file upload previews
initFileUploadPreview();

// Console log
console.log(
  "%c👥 Citizen Panel Loaded",
  "font-size: 14px; font-weight: bold; color: #2563eb;"
);
console.log(
  "%cWelcome to the Smart City platform!",
  "font-size: 12px; color: #64748b;"
);
