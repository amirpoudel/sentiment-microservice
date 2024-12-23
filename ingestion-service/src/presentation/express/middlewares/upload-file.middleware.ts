import multer from 'multer';
import fs from 'fs';
import path from 'path';

function generateUniqueFileName(req: any, file: any, cb: Function) {
    const name = req.body?.name ? req.body.name : 'farmers-documents';
    const cleanName = name.replace(/\s/g, '-').toLowerCase();
    const timestamp = Date.now();
    const fileExtension = path.extname(file.originalname);
    const uniqueFileName = `${cleanName}-${timestamp}${fileExtension}`;
    cb(null, uniqueFileName);
}

const fileFilter = function (req: any, file: any, cb: Function) {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedDocumentTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const allowedCSVTypes = ['text/csv', 'application/vnd.ms-excel'];

    if (file.fieldname === 'image') {
        if (allowedImageTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only images (JPEG, PNG, GIF) are allowed!'), false);
        }
    } else if (file.fieldname === 'pdf') {
        if (allowedDocumentTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    } else if (file.fieldname === 'csv') {
        if (allowedCSVTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only CSV files are allowed!'), false);
        }
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const storage = multer.diskStorage({
    destination: async function (req: any, file: any, cb: Function) {
        const destinationPath = path.join('./', 'storage', 'uploads');
        try {
            await fs.promises.mkdir(destinationPath, { recursive: true });
            cb(null, destinationPath);
        } catch (error) {
            cb(new Error('Failed to create directory for file uploads'), null);
        }
    },
    filename: generateUniqueFileName,
});

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 50, // 50MB limit
    }
});
