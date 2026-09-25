const input = document.getElementById("photoInput");
const status = document.getElementById("status");

input.addEventListener("change", async () => {

    const files = Array.from(input.files);

    if (files.length === 0) {
        return;
    }

    status.textContent =
        `⏳ ${files.length} şəkil yüklənir...`;

    const formData = new FormData();

    files.forEach(file => {
        formData.append("photos", file);
    });

    try {

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (response.ok && result.success) {

            status.textContent =
                `✅ ${result.count} şəkil uğurla göndərildi!`;

            input.value = "";

        } else {

            status.textContent =
                "❌ Şəkilləri göndərmək mümkün olmadı.";

        }

    } catch (error) {

        console.error(error);

        status.textContent =
            "❌ Serverə qoşulmaq mümkün olmadı.";

    }

});
