import request from 'supertest';
import app from '../src/app';

describe('teste login', () => {
    it('POST /accounts/login - deve retornar 200', async () => {

        const payloadAccount ={
            id: 1,
            name: "testname",
            email: 'test@email.com',
            password: 'asdasd123123',
            status: 1
        }

        await request(app).post('/accounts/').send(payloadAccount);

        const payload ={
            email: 'test@email.com',
            password: 'asdasd123123',
        }
        const resultado = await request(app).post('/accounts/login').send(payload);

        console.log(resultado);

        expect(resultado.status).toEqual(200);
    })

    it('POST /accounts/login - deve retornar 401', async () => {

        const payload ={
            email: 'test123@email.com',
            password: 'asdasd123123',
        }
        const resultado = await request(app).post('/accounts/login').send(payload);

        console.log(resultado);

        expect(resultado.status).toEqual(401);
    })
})

