const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

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
    storage: storage
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(uploadDir));

app.post("/api/upload", upload.array("photos", 100), (req, res) => {

    res.json({
        success: true,
        count: req.files.length
    });

});

app.listen(PORT, () => {
    console.log("Server işləyir: http://localhost:" + PORT);
});