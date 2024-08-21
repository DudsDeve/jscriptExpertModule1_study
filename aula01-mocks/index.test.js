const File = require('./src/file');
const {error} = require('./src/constants');
const assert = require('assert');
//IFEE - uma função que se auto executa

(async () => { 
    //variaveis criadas nesse bloco, só são válidas durante sua execução
    {
        const filePath = './mocks/emptyFile-invalid.csv'; //pegar os dados do emptyFile-invalid.csv
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE); // pegar os dados das consts que no caso foi a de erro que criamos
        const result = File.csvToJSON(filePath); //pegar a func do csvToJson
        await assert.rejects(result, expected); //pegamos o result (o que esta dento de [])
    }

    {
        const filePath = './mocks/invalid-header.csv'; //pegar os dados do emptyFile-invalid.csv
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE); // pegar os dados das consts que no caso foi a de erro que criamos
        const result = File.csvToJSON(filePath); //pegar a func do csvToJson
        await assert.rejects(result, expected); //pegamos o result (o que esta dento de [])
    }
    {
        const filePath = './mocks/fiveItems-invalid.csv'; 
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJSON(filePath);
        await assert.rejects(result, expected); 
    }
    {
        const filePath = './mocks/threeItems-valid.csv';  //caso de sucesso
        const expected = [
            {
                id: 1,
                name:'andre',
                profession:'manager',
                age:30
            },
            {
                id: 2,
                name:'eduardo',
                profession:'boss',
                age:35
            },
            {
                id: 3,
                name:'aline',
                profession:'personal',
                age:38
            }
        ]
        const result = await File.csvToJSON(filePath);
        assert.deepEqual(result, expected); 
    }

}) ()