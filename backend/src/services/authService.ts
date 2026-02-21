import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface User {
    id: string;
    email: string;
    name?: string;
    passwordHash: string;
    createdAt: string;
}

interface UserRow extends RowDataPacket {
    id: string;
    email: string;
    name: string | null;
    password_hash: string;
    created_at: string;
}

const MAX_USERS = 10;

export class AuthService {
    // ─── Register ────────────────────────────────────────────────────────────
    static async register(
        email: string,
        password: string,
        name?: string
    ): Promise<{ user: Omit<User, 'passwordHash'>; token: string }> {
        // Check user limit
        const [countRows] = await pool.query<RowDataPacket[]>(
            'SELECT COUNT(*) AS cnt FROM users'
        );
        if ((countRows[0] as any).cnt >= MAX_USERS) {
            throw new Error('User limit reached (Max 10 users).');
        }

        // Check duplicate email
        const [existing] = await pool.query<UserRow[]>(
            'SELECT id FROM users WHERE email = ? LIMIT 1',
            [email]
        );
        if (existing.length > 0) {
            throw new Error('User already exists.');
        }

        const id = uuidv4();
        const passwordHash = await bcrypt.hash(password, 10);
        const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        await pool.query<ResultSetHeader>(
            'INSERT INTO users (id, email, name, password_hash, created_at) VALUES (?, ?, ?, ?, ?)',
            [id, email, name ?? null, passwordHash, createdAt]
        );

        const safeUser = { id, email, name, createdAt };
        const token = this.generateToken({ id, email, name, passwordHash, createdAt });

        return { user: safeUser, token };
    }

    // ─── Login ────────────────────────────────────────────────────────────────
    static async login(
        email: string,
        password: string
    ): Promise<{ user: Omit<User, 'passwordHash'>; token: string }> {
        const [rows] = await pool.query<UserRow[]>(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        );

        if (rows.length === 0) {
            throw new Error('Invalid credentials.');
        }

        const row = rows[0];
        const isMatch = await bcrypt.compare(password, row.password_hash);
        if (!isMatch) {
            throw new Error('Invalid credentials.');
        }

        const user: User = {
            id: row.id,
            email: row.email,
            name: row.name ?? undefined,
            passwordHash: row.password_hash,
            createdAt: row.created_at,
        };

        const token = this.generateToken(user);
        const { passwordHash: _, ...safeUser } = user;
        return { user: safeUser, token };
    }

    // ─── Token helpers ────────────────────────────────────────────────────────
    static generateToken(user: User): string {
        return jwt.sign(
            { id: user.id, email: user.email },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'] }
        );
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, config.jwt.secret);
        } catch {
            throw new Error('Invalid token');
        }
    }

    // ─── Get user by ID ───────────────────────────────────────────────────────
    static async getUserById(id: string): Promise<Omit<User, 'passwordHash'> | null> {
        const [rows] = await pool.query<UserRow[]>(
            'SELECT id, email, name, created_at FROM users WHERE id = ? LIMIT 1',
            [id]
        );

        if (rows.length === 0) return null;

        const row = rows[0];
        return {
            id: row.id,
            email: row.email,
            name: row.name ?? undefined,
            createdAt: row.created_at,
        };
    }
}
