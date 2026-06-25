import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

/** Types de fichiers autorisés pour les documents fournisseurs */
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

/** Taille maximale : 10 Mo */
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

/** Dossier de stockage des documents */
const UPLOAD_DEST = join(process.cwd(), 'uploads', 'vendors');

export const multerVendorOptions: MulterOptions = {
  storage: diskStorage({
    destination: UPLOAD_DEST,
    filename: (_req, file, callback) => {
      // Nom unique : uuid + extension originale
      const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
      callback(null, uniqueName);
    },
  }),

  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
  },

  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return callback(
        new BadRequestException(
          `Type de fichier non autorisé : ${file.mimetype}. Formats acceptés : PDF, JPG, PNG, WebP.`,
        ),
        false,
      );
    }
    callback(null, true);
  },
};
