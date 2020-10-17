<h1 align="center">
    <br>
    <p align="center">Reprograma - Semana 11 (Revisão)<p>
</h1>

Olá, sejam bem-vindas a Semana 11 de revisão! Meu nome é Vanessa Jansen, sou instrutora da Reprograma e irei acompanhar vocês nessa semana.

# Vamos recordar!

Quantas coisas novas já aprendemos sobre uma API Nodejs, não é mesmo?! Muitas novidades, bastante código e muita caminhada para chegarmos até aqui. Que tal fazermos uma breve retrospectiva? Então vamos lá!

## O que é uma API REST?

Antigamente quando desenvolvíamos uma aplicação WEB, não existia uma separação clara de FrontEnd e Backend. O código para fazer as telas (Frontend), era em conjunto com o código de negócio (Backend), criando uma forte dependência entre ambos. Hoje ainda é utilizado esse modelo em alguns casos. É sempre importante avaliarmos o projeto que precisamos fazer, para decidirmos o melhor caminho para desenvolvê-lo.

<imagem API rest>

Nesse curso estamos aprendendo como fazer uma API REST, que é uma API Backend, que irá disponilizar rotas, para que o Frontend (tela), consiga se comunicar com a parte da lógica por trás (Backend). Para isso criamos "Endpoints" na nossa API Rest do Backend e deixamos disponíveis para serem utilizadas pelo Frontend. Em outras palavras, criamos possibilidades de ações que podem ser chamadas pelo Frontend. 

### Exemplo

Criei um botão na tela (Frontend) que ao ser clicado precisa listar todas as alunas do nosso curso. Para isso, foi necessário criar uma API de alunas, e desenvolver uma rota que fornece como resposta a listagem de alunas do nosso curso. O Frontend então chama essa rota do nosso Backend, que responde a listagem de alunas. Com essa informação em mãos, o Frontend consegue trabalhar com esses dados, podendo colocar essas informção em uma tabela, em uma listagem, ou onde for necessário para a visualização do usuário.

Caso no futuro eu queira mudar as telas (Frontend) ou mesmo o código da API (Backend), mantendo as rotas disponibilizadas, poderei fazer sem precisar trocar a outra parte. Com a API REST o código do Backend é independente do Frontend e vice-versa.

## Relembrando os Verbos HTTP

O protocolo HTTP define alguns verbos para as requisições que indicam uma ação a ser executada. Isso significa que para realizar uma requisicão é necessário utilizar o verbo correto para a chamada que quero fazer. Os verbos mais utilizados são:

| Verbo      | Descrição      
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------|
| POST       | É utilizado quando queremos criar uma informação por meio da api.                                                                    |
| GET        | É utilizado quando queremos recuperar a representação de um recurso. Requisições utilizando esse verbo, devem retornar apenas dados. | 
| PUT        | O verbo PUT é utilizado quando queremos alterar integralmente um recurso.                                                            |
| PATCH      | O verbo PUT é utilizado quando queremos alterar parcialmente um recurso.                                                             |
| DELETE     | O verbo DELETE é utilizado quando queremos remover um recurso.                                                                       |

### PUT vs PATCH

O verbo PUT e o verbo PATCH são ambos utilizados quando queremos modificar um recurso. A diferença é que utilizamos o PUT quando queremos modificar o recurso por completo e utilizamos o PATCH quando queremos modificá-lo parcialmente.

## Relembrando o Http Status

Quando fazemos uma requisição na API (quando chamamos uma rota), como vamos saber se deu tudo certo nessa chamada? Ou como vamos saber se deu algum erro? Como saber qual o status da resposta da chamada que fiz? Para isso existe o Http status, com códigos com uma convenção de resposta. Existem inúmeros códigos, mas vamos nos concentrar nos mais utilizados:

| Código | Status        | Descrição                          | Exemplo de Códigos                                     |
| ------ | ------------- | ---------------------------------- |-------------------------------------------------------- 
| 2xx    | `SUCCESSFUL`  | Quando deu certo o retorno         | 200 OK, 202 Accepted, 204 No Content                   | 
| 3xx    | `REDIRECTION` | Quando ocorre um redirecionamento  | 301 Moved Permanently, 303 See Other, 304 Not Modified | 
| 4xx    | `CLIENT ERROR`| Quando há erro do lado do cliente  | 400 Bad Request, 401 Unauthorized, 403 Forbidden       |
| 5xx    | `SERVER ERROR`| Quando há erro do lado do servidor | 500 Internal Server Error, 501 Not Implemented         |

Então na nossa API devemos informar o código ao responder as requisições feitas pelas rotas que desenvolvemos. Caso nossa resposta seja com sucesso, passamos então um status 200. Caso dê algum erro que foi ocasionado por responsabilidade do usuário, enviamos um erro 4xx. Por exemplo, se um usuário não tem permissão de acesso para chamar uma rota que criamos, devemos retornar para ele um status 401, que significa que ele não está autorizado. Porém caso dê algum erro que seja de responsabilidade da nossa API, poderemos retornar um status 500.

