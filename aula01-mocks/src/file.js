
const { error } = require('console'); 
const {readFile} = require('fs/promises'); //importar o fs/promises, para que consiga ler o arquivo da função

const DEFAULT_OPTION = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
 }//criar um objeto com as opções padrões, que devem conter dentro do arquivo

class File { 
    static async csvToJSON(filePath) {

        const content = await readFile(filePath, 'utf-8'); //pegar o conteudo do arquivo , eo utf-8 para trasnformar em string
        const validation = this.isValid(content);
        if(!validation.valid) {throw new Error(validation.error)}; //se a validação não for valida, ele vai retornar um erro

        const result = this.parseCSVTOJSON(content); //passar o conteudo do arquivo para json
        return result;
    } //criar uma função para passar do csv para json




    static isValid(csvString, options = DEFAULT_OPTION){  //para verificar se o arquivo está valido, o Options é para passar quais objetos ele vai receber

        //Para ver o conteúdo do arquivo, eu apenas escrevo o código abaixo no terminal para testar
        // fs.readFileSync('./mocks/threeItems-invalid.csv', 'utf-8') 

        //exemplo:
        //[0] = headers
        //[1] = item1
        //[2] = item2
        //[3] = item3
        //...variavel = restante dos itens

        //const [headers] = csvString.split(/\r?\n/) //por padrão ele vai pegar o primeiro item do array, quando passar headers
        //const [1] = csvString.split(/\r?\n/) //por padrão ele vai pegar o segundo item do array
        //const [1] = csvString.split(/\r?\n/) //por padrão ele vai pegar o segundo item do array
        //...variavel = = csvString.split(/\r?\n/)//por padrão ele vai pegar o restante dos itens


        const [headers, ...fileWithoutHeader] = csvString.split(/\r?\n/); //separar o conteudo do arquivo por linha

        const isHeaderValid = headers === options.fields.join(','); 
        //verificar se o header é valido, o join sere para juntar todo o array, que no momento está separado por vírgula
        //exemplo: 'id''name''profession''age'
        if (!isHeaderValid) { //se o header não for valido
            return {
                error:error.FILE_FIELDS_ERROR_MESSAGE, //passa um erro
                valid: false
            }
        }
        if (!fileWithoutHeader.length || fileWithoutHeader.length > options.maxLines) { //se o arquivo não tiver conteudo e o conteudo for maior que o maximo de linhas(3)
            return{ 
                error: error.FILE_LENGTH_ERROR_MESSAGE, //passa um erro
                valid:false
            }
            
        }
        return {valid:true}; //se tudo estiver certo, o valid alteera para true
    }        

    static parseCSVTOJSON(csvString){
        const lines = csvString.split(/\r?\n/); //separar o conteudo do arquivo por linha
        //remover a primeira linha, que é o header
        const firstLine = lines.shift(); //remover a primeira linha do array
        const header = firstLine.split(','); //separar o header por vírgula

        const users = lines.map(line => {
            const columns = line.split(','); //separar as colunas
            let user = {} //user vai ser um objeto vazio, onde utilizamos o for para preencher ele
            for (const index in columns) {
                user[header[index]] = columns[index]; 
                //pegar a posição do item do header e iguala a posição do item da coluna
                //exemplo: header[0] = columns[0], header[1] = columns[1] 
                // header 0 = id, columns 0 = 1 , header 1 = name, columns 1 = andre , 
                //header 2 = profession, columns 2 = manager, header 3 = age, columns 3 = 30
               
            }
            return user;
        })
        return users
    }
    }
    
    module.exports = File;