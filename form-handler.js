document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const loadingMessage = document.querySelector(".loading");
  const sentMessage = document.querySelector(".sent-message");
  const errorMessage = document.querySelector(".error-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    loadingMessage.style.display = "block";
    sentMessage.style.display = "none";
    errorMessage.style.display = "none";

    const formData = new FormData(form);

    fetch("https://formspree.io/f/mgveknrr", {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    })
      .then((response) => {
        loadingMessage.style.display = "none";
        if (response.ok) {
          sentMessage.style.display = "block";
          form.reset();
        } else {
          errorMessage.style.display = "block";
        }
      })
      .catch((error) => {
        loadingMessage.style.display = "none";
        errorMessage.style.display = "block";
        console.error("Error:", error);
      });
  });
});
