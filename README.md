<h1 align="center">
    <br>
    <p align="center">Reprograma - Semana 11 (Revisão)<p>
</h1>

Olá, sejam bem-vindas a Semana 11 de revisão! Meu nome é Vanessa Jansen, sou a instrutora da Reprograma e irei acompanhar vocês nessa semana.

# Vamos recordar!

Quantas coisas novas já aprendemos sobre uma API Nodejs, não é mesmo?! Muitas novidades, bastante código e muita caminhada para chegarmos até aqui. Que tal fazermos uma breve retrospectiva? Então vamos lá!


## O que é uma API REST?

Antigamente quando desenvolvíamos uma aplicação WEB, não existia uma separação clara de FrontEnd e Backend. O código para fazer as telas (Frontend), era em conjunto com o código de negócio (Backend), criando uma forte dependência entre ambos. Hoje ainda é utilizado esse modelo em alguns casos, como quando não é necessário escalar o sistema (crescer o sistema), como por exemplo, sistemas internos que precisam ser desenvolvidos de forma rápida e que não existe uma intenção de escalá-lo. Sempre é válida nossa avaliação de que caminho queremos seguir dependendo do projeto.

Nesse curso estamos aprendendo como fazer uma API REST, que é uma API Backend, que irá disponilizar rotas, para que o Frontend (tela), consiga se comunicar com a parte da lógica por trás (Backend). Para isso criamos "Endpoints" na nossa API Rest do Backend e deixamos disponíveis para serem utilizadas pelo Frontend. Em outras palavras, criamos possibilidades de ações que podem ser chamadas pelo Frontend. 

Por exemplo, criei um botão na tela (Frontend) que ao ser clicado precisa listar todas as alunas do nosso curso. Para isso, foi necessário criar uma API de alunas, e desenvolver uma rota que fornece como resposta a listagem de alunas do nosso curso. O Frontend então chama essa rota do nosso Backend, que responde a listagem de alunas. Com essa informação em mãos, o Frontend consegue trabalhar com esses dados, podendo colocar essas informção em uma tabela, em uma listagem, ou onde for necessário para a visualização do usuário.

Caso no futuro eu queira mudar as telas (Frontend) ou mesmo o código da API (Backend), mantendo as rotas disponibilizadas, poderei fazer sem precisar trocar a outra parte. O código do Frontend é independente do código do Backend e vice-versa.


## Relembrando o Http Status

Quando fazemos uma requisição na API (quando chamamos uma rota), como vamos saber se deu tudo certo nessa chamada? Ou como vamos saber se deu algum erro? Como saber qual o status da resposta da chamada que fiz? Para isso existe o Http status, com códigos com uma convenção de resposta. Existem inúmeros códigos, mas vamos nos concentrar nos mais utilizados:

| Código | Status        | Descrição                          | Exemplo de Códigos                                     |
| ------ | ------------- | ---------------------------------- |-------------------------------------------------------- 
| 2xx    | `SUCCESSFUL`  | Quando deu certo o retorno         | 200 OK, 202 Accepted, 204 No Content                   | 
| 3xx    | `REDIRECTION` | Quando ocorre um redirecionamento  | 301 Moved Permanently, 303 See Other, 304 Not Modified | 
| 4xx    | `CLIENT ERROR`| Quando há erro do lado do cliente  | 400 Bad Request, 401 Unauthorized, 403 Forbidden       |
| 5xx    | `SERVER ERROR`| Quando há erro do lado do servidor | 500 Internal Server Error, 501 Not Implemented         |

Então na nossa API devemos informar o código ao responder as requisições feitas pelas rotas que desenvolvemos. Caso nossa resposta seja com sucesso, passamos então um status 200. Caso dê algum erro que foi ocasionado por responsabilidade do usuário, enviamos um erro 4xx. Por exemplo, se um usuário não tem permissão de acesso para chamar uma rota que criamos, devemos retornar para ele um status 401, que significa que ele não está autorizado. Porém caso dê algum erro que seja de responsabilidade da nossa API, retornamos um status 5xx.

## Como criar uma nova API Nodejs?

## Projeto API Nodejs "Jansen's Filmes"

## Vamos criar nossa primeira rota GET!

## Testando nossa rota no Frontend

## Testando nossa rota via Postman

## Criando demais rotas (POST, PUT, PATCH, GET (by id))

## Melhorando nosso código!
