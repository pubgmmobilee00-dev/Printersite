const input = document.getElementById("photoInput");
const status = document.getElementById("status");

input.addEventListener("change", function () {

    const files = input.files;

    if (files.length > 0) {
        status.textContent =
            "✅ " + files.length + " şəkil seçildi!";
    }

});
