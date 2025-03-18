document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll for navigation
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Show selected file name in upload field
    document.querySelectorAll("input[type='file']").forEach(input => {
        input.addEventListener("change", function () {
            let fileName = this.files.length ? this.files[0].name : "No file chosen";
            this.nextElementSibling.innerHTML = fileName;
        });
    });
});
