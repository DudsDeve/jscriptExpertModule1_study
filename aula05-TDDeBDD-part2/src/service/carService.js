const BaseRepository = require('./../repository/base/baseRepository');

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars }); //
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
}

    module.exports = CarService;
