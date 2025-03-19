document.addEventListener("DOMContentLoaded", function () {
  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Smooth scrolling for navigation links (header & footer)
  const navLinks = document.querySelectorAll("nav a.nav-link, .footer-nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth"
        });
      }
    });
  });

  // Display selected file name for file inputs
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach(input => {
    input.addEventListener("change", function () {
      const fileNameSpan = this.closest("label").querySelector(".file-name");
      fileNameSpan.textContent = this.files && this.files.length > 0 ? this.files[0].name : "";
    });
  });

  // Intersection Observer for fade-in effect on sections
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".upload-container, .hero").forEach(section => {
    observer.observe(section);
  });

  // Custom Night Mode Toggle Switch Functionality
  const nightModeToggle = document.getElementById("night-mode-toggle");
  const body = document.body;
  // Initialize theme based on localStorage
  if (localStorage.getItem("theme") === "dark") {
    nightModeToggle.checked = true;
    body.classList.add("dark-mode");
  }
  nightModeToggle.addEventListener("change", function () {
    if (this.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  });

  // Simulate loader spinner display during form submission.
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", function (e) {
      // Show loader overlay (hook this into your actual processing logic)
      const loader = document.getElementById("loader");
      loader.style.display = "flex";
      // Simulate a delay for demonstration (adjust duration as needed)
      setTimeout(() => {
        loader.style.display = "none";
      }, 2000);
    });
  });
});
