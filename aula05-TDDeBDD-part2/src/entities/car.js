const Base = require ('./base/base')

class Car extends Base {
    constructor({id, name, releaseYear, available, gasAvailable}) {

        super({id, name}); //super serve para chamar funções do pai, como se fosse um this, ela esta chamando o constructor da classe Base
        this.releaseYear = releaseYear;
        this.available = available;
        this.gasAvailable = gasAvailable;
    }
// ou seja, o super esta puxando do Base.js o id e o name, e o this.releaseYear , this.avalible e this.gasAvalible  esta puxando o releaseYear do Car que é a nova function
}

module.exports = Car;