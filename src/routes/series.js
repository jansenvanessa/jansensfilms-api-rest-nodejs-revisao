const express = require("express")
const router = express.Router()
const controller = require("../controllers/serieController")

// post - criacao
router.post("/", controller.createSerie) // ****
router.post("/:id/season/:seasonId/episode", controller.addEpisode)
router.post("/:id/season", controller.addSeason)

// delete - remoção
router.delete("/:id", controller.deleteSerie) // ****
router.delete("/:id/season/:seasonId", controller.deleteSeason)
router.delete("/:id/season/:seasonId/episode/:episodeId", controller.deleteEpisode)

// put e patch - alteração
router.put("/:id", controller.updateSerie) // ****
router.patch("/season/:seasonId/episode/:episodeId/watched-status", controller.updateEpisodeWatchedStatus)

// get - recuperação
router.get("/", controller.getAllSeries) // ****
router.get("/:id", controller.getSerie) // ****

module.exports = router;
