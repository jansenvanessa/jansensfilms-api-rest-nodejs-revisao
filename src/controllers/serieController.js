const series = require("../models/series.json")
const fs = require("fs")

const createSerie = (req, res) => {
    const { id, name, genre, synopsis, seasons } = req.body
    series.push({ id, name, genre, synopsis, seasons })
    res.status(200).send(series)
}

const addSeason = (req, res) => {
    try {
        const serieId = req.params.id
        const { id, code, episodes } = req.body // temporada para adicionar
        const serieToUpdate = series.find((serie) => serie.id == serieId) // encontrando a serie que vou adicionar a temporada
        serieToUpdate.seasons.push({ id, code, episodes }) // adicionando uma nova temporada
        const serieIndex = series.indexOf(serieToUpdate) // encontrando o índice do array da série que vou atualizar
        series.splice(serieIndex, 1, serieToUpdate) // atualizando a série no meu array de séries

        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                return res.status(500).send({ message: err })
            }
            console.log("Arquivo de séries atualizado com sucesso!")
        })

        res.status(200).send(series)
    } catch (err) {
        return res.status(500).send({ message: err })
    }
}

const addEpisode = (req, res) => {
    try {
        const serieId = req.params.id
        const seasonId = req.params.seasonId
        const { id, code, name, assistido } = req.body

        const serieToUpdate = series.find(serie => serie.id == serieId) // encontrando a série que vou adicionar o episódio da temporada
        const seasonToUpdate = serieToUpdate.seasons.find(season => season.id == seasonId) // encontrando a temporada que vou adicionar o epsódio
        const serieIndex = series.indexOf(serieToUpdate) // encontrando o índice do array da série que vou atualizar
        const seasonIndex = serieToUpdate.indexOf(seasonToUpdate) // encontrando o índice do array da temporada que irei atualizar
        seasonToUpdate.episodes.push({ id, code, name, assistido }) // adicionando novo epsódio a série
        serieToUpdate.splice(seasonIndex, 1, seasonToUpdate) // atualizando a série com a temporada que contém novo episódio
        series.splice(serieIndex, 1, serieToUpdate) // atualizando o array de séries com a série que contém a temporada atualizada

        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                return res.status(500).send({ message: err })
            }
            console.log("Arquivo de séries atualizado com sucesso!")
        })

        res.status(200).send(series)
    } catch (err) {
        return res.status(500).send({ message: err })
    }
}

const deleteSerie = (req, res) => {
    const serieId = req.params.id
    try {
        const serieToDelete = series.find(serie => serie.id == serieId) // encontro a serie pelo id
        const serieIndex = series.indexOf(serieToDelete) // identifico o índice da série no meu array
        series.splice(serieIndex, 1) // removo a série pelo índice

        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                return res.status(500).send({ message: err })
            }
            console.log("Arquivo atualizado com sucesso!")
        })

        res.status(200).send(series)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "Erro ao deletar a série" })
    }
}

const deleteSeason = (req, res) => {
    const serieId = req.params.id
    const seasonId = req.params.seasonId
    try {
        const serieFound = series.find(serie => serie.id == serieId) // encontro a serie pelo id
        const seasonToDelete = serieFound.seasons.find(season => season.id == seasonId) // encontro a temporada pelo id

        const serieIndex = series.indexOf(serieFound) // identifico o índice da série no meu array
        const seasonIndex = serieFound.seasons.indexOf(seasonToDelete) // identifico o índice da temporada no meu array de série

        serieFound.seasons.splice(seasonIndex, 1) // removo a temporada da série pelo índice
        series.splice(serieIndex, 1, serieFound) // atualizo a série sem a temporada que deletei

        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                return res.status(500).send({ message: err })
            }
            console.log("Arquivo atualizado com sucesso!")
        })

        res.status(200).send(series)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "Erro ao deletar a temporada" })
    }
}

