document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const toggleThemeButton = document.getElementById("toggle-theme-nav");
  const sections = document.querySelectorAll("section");

  // Function to toggle between dark and light backgrounds for all sections
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
      // Toggle the body theme class
      if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }

      // Toggle backgrounds for all sections
      toggleSectionBackgrounds();

      console.log(
        `Dark mode toggled. Current body class list:`,
        body.classList
      );
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
