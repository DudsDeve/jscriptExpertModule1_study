const {describe, it, before, beforeEach, afterEach} = require('mocha');
const CarService = require('../../src/service/carService');
const {join} = require('path');
const assert = require('assert');
const {expected, expect} = require('chai')
const sinon = require('sinon'); 
const Transaction = require('../../src/entities/transaction');
const carsDatabase = join(__dirname, './../../database', 'cars.json'); 
//aqui nos pegamos o nome do diretório (__dirname) e concatenamos com o nome do arquivo de banco de dados
//ou seja, aqui a gente chama o arquivo de banco de dados

const mocks = {
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCar: require('../mocks/valid-car.json'),
    validCustomer: require('../mocks/valid-customer.json')
};

describe( 'CarService test suite', () => { //da um nome para o conjunto de testes

    let carService = {}; //inicializa a variável carService
    let sandbox = {}; //inicializa a variável sandbox

    before(() => {
        carService = new CarService({
            cars: carsDatabase //passa o caminho do banco de dados, isso garante que todos os testes tenham acesso a ele
            //aqui a gente deixa ele pronto e disponível para todos os testes
        });
    });

    beforeEach(() => { sandbox = sinon.createSandbox() }) //cria um sandbox para isolar os testes, uma instancia vazia
    
    afterEach(() => sandbox.restore()) //restaura o sandbox para que ele não influencie nos outros testes

    

    it('should retrieve a random position from an array', () => {
        const data = [0, 1, 2, 3, 4];
        const result = carService.getRandomPositionFromArray(data);
        expect(result).to.be.lte(data.length).and.to.be.gte(0);
        //aqui a gente verifica se o resultado é menor ou igual ao tamanho do array (lte) e maior ou igual a zero

  })

    it('should choose the first id from carIds in carCategory', () => {
        const carCategoty = mocks.validCarCategory // acessa o objeto de mock e pega a categoria de carro
        const carIdIndex = 0 //pegar o primeiro 

        sandbox.stub(
            carService,
            carService.getRandomPositionFromArray.name
        ).returns(carIdIndex) 

        const result = carService.chooseRandomCar(carCategoty);
        const expected = carCategoty.carIds[carIdIndex]; //esperamos que ele pegue o primeiro id

        expect(result).to.be.equal(expected); //esperamos que o resultado seja igual ao esperado
       
    })

    it('given a carCategory it should return an available car', async ()=> {
        const car = mocks.validCar;
        const carCategory = Object.create(mocks.validCarCategory);
         //cria um objeto com base no objeto de mock, assim podemos modificar sem alterar o objeto pai
         carCategory.carIds= [car.id];

        sandbox.stub(carService.carRepository, carService.carRepository.find.name).resolves(car);

        sandbox.spy(
            carService,carService.name
        )


        const result = await carService.getAvailableCar(carCategory)
        //aqui estou acessando o carService e chamando o método getAvailableCar
        const expected = car


        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok //esperamos que o método getRandomPositionFromArray seja chamado uma vez
        expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok //esperamos que o método find seja chamado com o id do carro
        expect(result).to.be.deep.equal(expected)    
          //aqui a gente compara o resultado com o esperado

})

    it('given a carCategory, customer and numberOfDays it should calculate final amount in real', async () => {

        const customer = Object.create(mocks.validCustomer); //cria um objeto com base no objeto de mock, assim podemos modificar sem alterar o objeto pai
        customer.age = 50; //no teste estava pedindo para passwr a idade do cliente que é 50 anos

        const carCategory = Object.create(mocks.validCarCategory); 
        carCategory.price = 37.6; 

        const numberOfDays = 5; //no teste estava pedindo para passar o número de dias que é 5


        sandbox.stub( carService, "taxesBasedOnAge").get(() => [{from:40, to:50, then: 1.3}]);
 //aqui a gente cria um stub para o método taxesBasedOnAge e passa um array com um objeto de from, to e then


        const expected = carService.currencyFormat.format(244.40); //aqui a gente passa o valor a ser esperado

        const result = carService.calculateFinalPrice( customer, carCategory, numberOfDays); //aqui a gente chama o método que calcula o preço final

        expect(result).to.be.deep.equal(expected); //aqui a gente compara o resultado com o esperado
});

    it('given a customer and a car category it should return a transaction receipt', async () => {

        const car = mocks.validCar;
        const carCategory = {
            ...mocks.validCarCategory,
            price: 37.6,
            carIds: [car.id]
        };

        const customer = Object.create(mocks.validCustomer); //cria um objeto com base no objeto de mock, assim podemos modificar sem alterar o objeto pai
        customer.age = 20; 
    
        const numberOfDays = 5; 
        const dueDate = '10 de novembro de 2020'; //aqui a gente passa a data de vencimento

   const now = new Date(2020, 10, 5); 
   sandbox.useFakerTimers(now.getTime()); //aqui a gente passa a data atual
   sandbox.stub(
    carService.carRepository.find.name,
   ).resolves(car); //aqui a gente cria um stub para o método find e passa o carro

   const expectedAmount = carService.currencyFormat.format(206.8); //aqui a gente passa o valor a ser esperado

   const result = await carService.rent(customer, carCategory, numberOfDays); 


const expected = new Transaction({ customer, car, amount: expectedAmount, dueDate }); //aqui a gente passa o valor a ser esperado

expect(result).to.be.deep.equal(expected); //aqui a gente compara o resultado com o esperado
});

})