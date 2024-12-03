document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const toggleThemeButton = document.getElementById("toggle-theme-nav");
  const sections = document.querySelectorAll("section");
  const clockElement = document.getElementById("current-time");

  // Function to update the clock
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    if (clockElement) {
      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }

  // Initialize the clock immediately and set it to update every second
  if (clockElement) {
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Function to toggle dark and light mode for all sections
  function toggleSectionBackgrounds() {
    sections.forEach((section) => {
      if (section.classList.contains("dark-background")) {
        section.classList.remove("dark-background");
        section.classList.add("light-background");
      } else if (section.classList.contains("light-background")) {
        section.classList.remove("light-background");
        section.classList.add("dark-background");
      }
    });
  }


  // Theme toggle button logic
  if (toggleThemeButton) {
    toggleThemeButton.addEventListener("click", () => {
      if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
      toggleSectionBackgrounds();
    });
  }

  // Set the initial theme based on localStorage
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    body.classList.add("dark");
    sections.forEach((section) => {
      section.classList.remove("light-background");
      section.classList.add("dark-background");
    });
  } else {
    body.classList.remove("dark");
    sections.forEach((section) => {
      section.classList.remove("dark-background");
      section.classList.add("light-background");
    });
  }
});