# Projeto API Nodejs "Jansen's Filmes"

Parabéns, você acaba de ser contratada por uma empresa de audio visual chamada Jansen's Films para desenvolver um novo produto que deverá ser lançado em breve. Nesse estágio inicial do produto, o mesmo consistirá em um aplicativo e uma página web onde o usuário poderá controlar uma lista com filmes que já assistiu e que gostaria de assistir.

<imagem do projeto>
    <imagem front com tabela>

Você será a desenvolvedora backend responsável pelo desenvolvimento da API que deverá ser feito em Nodejs. Em paralelo, o time de Frontend irá desenvolver o aplicativo e a página web que irão se comunicar com a API que você irá desenvolver.

## Como criar uma nova API Nodejs?

Primeiro, para a construção do backend do nosso produto em Nodejs criaremos uma pasta chamada "jansensfilms". Abriremos a mesma no programa Visual Studio Code e inicializaremos o terminal nessa mesma pasta.

### Iniciando a API Nodejs

Com o terminal aberto na pasta "jansensfilms", para iniciar nossa API Nodejs, precisamos inicializar o *package manager*, que é o gerenciador de pacotes do Node. Para isso executaremos ```npm init``` no terminal. Pressionando “Enter”, serão exibidas uma sequência de perguntas que deverão ser preenchidas ou mantidas o valor padrão.

<imagem do terminal>
    
Com isso um arquivo com o nome de package.json será criado. Esse arquivo é muito importante pois define que o nosso projeto como sendo Node.

### Instalando o Express

Feito isso, precisaremos instalar o Express no nosso projeto, que é um framework que nos trará facilidades. Para isso executaremos no terminal:

``` npm install express --save ```

O *--save* é necessário para especificar que esse pacote do express é uma dependência da nossa aplicação e que o nosso projeto obrigatoriamente precisa dela para funcionar. Quando uma outra pessoa baixar seu projeto, ao instalar as dependências, esse pacote também será instalado. Isso porque quando você usa o --save, esse pacote é referenciado em “dependencies” no arquivo package.json. A sessão “ dependencies”, desse arquivo, lista justamente as dependências do nosso projeto.

Ao rodar a instalação do express, uma *pasta node_modules* com os pacotes do meu projeto será criada. Se reparar, dentro dessa pasta teremos uma pasta chamada “express”. Toda vez que você rodar o comando ``` npm install``` essa pasta node_modules será atualizada com as últimas atualizações conforme o que estiver configurado no arquivo *package.json*.

### Criando o arquivo .gitignore

Devemos criar na raíz do "jansensfilmes" o arquivo *.gitignore* e escrever nele ```node_modules/``` para o git nao trackear essa pasta para commit.

### Criando a estrutura da nossa API

Primeiramente, iremos criar uma pasta chamada “src” (de “source”) na raiz do nosso projeto, onde armazenaremos todos os códigos da aplicação. Dentro dessa, criaremos três pastas:

- [x] controller - para armazenar a lógica de controle da nossa api
- [x] model - para armazenar os nosso modelos (ex: nossos filmes)
- [x] routes - para armazenar as rotas

```
jansensfilms
├── src
│   ├── controller
│   ├── model
│   ├── routes
├── package.json
```
### Criando o servidor

