const movies = require("../models/movies.json")
const fs = require("fs")

const createMovie = (req, res) => {
    const { id, name, genre, synopsis, watched } = req.body
    movies.push({ id, name, genre, synopsis, watched })
    fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { // gravando novo filme no array de filmes
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const movieFound = movies.find(movie => movie.id == id) // recupero o filme que foi criei no array de filmes      
            res.status(200).send(movieFound)
        }
    })
}

const deleteMovie = (req, res) => {
    try {
        const movieId = req.params.id
        const movieFound = movies.find(movie => movie.id == movieId) // encontro o filme pelo id
        const movieIndex = movies.indexOf(movieFound) // identifico o índice do filme no meu array

        if (movieIndex >= 0) { // verifico se o filme existe no array de filmes
            movies.splice(movieIndex, 1) // removo o filme pelo índice
        } else {
            res.status(404).send({ message: "Filme não encontrado para ser deletado" })
        }

        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { // gravo meu array de filmes sem o filme que deletei
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Filme deletado com sucesso do arquivo!")
                res.sendStatus(204)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar o filme" })
    }
}

const updateMovie = (req, res) => {
    try {
        const movieId = req.params.id
        const movieToUpdate = req.body //Pego o corpo da requisição com as alterações 

        const movieFound = movies.find(movie => movie.id == movieId) // separo o filme que irei atualizar      
        const movieIndex = movies.indexOf(movieFound) // separo o indice do filme no array de filmes

        if (movieIndex >= 0) { // verifico se o filme existe no array de filmes
            movies.splice(movieIndex, 1, movieToUpdate) //busco no array o filme, excluo o registro antigo e substituo pelo novo 
        } else {
            res.status(404).send({ message: "Filme não encontrado para ser atualizado" })
        }

        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { // gravo meu json de filmes atualizado
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Arquivo de filmes atualizado com sucesso!")
                const movieUpdated = movies.find(movie => movie.id == movieId) // separo o filme que modifiquei no array
                res.status(200).send(movieUpdated) // envio o filme modificado como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateWatchedStatus = (req, res) => {
    try {
        const movieId = req.params.id
        const watched = req.body.watched

        const movieToUpdate = movies.find(movie => movie.id == movieId) // separo o filme que irei mudar o status
        const movieIndex = movies.indexOf(movieToUpdate) // identifico o índice do filme no meu array

        if (movieIndex >= 0) { // verifico se o filme existe no array de filmes
            movieToUpdate.watched = watched //atualizo o objeto com o novo status informando se foi assistido ou não
            movies.splice(movieIndex, 1, movieToUpdate) // removo o filme pelo índice substituindo pelo novo
        } else {
            res.status(404).send({ message: "Filme não encontrado para informar se foi assistido ou não" })
        }

        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { // gravo meu json de filmes atualizado
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Arquivo atualizado com sucesso!")
                const movieUpdated = movies.find((movie) => movie.id == movieId) // separo o filme que modifiquei no array
                res.status(200).send(movieUpdated) // envio o filme modificado como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const getMovie = (req, res) => {
    const movieId = req.params.id
    const movieFound = movies.find((movie) => movie.id == movieId)
    if (movieFound) {
        res.status(200).send(movieFound)
    } else {
        res.status(404).send({ message: "Filme não encontrado" })
    }
}

const getAllMovies = (req, res) => {
    console.log(req.url)
    res.status(200).send(movies)
}

module.exports = {
    createMovie,
    deleteMovie,
    updateMovie,
    updateWatchedStatus,
    getMovie,
    getAllMovies,
}