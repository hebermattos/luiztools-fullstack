import { Router, Request, Response } from "express";
import accountsContoller from "../controllers/accounts";
import accountSchema from "../models/account";

function validateAccount(req: Request, res: Response, next: any)
{
    const {error} = accountSchema.validate(req.body);

    if (error == null) {
        return next();
    }

    const {details} = error;

    const errorMessage = details.map(x=> x.message).join(',');

    res.status(422).json(errorMessage);
}

const router = Router();

router.get('/accounts', accountsContoller.getAccounts);

router.get('/accounts/:id', accountsContoller.getAccount);

router.post('/accounts', validateAccount, accountsContoller.addAccounts);

export default router;