document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const uploadLabel = document.querySelector('.custom-file-upload');
    const filePreview = document.getElementById('filePreview');

    // Drag & Drop handling
    uploadLabel.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadLabel.classList.add('dragover');
    });

    uploadLabel.addEventListener('dragleave', () => {
        uploadLabel.classList.remove('dragover');
    });

    uploadLabel.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadLabel.classList.remove('dragover');
        fileInput.files = e.dataTransfer.files;
        handleFileSelect();
    });

    // File input change handler
    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect() {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            filePreview.innerHTML = `
                <i class="fas fa-file-check me-2"></i>
                Selected: <strong>${fileName}</strong>
            `;
        }
    }

    // Auto-generate filename from input file
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const originalName = fileInput.files[0].name;
            const cleanName = originalName.replace(/\.[^/.]+$/, "");
            document.getElementById('customName').value = `${cleanName}`;
        }
    });
});