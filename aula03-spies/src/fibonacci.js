class Fibonacci{ //utilizando o * e o yield para nãao acumular nada em memória , ele envia pra quem quiser receber o valor
   * execute(input, current = 0, next = 1){
    //processou todas as sequencias e para
    if(input === 0){
        return 0
    }
    //retorna o valor
    yield current;

    //delega a função mas não retorna valor
    yield * this.execute(input - 1, next, current + next);

    }
}

module.exports = Fibonacci

// rever a aula de spies