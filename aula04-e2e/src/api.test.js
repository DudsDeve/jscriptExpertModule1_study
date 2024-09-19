const { describe, it } = require('mocha');
const app = require('./api');
const supertest = require('supertest');
const assert = require('assert');
describe('API Suit test', () => { //para definir um grupo de testes e uma descrição, junto com uma função de callback

    describe('/contact:get' , () => { 
        it('should request the contact route and return HTTP status 200',async ()=> { 
            const response = await supertest(app).get('/contact').expect(200);
             //para fazer a requisição na api -> e puxar a rota /contact -> e esperar que o status seja 200

             assert.strictEqual(response.text, 'contact us page');
        })
    }),
    
    describe('/login:post' , () => { 
        it('should request the contact route and return HTTP status 200',async ()=> { 
            const response = await supertest(app).post('/login').send({ username:'Eduardo', password:'123'}).expect(200);
             //para fazer a requisição na api -> e enviar a rota /login -> enviar o username e o password e se estiver correto ->  e esperar que o status seja 200

             assert.strictEqual(response.text, 'contact us page');
        })
        it('should request the contact route and return HTTP status 401',async ()=> { 
            const response = await supertest(app).post('/login').send({ username:'Xuxu', password:'123'}).expect(401);
             //para fazer a requisição na api -> e enviar a rota /login -> enviar o username e o password e se estiver correto ->  e esperar que o status seja 200

             assert.strictEqual(response.text, 'Logging failed');
        })
    })


}); 