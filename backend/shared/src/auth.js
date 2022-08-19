"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const privateKey = fs_1.default.readFileSync('./keys/private.key', 'utf8');
const publicKey = fs_1.default.readFileSync('./keys/public.key', 'utf8');
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
function hashPassword(password) {
    return bcryptjs_1.default.hashSync(password, 10);
}
function comparePassword(password, hashedPassword) {
    return bcryptjs_1.default.compareSync(password, hashedPassword);
}
function sign(accountId) {
    const token = { accountId };
    return jsonwebtoken_1.default.sign(token, privateKey, { expiresIn: jwtExpires, algorithm: 'RS256' });
}
function verify(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = yield jsonwebtoken_1.default.verify(token, publicKey, { algorithms: ['RS256'] });
            return { accountId: decoded.accountId };
        }
        catch (error) {
            return null;
        }
    });
}
exports.default = { hashPassword, comparePassword, sign, verify };
