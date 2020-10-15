const series = require("../models/series.json")
const fs = require("fs")

const createSerie = (req, res) => {
    const { id, name, genre, synopsis, seasons } = req.body
    series.push({ id, name, genre, synopsis, seasons })
    fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) { // gravando nova serie no array de series
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const serieFound = series.find(serie => serie.id == id) // recupero a serie que foi criei no array de series      
            res.status(200).send(serieFound)
        }
    })
}

const addSeason = (req, res) => {
    try {
        const serieId = req.params.id
        const { id, code, episodes } = req.body // temporada para adicionar
        const serieToUpdate = series.find((serie) => serie.id == serieId) // encontrando a serie que vou adicionar a temporada
        const serieIndex = series.indexOf(serieToUpdate) // encontrando o índice do array da série que vou atualizar

        if (serieIndex >= 0) { // verifico se a serie existe no array de series
            serieToUpdate.seasons.push({ id, code, episodes }) // adicionando uma nova temporada
            series.splice(serieIndex, 1, serieToUpdate) // atualizando a série no meu array de séries
        } else {
            res.status(404).send({ message: "Série não encontrada para adicionar temporada" })
        }

        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Temporada adicionada com sucesso!")
                const serieUpdated = series.find(serie => serie.id == serieId) // separo a serie que adicionei a temporada
                res.status(200).send(serieUpdated) // envio a serie com a nova temporada como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const addEpisode = (req, res) => {
    try {
        const serieId = req.params.id
        const seasonId = req.params.seasonId
        const { id, code, name, watched } = req.body

        const serieToUpdate = series.find(serie => serie.id == serieId) // encontrando a série que vou adicionar o episódio da temporada
        const serieIndex = series.indexOf(serieToUpdate) // encontrando o índice do array da série que vou atualizar

        if (serieIndex >= 0) { // verifico se a serie existe no array de series
            const seasonToUpdate = serieToUpdate.seasons.find(season => season.id == seasonId) // encontrando a temporada que vou adicionar o episódio
            const seasonIndex = serieToUpdate.seasons.indexOf(seasonToUpdate) // encontrando o índice do array da temporada que irei atualizar

            if (seasonIndex >= 0) { // verifico se a temporada existe no array de series
                seasonToUpdate.episodes.push({ id, code, name, watched }) // adicionando novo episódio a temporada
                serieToUpdate.seasons.splice(seasonIndex, 1, seasonToUpdate) // atualizando a série com a temporada que contém novo episódio
                series.splice(serieIndex, 1, serieToUpdate) // atualizando o array de séries com a série que contém a temporada atualizada        
            } else {
                res.status(404).send({ message: "Temporada não encontrada para adicionar episódio" })
            }
        } else {
            res.status(404).send({ message: "Série não encontrada para adicionar episódio" })
        }

        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Episódio adicionado com sucesso!")
                const serieUpdated = series.find(serie => serie.id == serieId) // separo a serie que adicionei o episódio na temporada
                res.status(200).send(serieUpdated) // envio a serie com o novo episódio na temporada como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deleteSerie = (req, res) => {
    try {
        const serieId = req.params.id
        const serieFound = series.find(serie => serie.id == serieId) // encontro a serie pelo id
        const serieIndex = series.indexOf(serieFound) // identifico o índice da série no meu array

        if (serieIndex >= 0) { // verifico se a serie existe no array de series
            series.splice(serieIndex, 1) // removo a série pelo índice
        } else {
            res.status(404).send({ message: "Série não encontrada para ser deletada" })
        }

        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Série deletada com sucesso do arquivo!")
                res.sendStatus(204)
            }
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar a série" })
    }
}

const deleteSeason = (req, res) => {
    try {
        const serieId = req.params.id
        const seasonId = req.params.seasonId

        const serieFound = series.find(serie => serie.id == serieId) // encontro a serie pelo id
        const seasonToDelete = serieFound.seasons.find(season => season.id == seasonId) // encontro a temporada pelo id

        const serieIndex = series.indexOf(serieFound) // identifico o índice da série no meu array
        const seasonIndex = serieFound.seasons.indexOf(seasonToDelete) // identifico o índice da temporada no meu array de série

        if (serieIndex >= 0) { // verifico se a serie existe no array de series
            if (seasonIndex >= 0) { // verifico se a temporada existe no array de series
                serieFound.seasons.splice(seasonIndex, 1) // removo a temporada da série pelo índice
                series.splice(serieIndex, 1, serieFound) // atualizo a série sem a temporada que deletei
            } else {
                res.status(404).send({ message: "Temporada não encontrada para ser deletada" })
            }
        } else {
            res.status(404).send({ message: "Série não encontrada para deletar temporada" })
        }
        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Temporada deletada com sucesso!")
                res.sendStatus(204)
            }
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar a temporada" })
    }
}