Deveremos criar dentro de *src/* um arquivo chamado *app.js*. Nesse arquivo faremos as configurações da nossa aplicação. Inicializaremos configuraremos a mesma para utilizar o express. Nesse arquivo criaremos uma constante express que receberá o módulo express. Utilizaremos essa constante para configurar nossa aplicação:

```app.js
const express = require("express")
const app = express()

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

module.exports = app
```

Criaremos agora, na raíz de "jansensfilms", um arquivo chamado “server.js” para configurarmos nosso servidor. Nesse arquivo criaremos uma constante *app* que receberá nossa aplicação express que criamos no arquivo *app.js*. No caso definimos a porta 3000 para o nosso servidor rodar quando for inicializado.

```server.js
const app = require("./src/app")
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});
```

Quando criamos o servidor utilizando o protocolo HTTP, definimos um callback que será executado sempre que recebermos uma requisição web. Nesse caso, esse callback seria executado quando o nosso servidor for iniciado e aparecerá a mensagem “Servidor está rodando na porta 3000”.

### Testando o servidor

Vamos testar nosso servidor? Para isso executaremos o comando ```node server.js``` no terminal. Ao executar o comando, a mensagem informando que o servidor está rodando será exibida.

### Nodemon

Caso você esteja com o servidor rodando e tente alterar algum arquivo, para que o servidor capte essas alterações será necessário reiniciá-lo manualmente. Porém é bem chato ficar fazendo isso. Para evitar esse tipo de problema, podemos utilizar o *nodemon* para inicializar nosso servidor. Para utilizá-lo, deveremos primeiramente instalá-lo rodando o comando ```npm install nodemon --save```. Com o nodemon instalado, para rodar nosso servidor o utilizando, deveremos utilizar o comando ```nodemon server.js```. Com isso nosso servidor será inicializado com o nodemon e você poderá editar seus arquivos sem precisar reiniciá-lo.

### Scripts package.json

Para não precisar ficar escrevendo ```nodemon server.js``` para inicializar o servidor, podemos ir no nosso arquivo *package.json* e editar o atributo "scripts" do json. Poderemos incluir um script de start, informando que quando ele for utilizado, executará o comando ```nodemon server.js```:

```package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  }
```
Dessa forma para inicializar o servidor, basta digitar ```npm start``` no terminal e pressionar enter, que o mesmo já chamará automaticamente o comando ```nodemon server.js```.

### Vamos criar nossa primeira rota GET!

Com o projeto configurado e com o servidor rodando, caso a gente tente executar no browser *http://localhost:3000*, vamos receber a mensagem “Cannot GET”. Isso significa que o nosso servidor ainda não está habilitado a devolver uma resposta do método GET no endereço “/“. Isso tudo porque ainda não definimos nenhuma rota no nosso projeto.

Vamos então criar a primeira rota da nossa API! Dentro da pasta *routes/* deveremos criar um arquivo chamado *index.js*. Nesse arquivo iremos criar nossa primeira rota GET. Nesse iremos definir que quando chamarmos *http://localhost:3000* a mesma será chamada:

```index.js
const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
    res.status(200).send({
        title: "Reprograma - On7 Semana 11 - Projeto Revisão",
        version: "1.0.0"
    })
})

module.exports = router
```
Criamos nossa rota, porém ainda não fizemos nossa aplicação utilizá-la. Para isso temos que ir no arquivo *app.js*, definirmos uma constante para nossa rota "index" e setar para nossa aplicação utilizar:

```app.js
const index = require("./routes/index")
app.use("/", index)
```
Nosso arquivo *app.js* deverá então ficar da seguinte forma:

```app.js
const express = require("express")
const app = express()

//rotas
const index = require("./routes/index")

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use("/", index)

module.exports = app
```
Agora com a rota desenvolvida, ao executarmos no browser *http://localhost:3000* não deverá mais apresentar o erro de GET.


## Nova rota de GET para retornar os filmes

A empresa Jansensfilmes acabou de te enviar uma base de dados de exemplo chamado *movies.json*. Essa contém uma listagem de filmes que deveremos trabalhar. Com a listagem em mãos, poderemos desenvolver uma rota GET que exibirá essa listagem toda vez que uma requisição para listar os filmes seja chamada.

Para que nosso projeto fique organizado, iremos colocar o arquivo *movies.json* que você recebeu dentro da pasta *model*. Iremos, em seguida, na pasta *routes* e criaremos um arquivo chamado *movies.js*. Nesse, iremos armazenar todas as rotas referentes aos filmes. Nosso projeto deverá estar com a seguinte estrutura:

```
jansensfilms
├── src
│   ├── controller
│   ├── model
|       ├── movies.json
│   ├── routes
│       ├── index.js
│       ├── movies.js
|   ├── app.js
├── package.json
├── server.js
```

Primeiramente, deveremos informar a nossa aplicação que iremos utilizar as rotas que iremos criar para os filmes. Para isso deveremos abrir a pasta *src* e editar o arquivo *app.js* 

```app.js
const movies = require("./routes/movies")
app.use("/movies", movies)
```

Estamos dizendo para a aplicação utilizar as rotas do arquivo *movies.js* e utilizar a rota "/movies" para executá-las. Isso significa que toda vez que você chamar *http://localhost:3000/movies*, as nossas rotas de movies serão chamadas. 

Entretanto, ainda não escrevemos nenhuma rota. Para escrever nossa primeira rota que listará os filmes, deveremos abrir a pasta *routes* e editar o arquivo *movies.js*: 

```movies.js
const express = require("express")
const router = express.Router()
const controller = require("../controllers/movieController")

router.get("/", controller.getAllMovies)

module.exports = router;
```

Nessa estamos dizendo que toda vez que for utilizado o verbo GET na chamada *http://localhost:3000/movies*, o *controller.getAllMovies* será executado. Mas que *controller.getAllMovies* é esse? Precisamos criar ele ainda, certo? Então vamos lá!

Primeiramente deveremos criar nosso controller de filmes. Então na pasta *controllers* deveremos criar o arquivo *movieController.js*. Nesse, deveremos criar a função *getAllMovies* que estamos chamando na nossa rota de GET:

```movieController.js
const movies = require("../models/movies.json")

const getAllMovies = (req, res) => {
    console.log(req.url)
    res.status(200).send(movies)
}

module.exports = {
    getAllMovies,
}
```
Nesse arquivo atribuímos nosso json de filmes a uma constante que chamamos de "movies". Então ao chamar a função *getAllMovies* nós respondemos a requisição com o status 200, informando que deu tudo certo e enviando nosso json de filmes. Feito isso, nossa rota que lista todos os filmes está pronta!

## Testando nossa rota no Frontend

## Testando nossa rota via Postman

## Criando demais rotas (POST, PUT, PATCH, GET (by id))

## Melhorando nosso código!
