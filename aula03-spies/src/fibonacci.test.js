// o próximo número é a soma dos dois valores anteriores
//input:3 (ter que ter 3 numeros)
//0,1,1
//input:5
//0,1,1,2,3
const {createSandbox} = require('sinon');
const sinon = createSandbox();
const Fibonacci = require('./fibonacci');//importa a classe
const assert = require('assert');

const fibonacci = new Fibonacci(); //utilizar a classe


(async () => {

    {
        const spy = sinon.spy(fibonacci, fibonacci.execute.name); //name é para trabalhar com o nome da função

        //numero da sequencia: 5
        /*
        [0] input = 5, current = 0, next = 1 = resultado = 0
     [1] input = 4, current = 1, next = 1 = resultado = 1
     [2] input = 3, current = 1, next = 2 = resultado = 1
     [3] input = 2, current = 2, next = 3 = resultado = 2
     [4] input = 1, current = 3, next = 5 = resultado = 3
     [5] input = 0 -> para

        
        
        }*/
        for(const sequencia of fibonacci.execute(5)){}

        const expectedCallCount = 6;
        assert.strictEqual(spy.callCount, expectedCallCount)
        //strictEqual é para comparar os valores
    }
})();