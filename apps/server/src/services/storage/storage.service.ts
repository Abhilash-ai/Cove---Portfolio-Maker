import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface StorageResult {
  key: string;
  url: string;
  mimeType: string;
  size: number;
  originalName: string;
}

export interface StorageProvider {
  save(file: Express.Multer.File, folder?: string): Promise<StorageResult>;
  delete(key: string): Promise<void>;
  getUrl(key: string): string;
}

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'application/pdf',
]);

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit

export class LocalStorageProvider implements StorageProvider {
  private baseUploadDir: string;
  private baseUrlPath: string;

  constructor() {
    this.baseUploadDir = path.resolve(__dirname, '../../../uploads');
    this.baseUrlPath = '/uploads';

    if (!fs.existsSync(this.baseUploadDir)) {
      fs.mkdirSync(this.baseUploadDir, { recursive: true });
    }
  }

  async save(file: Express.Multer.File, folder = 'general'): Promise<StorageResult> {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      throw new Error(`Unsupported file format: ${file.mimetype}. Allowed: Images (JPG, PNG, WebP, GIF, SVG), Video (MP4, WebM), PDF.`);
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File exceeds max size of 50MB (actual: ${(file.size / (1024 * 1024)).toFixed(1)}MB).`);
    }

    const folderPath = path.join(this.baseUploadDir, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const ext = path.extname(file.originalname) || '';
    const uniqueName = `${crypto.randomUUID()}${ext}`;
    const relativeKey = `${folder}/${uniqueName}`;
    const targetPath = path.join(this.baseUploadDir, relativeKey);

    fs.writeFileSync(targetPath, file.buffer);

    return {
      key: relativeKey,
      url: `${this.baseUrlPath}/${relativeKey.replace(/\\/g, '/')}`,
      mimeType: file.mimetype,
      size: file.size,
      originalName: file.originalname,
    };
  }

  async delete(key: string): Promise<void> {
    const fullPath = path.join(this.baseUploadDir, key);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  getUrl(key: string): string {
    return `${this.baseUrlPath}/${key.replace(/\\/g, '/')}`;
  }
}

// S3-compatible production driver shape
export class S3StorageProvider implements StorageProvider {
  constructor(private bucket: string, private region: string) {}

  async save(file: Express.Multer.File, folder = 'general'): Promise<StorageResult> {
    // S3 PutObject implementation will be active when AWS/S3 credentials are provided
    throw new Error('S3 driver requires cloud credentials; using local disk storage in development.');
  }

  async delete(key: string): Promise<void> {
    // S3 DeleteObject
  }

  getUrl(key: string): string {
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }
}

// Singleton storage provider export
export const storageService: StorageProvider = new LocalStorageProvider();
