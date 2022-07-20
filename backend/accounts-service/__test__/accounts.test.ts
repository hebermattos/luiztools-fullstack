import request from 'supertest';
import app from '../src/app';
import { IAccount } from '../src/models/account';
import auth from '../src/services/auth';
import accountRepo  from '../src/models/accountRepository';

let jwt: string = '';
let testeId: number;

beforeAll(async ()=>{
    const testAccount: IAccount ={
        name: 'jest',
        email: 'jest@jest.com',
        password: auth.hashPassword('jest@123'),
        domain: 'jest.com',
        status: 0
    };
    
    const result = await accountRepo.add(testAccount);
    
    testeId = result.id!

    jwt = auth.sign(result.id!);
})

afterAll(async () => {
    await accountRepo.removeByEmail('jest@jest.com'); 
    await accountRepo.removeByEmail('test2@email.com');
})

describe('teste account', () => {
    it('POST /accounts - deve retornar 201', async () => {
        const payload ={
            name: "testname",
            email: 'test2@email.com',
            password: 'asdasd123123',
            status: 1,
            domain: 'teste.com'
        }

        const resultado = await request(app).post('/accounts/').send(payload);

        expect(resultado.status).toEqual(201)        
    })

    it('PATCH /accounts:/:id - deve retornar 200', async () => {
        const payload ={         
            name: "testnamee",
            password: 'asdasd123123',
        }

        const resultado = await request(app)
            .patch('/accounts/' + testeId)
            .send(payload)
            .set('x-access-token', jwt);

        expect(resultado.status).toEqual(200)
        expect(resultado.body.id).toEqual(testeId)
    })

    it('PATCH /accounts:/:id - deve retornar 404', async () => {
        const payload = {         
            name: "testname2",
            password: 'asdasd123123',
        }

        const resultado = await request(app)
        .patch('/accounts/111111')
        .send(payload)
        .set('x-access-token', jwt);

        expect(resultado.status).toEqual(404)
    })

    it('PATCH /accounts:/:id - deve retornar 400', async () => {
        const payload ={         
            name: "testname2",
            password: 'asdasd123123',
        }

        const resultado = await request(app)
        .patch('/accounts/abc')
        .send(payload)
        .set('x-access-token', jwt);

        expect(resultado.status).toEqual(400)
    })

    it('GET /accounts/ - deve retornar 200', async () => {

        const resultado = await request(app)
        .get('/accounts/')
        .set('x-access-token', jwt);

        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })

    it('GET /accounts/:id - deve retornar 200', async () => {

        const resultado = await request(app)
        .get('/accounts/' + testeId)
        .set('x-access-token', jwt);

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBe(testeId);
    })

    it('GET /accounts/:id - deve retornar 404', async () => {

        const resultado = await request(app)
        .get('/accounts/123')
        .set('x-access-token', jwt);

        expect(resultado.status).toEqual(404);
    })

    it('GET /accounts/:id - deve retornar 400', async () => {

        const resultado = await request(app)
        .get('/accounts/ddd')
        .set('x-access-token', jwt);

        expect(resultado.status).toEqual(400);
    })
})


