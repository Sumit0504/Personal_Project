document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("#navbar .nav-link");
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
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll(".upload-container").forEach(section => {
        observer.observe(section);
      });
    
      // Custom Night Mode Toggle Switch Functionality
      // This uses a hidden checkbox (#night-mode-toggle) with a styled label
      const nightModeToggle = document.getElementById("night-mode-toggle");
      const body = document.body;
      
      // Set initial state based on localStorage
      if (localStorage.getItem("theme") === "dark") {
        nightModeToggle.checked = true;
        body.classList.add("dark-mode");
      }
      
      // Listen for changes on the toggle switch
      nightModeToggle.addEventListener("change", function () {
        if (this.checked) {
          body.classList.add("dark-mode");
          localStorage.setItem("theme", "dark");
        } else {
          body.classList.remove("dark-mode");
          localStorage.setItem("theme", "light");
        }
      });
    });