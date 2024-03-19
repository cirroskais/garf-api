import { createCipheriv, createDecipheriv, scrypt, randomBytes } from "node:crypto";

const KEY = ((await scryptAsync(process.env.ENCRYPTION_KEY, 32)) as Buffer).toString("hex");

function scryptAsync(password: string, length: number) {
    return new Promise((resolve, reject) => {
        const pwBuf = Buffer.from(password);
        scrypt(pwBuf, process.env.ENCRYPTION_SALT, length, (err, key) => {
            if (err) return reject(err);
            resolve(key);
        });
    });
}

export async function encrypt(data: string) {
    const iv = randomBytes(16);
    const cipher = createCipheriv("aes-256-ccm", KEY, iv);

    let encrypted = cipher.update(data, "utf8", "base64url");
    encrypted += cipher.final("base64url");

    return { encrypted, iv: iv.toString("hex") };
}

export async function decrypt(data: string, iv: string) {
    const ivBuf = Buffer.from(iv, "hex");
    const decipher = createDecipheriv("aes-256-ccm", KEY, ivBuf);

    let decrypted = decipher.update(data, "base64url", "utf-8");
    try {
        decrypted += decipher.final("utf8");
    } catch {
        return false;
    }

    return { decrypted };
}
