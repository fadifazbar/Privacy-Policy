// 🌙 Theme toggle and page load script for Fadi's Assistant

const toggle = document.getElementById("modeToggle");
const body = document.body;
const loader = document.getElementById("loader");

// 🌓 Animate theme button switch (emoji slides directionally)
function animateThemeSwitch(newIcon, direction) {
  toggle.classList.add("switching");
  const emoji = document.createElement("span");
  emoji.textContent = newIcon;
  emoji.classList.add("theme-emoji", direction === "right" ? "slide-right" : "slide-left");
  toggle.appendChild(emoji);

  setTimeout(() => {
    toggle.textContent = newIcon;
    toggle.classList.remove("switching");
    emoji.remove();
  }, 400);
}

// 🌗 Initialize theme
function applyTheme(isDark) {
  if (isDark) {
    body.classList.add("dark");
    toggle.textContent = "🌕";
    toggle.style.backgroundColor = "#f5f2f2";
  } else {
    body.classList.remove("dark");
    toggle.textContent = "☀️";
    toggle.style.backgroundColor = "#fae3a5";
  }
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// 💾 Apply saved theme or system preference
(function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);
})();

// 🖱️ Handle toggle click
toggle.addEventListener("click", () => {
  const isDark = !body.classList.contains("dark");
  const direction = isDark ? "left" : "right"; // left = light → dark, right = dark → light
  animateThemeSwitch(isDark ? "🌕" : "☀️", direction);
  applyTheme(isDark);
});

// 🌀 Page fade-in and loader removal
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 500);
    body.classList.add("loaded");
  }, 700);
});

// 🧠 Console signature
console.log("%cFadi’s Assistant", "color:#5865F2;font-size:18px;font-weight:bold;");
console.log("Privacy Policy loaded successfully ✅");