import { Router, Request, Response } from "express";
import Joi from "joi";
import accountsContoller from "../controllers/accounts";
import {accountSchema, loginSchema} from "../models/account";

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

function validateLogin(req: Request, res: Response, next: any){
    return validateSchema(loginSchema, req, res, next);
}

const router = Router();

router.get('/accounts', accountsContoller.getAccounts);

router.get('/accounts/:id', accountsContoller.getAccount);

router.patch('/accounts/:id', accountsContoller.setAccount);

router.post('/accounts', validateAccount, accountsContoller.addAccounts);

router.post('/accounts/login', validateLogin, accountsContoller.login);

export default router;