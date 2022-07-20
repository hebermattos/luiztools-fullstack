import request from 'supertest';
import app from '../src/app';
import { IAccount } from '../src/models/account';
import accountRepo  from '../src/models/accountRepository';
import auth from '../src/services/auth';

beforeAll(async ()=>{
    const testAccount: IAccount ={
        name: 'jest',
        email: 'jest2@jest.com',
        password: auth.hashPassword('jest@123'),
        domain: 'jest.com',
        status: 0
    };

    await accountRepo.add(testAccount);
})

afterAll(async () => {
    await accountRepo.removeByEmail('jest2@jest.com');
})

describe('teste login', () => {
    it('POST /accounts/login - deve retornar 200', async () => {

        const payload ={
            email: 'jest2@jest.com',
            password: 'jest@123',
        }
        const resultado = await request(app).post('/accounts/login').send(payload);

        expect(resultado.status).toEqual(200);
    })

    it('POST /accounts/login - deve retornar 401', async () => {

        const payload ={
            email: 'test123@email.com',
            password: 'asdasd123123',
        }
        const resultado = await request(app).post('/accounts/login').send(payload);

        expect(resultado.status).toEqual(401);
    })
})

