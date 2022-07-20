import { Request, Response } from 'express';
import { IAccount } from '../models/account';
import  accountRepo  from '../models/accountModel';
import auth from '../services/auth';

const accounts: IAccount[] = []

async function getAccounts(req: Request, res: Response, next: any) {

    const accounts = await accountRepo.findAll();

    res.status(200).json(accounts);
}

async function getAccount(req: Request, res: Response, next: any) {

    const id = parseInt(req.params.id);

    if (!id) {
        res.status(400).end();
    }

    const account = await accountRepo.findById(id);

    if (account === null)
        res.status(404).end();

    res.json(account);
}

async function setAccount(req: Request, res: Response, next: any) {

    const accountParams = req.body as IAccount;
    accountParams.password = auth.hashPassword(accountParams.password);

    const account = await accountRepo.set(req.body.id, accountParams);    

    if (account === null)
        res.status(404).end();

    res.status(200).json(account);
}

async function addAccounts(req: Request, res: Response, next: any) {

    const newAccount = req.body as IAccount;
    newAccount.password = auth.hashPassword(newAccount.password);

    const result =  await accountRepo.add(newAccount);
    newAccount.id = result.id;

    res.status(201).json(newAccount);
}

async function login(req: Request, res: Response, next: any) {
    const loginParams = req.body as IAccount;

    const account = await accountRepo.findByEmail(loginParams.email);
   
    if (account === null) {
        return res.status(401).end();
    }
    
    const isValid = auth.comparePassword(loginParams.password, account.password);

    if (!isValid) {
        res.status(401).end();
    }

    const token = auth.sign(account.id);
    res.json({auth: true, token});  
}

function logoutAccount(req: Request, res: Response, next: any) {
    res.json({auth: false, token: null});
}

export default { getAccounts, getAccount, addAccounts, setAccount, login, logoutAccount }