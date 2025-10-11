// 🌙 Theme toggle and page load script for Fadi's Assistant

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("modeToggle");
  const body = document.body;
  const loader = document.getElementById("loader");

  // 🌓 Animate theme button switch (emoji slides directionally)
  function animateThemeSwitch(newIcon, direction) {
    if (!toggle) return;
    toggle.classList.add("switching");

    const emoji = document.createElement("span");
    emoji.textContent = newIcon;
    emoji.className = `theme-emoji ${direction === "right" ? "slide-right" : "slide-left"}`;
    toggle.appendChild(emoji);

    setTimeout(() => {
      toggle.textContent = newIcon;
      toggle.classList.remove("switching");
      emoji.remove();
    }, 400);
  }

  // 🌗 Apply theme
  function applyTheme(isDark) {
    body.classList.toggle("dark", isDark);
    const icon = isDark ? "🌕" : "☀️";
    const bgColor = isDark ? "#f5f2f2" : "#fae3a5";

    if (toggle) {
      toggle.textContent = icon;
      toggle.style.backgroundColor = bgColor;
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  // 💾 Initialize theme from saved preference or system
  (function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);
  })();

  // 🖱️ Toggle theme on click
  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = !body.classList.contains("dark");
      const direction = isDark ? "left" : "right";
      animateThemeSwitch(isDark ? "🌕" : "☀️", direction);
      applyTheme(isDark);
    });
  }

  // 🌀 Page fade-in and loader removal
  window.addEventListener("load", () => {
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 500);
        body.classList.add("loaded");
      }, 700);
    }
  });

  // 🧠 Console signature
  console.log("%cFadi’s Assistant", "color:#5865F2;font-size:18px;font-weight:bold;");
  console.log("Privacy Policy loaded successfully ✅");
});