import request from 'supertest'
import app from './../src/app'
import '@types/jest';

describe('teste account', () => {
    it('POST /accounts - deve retornar 201', async () => {
        const payload ={
            id: 1,
            name: "testname",
            email: 'test@email.com',
            password: 'asdasd123123',
            status: 1
        }

        const resultado = await request(app).post('/accounts/').send(payload);

        expect(resultado.status).toEqual(201)
    })

    it('GET /accounts/ - deve retornar 200', async () => {

        const resultado = await request(app).get('/accounts/');

        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })

    it('GET /accounts/:id - deve retornar 200', async () => {

        const resultado = await request(app).get('/accounts/1');

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBe(1);
    })

    it('GET /accounts/:id - deve retornar 404', async () => {

        const resultado = await request(app).get('/accounts/123');

        expect(resultado.status).toEqual(404);
    })

    it('GET /accounts/:id - deve retornar 400', async () => {

        const resultado = await request(app).get('/accounts/abc');

        expect(resultado.status).toEqual(400);
    })
})


