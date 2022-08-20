declare function hashPassword(password: string): string;
declare function comparePassword(password: string, hashedPassword: string): boolean;
declare function sign(accountId: number): string;
declare function verify(token: string): Promise<{
    accountId: number;
} | null>;
declare const _default: {
    hashPassword: typeof hashPassword;
    comparePassword: typeof comparePassword;
    sign: typeof sign;
    verify: typeof verify;
};
export default _default;
//# sourceMappingURL=auth.d.ts.map