const deleteEpisode = (req, res) => {
    try {
        const serieId = req.params.id
        const seasonId = req.params.seasonId
        const episodeId = req.params.episodeId

        const serieFound = series.find(serie => serie.id == serieId) // encontro a serie pelo id
        const serieIndex = series.indexOf(serieFound) // identifico o índice da série no meu array

        if (serieIndex >= 0) { // verifico se a serie existe no array de series
            const seasonFound = serieFound.seasons.find(season => season.id == seasonId) // encontro a temporada pelo id
            const seasonIndex = serieFound.seasons.indexOf(seasonFound) // identifico o índice da temporada no meu array de série

            if (seasonIndex >= 0) { // verifico se a temporada existe no array de series
                const episodeToDelete = seasonFound.episodes.find(episode => episode.id == episodeId) // encontro o episódio pelo id
                const episodeIndex = seasonFound.episodes.indexOf(episodeToDelete) // identifico o índice do episódio no meu array de seasons

                if (episodeIndex >= 0) { //verifico se o episódio existe no array de episódios
                    seasonFound.episodes.splice(episodeIndex, 1) // removo o episódio da temporada pelo índice
                    serieFound.seasons.splice(seasonIndex, 1, seasonFound) // atualizo a temporada sem o episódio que deletei
                    series.splice(serieIndex, 1, serieFound) // atualizo a série com a temporada sem o episódio que deletei
                } else {
                    res.status(404).send({ message: "Episódio não encontrado para ser deletado" })
                }
            } else {
                res.status(404).send({ message: "Temporada não encontrada para ter episódio deletado" })
            }
        } else {
            res.status(404).send({ message: "Série não encontrada para deletar episódio na temporada" })
        }

        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Episódio deletado com sucesso!")
                res.sendStatus(204)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar episódio" })
    }
}

const updateSerie = (req, res) => {
    try {
        const serieId = req.params.id
        const serieToUpdate = req.body //Pego o corpo da requisição com as alterações

        const serieFound = series.find(serie => serie.id == serieId) // separo a serie que irei atualizar
        const serieIndex = series.indexOf(serieFound) // separo o indice da serie no array de series

        if (serieIndex >= 0) { // verifico se a serie existe no array de series
            series.splice(serieIndex, 1, serieToUpdate) // atualizando serie com os novos dados
        } else {
            res.status(404).send({ message: "Série não encontrada para ser atualizada" })
        }

        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Arquivo de séries atualizado com sucesso!")
                const serieUpdated = series.find(serie => serie.id == serieId) // separo a serie que modifiquei no array
                res.status(200).send(serieUpdated) // envio a serie modificada como resposta
            }
        })

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const updateEpisodeWatchedStatus = (req, res) => {
    try {
        const serieId = req.params.id
        const seasonId = req.params.seasonId
        const episodeId = req.params.episodeId
        const watched = req.body.watched

        const serieFound = series.find(serie => serie.id == serieId) // encontrando a serie
        const serieIndex = series.indexOf(serieFound) // identifico o índice da serie no meu array

        if (serieIndex >= 0) { // verifico se a serie existe no array de series
            const seasonFound = serieFound.seasons.find(season => season.id == seasonId) // encontrando a temporada
            const seasonIndex = serieFound.seasons.indexOf(seasonFound) // identifico o índice da temporada no meu array de seasons da serie
            if (seasonIndex >= 0) { // verifico se a temporada existe no array de series
                const episodeToUpdate = seasonFound.episodes.find(episode => episode.id == episodeId) // encontrando o episódio a ser atualizado
                const episodeIndex = seasonFound.episodes.indexOf(episodeToUpdate) // identifico o índice do episodio no meu array de episódios da temporada
                if (episodeIndex >= 0) { //verifico se o episódio existe no array de episódios
                    episodeToUpdate.watched = watched //atualizamos o objeto com o novo status informando se foi assistido ou não
                    seasonFound.episodes.splice(episodeIndex, 1, episodeToUpdate) // removo o episodio pelo índice substituindo pelo novo
                    serieFound.seasons.splice(seasonIndex, 1, seasonFound) // atualizando a temporada com o episódio atualizado com novo status de assistido
                    series.splice(serieIndex, 1, serieFound) // atualizando a séria com a temporada atualizada
                } else {
                    res.status(404).send({ message: "Episódio não encontrado para ter status de assistido alterado" })
                }
            } else {
                res.status(404).send({ message: "Temporada não encontrada ter episódio com status de assistido alterado" })
            }
        } else {
            res.status(404).send({ message: "Série não encontrada para modificar status de assistido do episódio" })
        }

        fs.writeFile("./src/models/series.json", JSON.stringify(series), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Episódio teve status de assistido atualizado com sucesso!")
                const serieUpdated = series.find(serie => serie.id == serieId) // separo a serie que modifiquei no array
                res.status(200).send(serieUpdated) // envio a serie modificada como resposta
            }
        })

    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const getAllSeries = (req, res) => {
    console.log(req.url)
    res.status(200).send(series)
}

const getSerie = (req, res) => {
    const serieId = req.params.id
    const serieFound = series.find(serie => serie.id == serieId)
    if (serieFound) {
        res.status(200).send(serieFound)
    } else {
        res.status(404).send({ message: "Série não encontrada" })
    }
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