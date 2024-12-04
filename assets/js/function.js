document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const toggleThemeButton = document.getElementById("toggle-theme-nav");
  const sections = document.querySelectorAll("section");
  const clockElement = document.getElementById("current-time");

  // Function to Clock
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    if (clockElement) {
      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }

  if (clockElement) {
    updateClock();
    setInterval(updateClock, 1000);
  }
  // End of clock

  // Function to Toggle dark/light mode
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

//  End of Toggle Dark/Light

//  Submit button
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission for processing

  // Ratings 
  const ratings = Array.from(document.querySelectorAll('select[name^="rating_"]')).map((field) => parseInt(field.value));
  const averageRating = (ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length).toFixed(1);
  const resultContainer = document.getElementById("averageRating");
  resultContainer.innerHTML = `Average Rating: <span>${averageRating}</span>`;
  resultContainer.style.color = averageRating >= 7.2 ? "green" : averageRating >= 3.5 ? "orange" : "red";
  saveFeedbackToDatabase(averageRating, ratings);
  this.submit();
});

// Rating slider
function updateSliderIcon(slider) {
  const icons = slider.parentElement.querySelectorAll(".icon");
  const value = slider.value;
  icons.forEach((icon) => {
    icon.classList.remove("active");
  });
  const activeIcon = slider.parentElement.querySelector(`.icon[data-value="${value}"]`);
  if (activeIcon) {
    activeIcon.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const countrySelect = document.getElementById("country-select");
  const citySelect = document.getElementById("city-select");

  // Country dropdown
Object.entries(country_and_states.country).forEach(([code, name]) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    countrySelect.appendChild(option);
  });

  countrySelect.addEventListener("change", function () {
      const selectedCountry = this.value;
      citySelect.innerHTML = '<option value="" disabled selected>Select a City</option>'; // Reset city dropdown

      const states = country_and_states.states[selectedCountry];
      if (states) {
          states.forEach((state) => {
              const option = document.createElement("option");
              option.value = state.name;
              option.textContent = state.name;
              citySelect.appendChild(option);
          });
      }
  });
});
// Country Dropdown

// Expanded text area
function autoExpand(field) {
  field.style.height = 'auto';
  field.style.height = field.scrollHeight + 'px';
}