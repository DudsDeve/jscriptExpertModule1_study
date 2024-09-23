const Base = require ('./base/base')

class Customer extends Base {
    constructor({id, name, age}) {

        super({id, name}); //super serve para chamar funções do pai, como se fosse um this, ela esta chamando o constructor da classe Base

        this.age = age;
    }
}

module.exports = Customer;