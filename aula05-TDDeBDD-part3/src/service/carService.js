const BaseRepository = require('../repository/base/baseRepository');
const Tax = require('./../entities/tax');
const Transaction = require('./../entities/transactions');
class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars }); 
        this.taxesBasedOnAge = Tax.taxesBaseOnAge;
        this.currencyFormat = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
    }) //aqui a gente passa o valor a ser esperado
    }

        getRandomPositionFromArray(list) {

            const listLength = list.length;

            return Math.floor( // Math.floor arredonda para baixo um número aleatório x o tamanho da lista

                Math.random() * listLength
            );
        }
        chooseRandomCar(carCategory) {
            const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds); 
         //vamos pegar uma posição aleatória do array de carIds

            const carId = carCategory.carIds[randomCarIndex]; 
            //aqui a gente pega um carro aleatório, vindo da const de cima de ramdomCarIndex

            return carId;
        }
        async getAvailableCar(carCategory) {
            const carId = this.chooseRandomCar(carCategory); //aqui a gente pega um carro aleatório
            const car = await this.carRepository.find(carId); //aqui a gente pega o carro pelo id
            return car;

    }

        calculateFinalPrice(customer, carCategory, numberOfDays) {
            const { age } = customer; 
            const price = carCategory.price;
            const {then : tax} = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to); //aqui a gente pega a taxa de acordo com a idade
   
            const finalPrice = ((tax * price) * numberOfDays); //aqui a gente calcula o preço final
            const formattedPrice = this.currencyFormat.format(finalPrice); //aqui a gente formata o preço final 

            return formattedPrice;
        }

async rent(customer, carCategory, numberOfDays){
    //no rent passamos as propriedades customer, carCategory e numberOfDays para calcular o preço final


    const car = await this.getAvailableCar(carCategory); //o this refere-se ao objeto que está chamando a função rent que é o carService
    const finalPrice = await this.calculateFinalPrice(customer, carCategory, numberOfDays);
    const today = new Date();
    today.setDate(today.getDate() + numberOfDays); //aqui vamos setar uma nova data, passando a data de hoje + o número de dias
    const options = {yer: 'numeric', month: 'long', day: 'numeric'}; 
    const duoDate = today.toLocaleDateString('pt-br', options); 

    const transaction = new Transaction({
        customer,
        car,
        amount: finalPrice,
        duoDate
    });

    return transaction;
}

}

    module.exports = CarService;
