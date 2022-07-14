import {Request, Response} from 'express';
import accountSchema, { IAccount } from '../models/account';

const accounts: IAccount[] = []

function getAccounts(req: Request, res: Response, next: any){
    res.json(accounts);
}

function getAccount(req: Request, res: Response, next: any){

    const id = parseInt(req.params.id);

    if (!id) {
        res.status(400).end();  
    }

    const index = accounts.findIndex(item => item.id == id);

    if (index === -1) 
        res.status(404).end();    

    res.json(accounts[index]);
}


function addAccounts(req: Request, res: Response, next: any){  

    const newAccount = req.body as IAccount;

    accounts.push(newAccount);

    res.status(201).json(newAccount);
}

export default {getAccounts, getAccount, addAccounts}