import Joi from "joi";
import { Request, Response } from "express";
import { accountSchema, accountUpdateSchema, loginSchema } from "../models/account";
import auth2 from "../../../shared/src/auth";

function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: any)
{
    const {error} = schema.validate(req.body);

    if (error == null) {
        return next();
    }

    const {details} = error;

    const errorMessage = details.map(x=> x.message).join(',');

    res.status(422).json(errorMessage);
}

function validateAccount(req: Request, res: Response, next: any){
    return validateSchema(accountSchema, req, res, next);
}

function validateUpdateAccount(req: Request, res: Response, next: any){
    return validateSchema(accountUpdateSchema, req, res, next);
}

function validateLogin(req: Request, res: Response, next: any){
    return validateSchema(loginSchema, req, res, next);
}

async function validateAuth(req: Request, res: Response, next: any){
    const token = req.headers['x-access-token'] as string;

    if (!token) return res.status(401).end();

    const payload = await auth2.verify(token);

    if (!payload) return res.status(401).end();
        
    res.locals.payload = payload;

    next();
}

export {validateAccount, validateLogin, validateUpdateAccount, validateAuth };