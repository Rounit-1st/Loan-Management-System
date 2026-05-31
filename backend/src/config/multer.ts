import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,

    fileFilter: (_req, file, cb) => {
        const allowed = [
            "application/pdf",
            "image/jpeg",
            "image/png",
        ];

        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF, JPG and PNG allowed"));
        }
    },

    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});