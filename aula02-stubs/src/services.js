//criada para quando for necessário fazer uma requisição para a API ou algum serviço externo

class Service{
async makeRequest(url){
return (await fetch(url)).json()} //aqui fazemos a requisição e retornamos o resultado da requisição em formato json

async getPlanets(url){
    const data = await this.makeRequest(url)
    return {
        name:data.name,
        surfeceWater: data.surface_water,
        appearedIn:data.films.length}
}}
module.exports = Service;