import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '@cove/shared';

const JWT_SECRET = process.env.JWT_SECRET || 'cove-super-secret-jwt-key-for-development-382910';
const JWT_EXPIRES_IN = '7d';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
