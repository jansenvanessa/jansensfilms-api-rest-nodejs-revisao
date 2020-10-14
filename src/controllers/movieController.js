const movies = require("../models/movies.json")
const fs = require("fs")

const createMovie = (req, res) => {
    const { id, name, genre, synopsis, watched } = req.body
    movies.push({ id, name, genre, synopsis, watched })
    fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { // gravando novo filme no array de filmes
        if (err) {
            return res.status(500).send({ message: err })
        }
        console.log("Arquivo atualizado com sucesso!")
    })
    const movieFound = movies.find(movie => movie.id == id) // recupero o filme que foi criei no array de filmes      
    res.status(200).send(movieFound)
}

const deleteMovie = (req, res) => {
    try {
        const movieId = req.params.id
        const movieFound = movies.find(movie => movie.id == movieId) // encontro o filme pelo id
        const movieIndex = movies.indexOf(movieFound) // identifico o índice do filme no meu array
        movies.splice(movieIndex, 1) // removo o filme pelo índice

        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) {
            if (err) {
                return res.status(500).send({ message: err })
            }
            console.log("Arquivo atualizado com sucesso!")
        })

        res.status(204)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "Erro ao deletar o filme" })
    }
}

const updateMovie = (req, res) => {
    try {
        const movieId = req.params.id
        const movieToUpdate = req.body //Pego o corpo da requisição com as alterações 

        const movieFound = movies.find(movie => movie.id == movieId) // separo o filme que irei mudar o status      
        const movieIndex = movies.indexOf(movieFound) // separo o indice do filme no array de filmes

        movies.splice(movieIndex, 1, movieToUpdate) //Buscando no array o filme, excluindo o registro antigo e substituindo pelo novo 

        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { // gravo meu json de filmes atualizado
            if (err) {
                return res.status(500).send({ message: err })
            }
            console.log("Arquivo de filmes atualizado com sucesso!")
        })

        const movieUpdated = movies.find(movie => movie.id == movieId) // separo o filme que modifiquei no array
        return res.status(200).send(movieUpdated) // envio o filme modificado como resposta
    } catch (err) {
        return res.status(500).send({ message: err })
    }
}

const updateWatchedStatus = (req, res) => {
    try {
        const movieId = req.params.id
        const watched = req.body.watched

        const movieToUpdate = movies.find(movie => movie.id == movieId) // separo o filme que irei mudar o status
        const movieIndex = movies.indexOf(movieToUpdate) // identifico o índice do filme no meu array
        movieToUpdate.watched = watched //atualizo o objeto com o novo status informando se foi assistido ou não
        movies.splice(movieIndex, 1, movieToUpdate) // removo o filme pelo índice substituindo pelo novo

        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { // gravo meu json de filmes atualizado
            if (err) {
                return res.status(500).send({ message: err })
            }
            console.log("Arquivo atualizado com sucesso!")
        })

        const movieUpdated = movies.find((movie) => movie.id == movieId) // separo o filme que modifiquei no array
        return res.status(200).send(movieUpdated) // envio o filme modificado como resposta
    } catch (err) {
        return res.status(500).send({ message: err })
    }
}

const getMovie = (req, res) => {
    const movieId = req.params.id
    res.status(200).send(movies.find((movie) => movie.id == movieId))
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