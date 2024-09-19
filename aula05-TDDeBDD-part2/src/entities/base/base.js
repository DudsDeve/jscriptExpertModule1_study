class Base {
    constructor({id, name }) { //para dizer que TODOS vão ter um id e um name, tanto carros quanto clientes
        this.id = id;
        this.name = name;   
    }
}
module.exports = Base;