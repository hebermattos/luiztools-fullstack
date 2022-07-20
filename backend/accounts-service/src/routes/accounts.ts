import { Router } from "express";
import accountsContoller from "../controllers/accounts";
import { validateUpdateAccount, validateAccount, validateLogin, validateAuth } from "../middlewares/auth"

const router = Router();

router.get('/accounts', validateAuth, accountsContoller.getAccounts);

router.get('/accounts/:id', validateAuth, accountsContoller.getAccount);

router.patch('/accounts/:id', validateAuth, validateUpdateAccount, accountsContoller.setAccount);

router.post('/accounts', validateAccount, accountsContoller.addAccounts);

router.post('/accounts/login', validateLogin, accountsContoller.login);

export default router;