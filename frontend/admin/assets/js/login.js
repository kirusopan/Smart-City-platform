// Switch between Login and Register tabs
function switchTab(tab) {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const formContents = document.querySelectorAll(".form-content");

  tabButtons.forEach((btn) => btn.classList.remove("active"));
  formContents.forEach((content) => content.classList.remove("active"));

  if (tab === "login") {
    tabButtons[0].classList.add("active");
    document.getElementById("loginForm").classList.add("active");
  } else {
    tabButtons[1].classList.add("active");
    document.getElementById("registerForm").classList.add("active");
  }

  clearAlerts();
}

// Toggle password visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const icon = input.parentElement.querySelector(".password-toggle i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("bi-eye");
    icon.classList.add("bi-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("bi-eye-slash");
    icon.classList.add("bi-eye");
  }
}

// Handle login
function handleLogin(event) {
  event.preventDefault();
  const btn = document.getElementById("loginBtn");
  const originalText = btn.innerHTML;

  btn.innerHTML = '<span class="spinner"></span> Logging in...';
  btn.disabled = true;

  clearAlerts();

  // Simulate API call
  setTimeout(() => {
    showAlert("Login successful! Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  }, 2000);
}

// Handle registration
function handleRegister(event) {
  event.preventDefault();
  const password = document.getElementById("registerPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (password !== confirm) {
    showAlert("Passwords do not match!", "danger");
    return;
  }

  const btn = document.getElementById("registerBtn");
  const originalText = btn.innerHTML;

  btn.innerHTML = '<span class="spinner"></span> Creating account...';
  btn.disabled = true;

  clearAlerts();

  // Simulate API call
  setTimeout(() => {
    showAlert("Account created successfully! Please login.", "success");
    btn.innerHTML = originalText;
    btn.disabled = false;

    setTimeout(() => {
      switchTab("login");
    }, 2000);
  }, 2000);
}

// Social login
function socialLogin(provider) {
  showAlert(`Redirecting to ${provider} authentication...`, "success");
  // In real app, redirect to OAuth provider
}

// Show forgot password alert
function showForgotPassword(event) {
  event.preventDefault();
  const email = prompt("Enter your email address:");
  if (email) {
    showAlert("Password reset link sent to your email!", "success");
  }
}

// Show alert message
function showAlert(message, type) {
  const container = document.getElementById("alertContainer");
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert-custom alert-${type}`;

  const icon =
    type === "success" ? "check-circle-fill" : "exclamation-triangle-fill";
  alertDiv.innerHTML = `
                <i class="bi bi-${icon}"></i>
                <span>${message}</span>
            `;

  container.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

// Clear all alerts
function clearAlerts() {
  document.getElementById("alertContainer").innerHTML = "";
}

// Add enter key support for password toggle
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && e.target.classList.contains("form-control")) {
    e.target.closest("form").dispatchEvent(new Event("submit"));
  }
});

console.log(
  "%c🔐 Smart City Login",
  "font-size: 16px; font-weight: bold; color: #2563eb;"
);
console.log(
  "%cSecure authentication system ready",
  "font-size: 12px; color: #64748b;"
);
