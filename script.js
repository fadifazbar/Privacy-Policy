// 🌙 Theme Toggle & Loader System — Fadi's Assistant

const toggle = document.getElementById("modeToggle");
const loader = document.getElementById("loader");

// 🌓 Restore saved theme or auto-detect system preference
if (!localStorage.getItem("theme")) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("dark", prefersDark);
  localStorage.setItem("theme", prefersDark ? "dark" : "light");
} else if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// 🔆 Initialize toggle emoji + animation position
updateToggleVisual();

function updateToggleVisual() {
  const darkMode = document.body.classList.contains("dark");
  toggle.innerHTML = darkMode
    ? '<span class="emoji" style="transform: translateX(20px); transition: transform 0.3s;">🌕</span>'
    : '<span class="emoji" style="transform: translateX(-20px); transition: transform 0.3s;">☀️</span>';
  toggle.style.backgroundColor = darkMode ? "#f5f2f2" : "#fae3a5";
}

// 🪄 Theme switcher animation
toggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  toggle.classList.add("animating");
  toggle.innerHTML = isDark
    ? '<span class="emoji" style="opacity: 0;">☀️</span>'
    : '<span class="emoji" style="opacity: 0;">🌕</span>';

  setTimeout(() => {
    updateToggleVisual();
    toggle.classList.remove("animating");
  }, 200);
});

// ⏳ Loader fade effect
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 600);
    document.body.classList.add("loaded");
  }, 700);
});

// 🎵 Smooth scroll for internal links (optional enhancement)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});