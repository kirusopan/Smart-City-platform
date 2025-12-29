// Sidebar Toggle
document.getElementById("sidebarToggle").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("active");
});

document.getElementById("sidebarClose").addEventListener("click", function () {
  document.getElementById("sidebar").classList.remove("active");
});

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;
const currentTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", function () {
  const theme = html.getAttribute("data-theme");
  const newTheme = theme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i");
  icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
}

// Traffic Chart
const trafficCtx = document.getElementById("trafficChart").getContext("2d");
const trafficChart = new Chart(trafficCtx, {
  type: "line",
  data: {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
    datasets: [
      {
        label: "North District",
        data: [320, 280, 450, 680, 720, 580, 420],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "South District",
        data: [280, 240, 380, 620, 680, 520, 380],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "East District",
        data: [240, 200, 320, 540, 600, 460, 340],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + " vehicles";
          },
        },
      },
    },
  },
});

// Energy Chart
const energyCtx = document.getElementById("energyChart").getContext("2d");
const energyChart = new Chart(energyCtx, {
  type: "doughnut",
  data: {
    labels: ["Residential", "Commercial", "Industrial", "Public"],
    datasets: [
      {
        data: [35, 28, 22, 15],
        backgroundColor: ["#2563eb", "#10b981", "#f59e0b", "#06b6d4"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
});

// Initialize Map
const map = L.map("cityMap").setView([40.7128, -74.006], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Add markers for incidents
const incidents = [
  { lat: 40.758, lng: -73.9855, type: "danger", title: "Traffic Incident" },
  { lat: 40.7489, lng: -73.968, type: "warning", title: "Road Work" },
  { lat: 40.7306, lng: -73.9352, type: "success", title: "Traffic Normal" },
  { lat: 40.6782, lng: -73.9442, type: "info", title: "IoT Sensor Active" },
];

incidents.forEach((incident) => {
  const colors = {
    danger: "#ef4444",
    warning: "#f59e0b",
    success: "#10b981",
    info: "#06b6d4",
  };

  const marker = L.circleMarker([incident.lat, incident.lng], {
    radius: 8,
    fillColor: colors[incident.type],
    color: "#fff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8,
  }).addTo(map);

  marker.bindPopup(`<b>${incident.title}</b>`);
});

// Counter Animation
function animateCounter(id, start, end, duration) {
  const element = document.getElementById(id);
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = end.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Animate citizen count on load
animateCounter("citizenCount", 0, 1234567, 2000);
