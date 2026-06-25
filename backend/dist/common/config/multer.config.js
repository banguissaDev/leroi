"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerVendorOptions = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const ALLOWED_MIME_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const UPLOAD_DEST = (0, path_1.join)(process.cwd(), 'uploads', 'vendors');
exports.multerVendorOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: UPLOAD_DEST,
        filename: (_req, file, callback) => {
            const uniqueName = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
            callback(null, uniqueName);
        },
    }),
    limits: {
        fileSize: MAX_FILE_SIZE_BYTES,
    },
    fileFilter: (_req, file, callback) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return callback(new common_1.BadRequestException(`Type de fichier non autorisé : ${file.mimetype}. Formats acceptés : PDF, JPG, PNG, WebP.`), false);
        }
        callback(null, true);
    },
};
//# sourceMappingURL=multer.config.js.map