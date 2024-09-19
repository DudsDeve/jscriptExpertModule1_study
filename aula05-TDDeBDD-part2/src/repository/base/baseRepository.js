const {readFile} = require('fs/promises');

class BaseRepository{
    constructor({file}) {
        this.file = file;
    }

    async find (itemId) {
        const content = JSON.parse(await readFile(this.file)); //aqui lemos o arquivo e transformamos o conteúdo em um objeto JSON
        if (!itemId) return content; //se não passarmos um id, retornamos o conteúdo completo do arquivo

        return content.find(({id}) => id === itemId); //se passarmos um id, retornamos o conteúdo que tenha o id correspondente
    }
}

module.exports = BaseRepository;