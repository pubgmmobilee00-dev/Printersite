const input = document.getElementById("photoInput");
const status = document.getElementById("status");

input.addEventListener("change", () => {

    const files = Array.from(input.files);

    if (files.length === 0) {
        return;
    }

    status.textContent =
        `✅ ${files.length} şəkil seçildi.`;

});