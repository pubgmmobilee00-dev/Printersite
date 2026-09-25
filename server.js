const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        const name =
            Date.now() +
            "-" +
            Math.random().toString(36).substring(2, 8) +
            ext;

        cb(null, name);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 30 * 1024 * 1024
    }
});

// Əsas sayt
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// CSS və JS
app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "style.css"));
});

app.get("/script.js", (req, res) => {
    res.sendFile(path.join(__dirname, "script.js"));
});

// Şəkil yükləmə
app.post("/api/upload", upload.array("photos", 100), (req, res) => {
    res.json({
        success: true,
        count: req.files.length,
        message: `${req.files.length} şəkil yükləndi`
    });
});

// Admin üçün şəkillər
app.get("/api/photos", (req, res) => {

    const files = fs.readdirSync(uploadDir);

    const photos = files
        .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
        .map(file => ({
            name: file,
            url: `/uploads/${file}`
        }));

    res.json(photos);
});

// Yüklənmiş şəkillərə giriş
app.use("/uploads", express.static(uploadDir));

app.listen(PORT, () => {
    console.log(`Server işləyir: ${PORT}`);
});
