document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("input[type='file']").forEach(input => {
        input.addEventListener("change", function () {
            let fileName = this.files.length ? this.files[0].name : "No file chosen";
            this.nextElementSibling.innerHTML = fileName;
        });
    });
});