const deleteEpisode = (req, res) => {
    const serieId = req.params.id
    const seasonId = req.params.seasonId
    const episodeId = req.params.episodeId
    try {
        const serieFound = series.find(serie => serie.id == serieId) // encontro a serie pelo id
        const seasonFound = serieFound.seasons.find(season => season.id == seasonId) // encontro a temporada pelo id
        const episodeToDelete = seasonFound.episodes.find(episode => episode.id == episodeId) // encontro o episódio pelo id

        const serieIndex = series.indexOf(serieFound) // identifico o índice da série no meu array
        const seasonIndex = serieFound.seasons.indexOf(seasonFound) // identifico o índice da temporada no meu array de série
        const episodeIndex = seasonFound.episodes.indexOf(episodeToDelete) // identifico o índice do episódio no meu array de seasons

        seasonFound.episodes.splice(episodeIndex, 1) // removo a temporada da série pelo índice
        serieFound.seasons.splice(seasonIndex, 1, seasonFound) // atualizo a temporada sem o episódio que deletei
        series.splice(serieIndex, 1, serieFound) // atualizo a série com a temporada sem o episódio que deletei

        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                return res.status(500).send({ message: err })
            }
            console.log("Arquivo atualizado com sucesso!")
        })

        res.status(200).send(series)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "Erro ao deletar episódio" })
    }
}

const updateSerie = (req, res) => {
    try {
        const id = req.params.id
        const serieFound = series.find(serie => serie.id == id) // encontro minha serie no array de series
        const serieToUpdate = req.body
        const serieIndex = series.indexOf(serieFound)
        series.splice(serieIndex, 1, serieToUpdate) // atualizando série com os novos dados
        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                return res.status(500).send({ message: err })
            }
            console.log("Arquivo de séries atualizado com sucesso!")
        })

        res.status(200).send(series)
    } catch (err) {
        return res.status(500).send({ message: err })
    }
}

const updateEpisodeWatchedStatus = (req, res) => {
    const serieId = req.params.id
    const seasonId = req.params.seasonId
    const episodeId = req.params.episodeId
    const assistido = req.body.assistido

    try {
        const serieFound = series.find(serie => serie.id == serieId) // encontrando a serie
        const seasonFound = serieFound.seasons.find(season => season.id == seasonId) // encontrando a temporada
        const episodeToUpdate = seasonFound.episodes.find(episode => episode.id == episodeId) // encontrando o episódio a ser atualizado

        const serieIndex = series.indexOf(serieFound) // identifico o índice da serie no meu array
        const seasonIndex = serieFound.seasons.indexOf(seasonFound) // identifico o índice da temporada no meu array de seasons da serie
        const episodeIndex = seasonFound.episodes.indexOf(episodeToUpdate) // identifico o índice do episodio no meu array de episódios da temporada

        episodeToUpdate.assistido = assistido //atualizamos o objeto com o novo status informando se foi assistido ou não
        seasonFound.episodes.splice(episodeIndex, 1, episodeToUpdate) // removo o episodio pelo índice substituindo pelo novo
        serieFound.episodes.splice(seasonIndex, 1, seasonFound) // atualizando a temporada com o episódio atualizado com novo status de assistido
        series.episodes.splice(serieIndex, 1, serieFound) // atualizando a séria com a temporada atualizada

        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                return res.status(500).send({ message: err })
            }
            console.log("Arquivo atualizado com sucesso!")
        })

        return res.status(200).send(series)
    } catch (err) {
        return res.status(500).send({ message: err })
    }
}

const getMovie = (req, res) => {
    const id = req.params.id
    res.status(200).send()
}

const getAllSeries = (req, res) => {
    console.log(req.url)
    res.status(200).send(series)
}

const getSerie = (req, res) => {
    const serieId = req.params.id
    const serieFound = series.find(serie => serie.id == serieId)
    res.status(200).send(serieFound)
}

module.exports = {
    addEpisode,
    addSeason,
    createSerie,
    deleteSerie,
    deleteSeason,
    deleteEpisode,
    updateSerie,
    updateEpisodeWatchedStatus,
    getSerie,
    getAllSeries
}