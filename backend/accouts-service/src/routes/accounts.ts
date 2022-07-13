import { Router, Request, Response } from "express";
import accountsContoller from "../controllers/accounts";

const router = Router();

router.get('/accounts', accountsContoller.getAccounts);

router.get('/accounts/:id', accountsContoller.getAccount);

router.post('/accounts', accountsContoller.addAccounts);

export default router;