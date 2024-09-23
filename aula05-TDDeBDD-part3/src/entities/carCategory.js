const Base = require ('./base/base')

class CarCategory extends Base {
    constructor({id, name, carsIds, price}) {

        super({id, name}); //super serve para chamar funções do pai, como se fosse um this, ela esta chamando o constructor da classe Base
        this.carsIds = carsIds;
        this.price = price;
        
    }

}

module.exports = CarCategory;