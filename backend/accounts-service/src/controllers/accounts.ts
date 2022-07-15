import { Request, Response } from 'express';
import { IAccount } from '../models/account';
import AccountRepo, { AccountModel } from '../models/accountModel';

const accounts: IAccount[] = []

async function getAccounts(req: Request, res: Response, next: any) {

    const accounts = await AccountRepo.findAll<AccountModel>();

    res.json(accounts);
}

function getAccount(req: Request, res: Response, next: any) {

    const id = parseInt(req.params.id);

    if (!id) {
        res.status(400).end();
    }

    const index = accounts.findIndex(item => item.id == id);

    if (index === -1)
        res.status(404).end();

    res.json(accounts[index]);
}

function setAccount(req: Request, res: Response, next: any) {

    const accountParams = req.body as IAccount;

    const id = parseInt(req.params.id);

    if (!id) {
        res.status(400).end();
    }

    const index = accounts.findIndex(item => item.id == id);

    if (index === -1)
        res.status(404).end();

    const account = accounts[index];

    if (accountParams.name) {
        account.name = accountParams.name
    }

    if (accountParams.email) {
        account.email = accountParams.email
    }

    if (accountParams.password) {
        account.password = accountParams.password
    }

    accounts[index] = account;
    res.status(200).json(account);
}

function addAccounts(req: Request, res: Response, next: any) {

    const newAccount = req.body as IAccount;

    accounts.push(newAccount);

    res.status(201).json(newAccount);
}

function login(req: Request, res: Response, next: any) {
    const loginParams = req.body as IAccount;

    const index = accounts.findIndex(item => item.email == loginParams.email && item.password == loginParams.password);

    if (index === -1)
        res.status(401).end();

    res.status(200).json({ auth: true, token: "" });
}

export default { getAccounts, getAccount, addAccounts, setAccount, login }