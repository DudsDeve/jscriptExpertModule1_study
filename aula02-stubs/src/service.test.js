const Service = require('./services');
const assert = require('assert');
const {createSandbox} = require('sinon');
const sinon = createSandbox(); //para criar ambientes isolados, está na documentação do sinon
const mocks = {
   tatooine: require('../mocks/tatooine.json'),
   alderaan: require('../mocks/alderaan.json')
}
const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';


(async () => {
 

   const service = new Service();
   const stub =  sinon.stub(service, service.makeRequest.name)

   {
    stub.withArgs(BASE_URL_1).resolves(mocks.tatooine)
     //withArgs é para dizer qual argumento a função makeRequest vai receber e o resolve é para dizer o que ela vai retornar
     //quando a função makeRequest for chamada com o argumento BASE_URL_1, ela vai retornar o mock de tatooine
     // então toda vez que for chamada a função makeRequest com o argumento BASE_URL_1, ela vai retornar o mock de tatooine
     stub.withArgs(BASE_URL_2).resolves(mocks.alderaan)
   }

   {const expected = { //esperamos que o nome seja tattoine, que a agua da superficie seja 1 e que tenha aparecido em 5 filmes, como está no mock
    name: 'Tatooine',
    surfeceWater: '1',
    appearedIn: 5
   }
   const result = await service.getPlanets(BASE_URL_1)
   assert.deepStrictEqual(result, expected) //esperamos que o resultado seja igual ao esperado
}
{const expected = { //esperamos que o nome seja alderaan, que a agua da superficie seja 1 e que tenha aparecido em 5 filmes, como está no mock
    name: 'Alderaan',
    surfeceWater: '40',
    appearedIn: 2
   }
   const result = await service.getPlanets(BASE_URL_2)
   assert.deepStrictEqual(result, expected) //esperamos que o resultado seja igual ao esperado
}
})();