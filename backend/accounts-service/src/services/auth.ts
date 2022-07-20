import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const privateKey = fs.readFileSync('./keys/private.key', 'utf8');
const publicKey = fs.readFileSync('./keys/public.key', 'utf8');
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);

function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

function comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
}

type Token = { accountId: number };

function sign(accountId: number) {
    const token: Token = { accountId };
    return jwt.sign(token, privateKey, { expiresIn: jwtExpires, algorithm: 'RS256' })
}

async function verify(token: string) {
    try {
        const decoded = await jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as Token;
        return { accountId: decoded.accountId };
    } catch (error) {
        return null;
    }
}

export default { hashPassword, comparePassword, sign, verify };