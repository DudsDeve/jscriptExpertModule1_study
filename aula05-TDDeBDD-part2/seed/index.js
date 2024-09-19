const faker = require('faker');

const Car =  require('./../src/entities/car');
const CarCategory =  require('./../src/entities/carCategory');
const Customer =  require('./../src/entities/customer');
const {join} = require('path');
const {writeFile} = require('fs/promises');
const seederBaseFolder =  join(__dirname, '../', 'database'); //vai pegar o nome do diretório -> independente de onde ele esteja -> jogar para dentro do database

const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({ //aqui estou criando um objeto com os dados que vou querer que cada CATEGORIA de carro tenha
    id: faker.random.uuid(),
    name: faker.vehicle.type(),
    carsIds: [],
    price: faker.finance.amount(20, 100)
})


const cars = []; //aqui estou criando um array vazio, para que eu possa adicionar os carros que eu vou criar
const customer = []; //aqui estou criando um array vazio, para que eu possa adicionar os clientes que eu vou criar



for(let index=0; index <= ITEMS_AMOUNT; index++){ //aqui quer dizer que pra cada item que eu tiver, eu vou criar um carro, com todos os dados que tem no objeto
    const car = new Car({
        id: faker.random.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()

    })
    carCategory.carsIds.push(car.id); //aqui estou adicionando o id do carro que eu criei no array de carros que eu criei

    cars.push(car); //aqui estou adicionando o carro que eu criei no array de carros que eu criei

    const custumner = new Customer({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        age: faker.random.number({min: 18, max: 50})
    }) 
    customer.push(custumner); //aqui estou adicionando o cliente que eu criei no array de clientes que eu criei
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data)); 
//aqui estou criando uma função que vai escrever um arquivo com o nome que eu passar e com os dados que eu passar

;(async () => {
    await write('cars.json', cars)  //aqui estou chamando a função write, passando o nome do arquivo que vai ser e os dados de onde eu quero que ele puxe
    await write('customer.json', customer)  //aqui estou chamando a função write, passando o nome do arquivo que vai ser e os dados de onde eu quero que ele puxe

    await write('carCategories.json', carCategory) //aqui estou chamando a função write, passando o nome do arquivo que vai ser e os dados de onde eu quero que ele puxe

    console.log('cars', cars)
    console.log('carCategory', carCategory) 
       console.log('customers', customer)

}
)(); 