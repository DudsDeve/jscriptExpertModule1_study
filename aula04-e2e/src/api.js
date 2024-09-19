const { once } = require('events');
const http = require ('http');

// para criar uma api

const DEFAULT_USER = { //passamos os dados do usuário
    username: 'Eduardo',
    password: '123'
}
const routes = {
    '/contact:get': (request, response) => {
        response.write('contact us page');
        return response.end();
    },

    //comandos para testar
    //curl -i -X POST --data '{"username": "Eduardo", "password": "123"}' http://localhost:3000/login

    '/login:post': async (request, response) => {
         const user = JSON.parse(await once(request, 'data')) 
    //once: uma vez que meu request pegou um dado, eu pego a informação dele (data)
    //json parse é para transformar o resltado em json

        const toLower = (text) => text.toLowerCase();
        //para transformar o texto em minúsculo o username passado e o username do DEFAULT_USER

        if(
            user.username !== DEFAULT_USER.username ||
             user.password !== DEFAULT_USER.password)

             //se o username passado for diferente do DEFAULT_USER.username ou o password for diferente do DEFAULT_USER.password ele não vai passar
             {
            response.writeHeader(401);
            return response.end('Logging failed');
        }

        return response.end('Loggin sucessed') 
    },
        //se o username passado for diferente do DEFAULT_USER.username ou o password for diferente do DEFAULT_USER.password ele não vai passar 
    default: (request, response) { //default serve para quando enviar alguma rota inexistente
        response.write(404);
        return response.end('not found!');  
    }
}

function handler(request, response) { 
    const { url, method } = request; 
const routeKey = `${url}:${method.toLowerCase()}`; 
const chosen = routes[routeKey] || routes.default;
    return chosen(request, response); 
}
const app = http.createServer(handler).listen(3004, () => console.log('running at 3000'));

module.exports = app; //exportando a aplicação