<h1 align="center">
    <br>
    <p align="center">Pets<p>
</h1>

# Let's do this

Olá, estamos chegando em mais um período de revisão, passa <s>muito</s> rápido, não é mesmo?

Atentando-se ao fato de sempre validarmos o conteúdo visto até determinado ponto do nosso curso, iremos trabalhar em um projeto desenvolvido por vocês (novamente).

## Tema

Você já parou pra pensar se tem pet shop perto da sua casa que atenda as coisas fofas das nossas vidas?
Por exemplo, perto da minha casa só tem uma veterinária que atende gatinhos =/

---

### Pets

```json
[
    {
        "id": 1,
        "nomeFantasia": "Pet Shop 1",
        "endereco": "Avenida Paulista, 1273 - São Paulo",
        "telefone": "11 12345-6789",
        "atende": ["cães", "gatos"]
    },
    {
        "id": 2,
        "nomeFantasia": "Pet Shop 2",
        "endereco": "Niterói, 1273 - Rio de Janeiro",
        "telefone": "11 98765-4321",
        "atende": ["cães", "papagaio"] 
    }
]
```

---

#### Contratos que deverão ser entregues

| Verbo        | Recurso      | Descrição                         |
| ------------ | ------------ | --------------------------------- |
| GET          | `/pets`      | Retorna todos os pets             |
| GET          | `/pets/:id`  | Retorna apenas um pet específico  |
| POST         | `/pets`      | Cadastrar um pet                  |
| PUT          | `/pets/:id`  | Atualizar um pet específico       |
| DELETE       | `/pets/:id`  | Deletar um pet específico         |
| PATCH        | `/pets/:id`  | Atualizar um pet específico       |

---

#### Contratos para ir ao infinito e além

- [ ] Criar uma rota com filtro, para mostrar somente pets que atendem ou cães, ou gatos, etc
- [ ] Mostrar somente pets de São Paulos

---

## Por onde começamos?

Vamos relembrar um pouco do que vimos até aqui? Não fique preocupada ou encanada em decorar todas as sintaxes e códigos existentes no mundo. Isso vem com o tempo, tá tudo bem!

Vamos começar relembrando nossa estrutura de uma maneira geral:

```
pasta-do-projeto
├── src
│   ├── controller
│   ├── model
│   ├── routes
│   ├── views
│   └── index.js
├── server.js
├── package.json
```

Agora vamos relembrar alguns conceitos importantes:

- **M**odel: é responsável pela leitura e escrita de dados, e também de suas validações. É onde está toda a lógica de negócio da aplicação.
- **V**iew: é a camada de interação com o usuário. Ela apenas faz a exibição dos dados, sendo ela por meio de um html ou xml.
- **C**ontroller: O responsável por receber todas as requisições do usuário. Seus métodos chamados actions são responsáveis por uma página, controlando qual model usar e qual view será mostrado ao usuário.

Passo-a-passo com a mão no <s>massa</s> código:

1. Esqueleto do projeto
2. Models
3. Controller
4. Rotas
5. App.js
6. Server.js

### Postman

Essa ferramenta permite testar serviços RESTful por meio do envio de requisições HTTP e da análise do seu retorno. Você pode salvar todas as suas _collections_ e facilitar o seu dia-a-dia como pessoa desenvolvedora!

### Github

Não podemos esquecer aquele commit bonitão para mostrar todo o esforço de vocês, não é mesmo?

---