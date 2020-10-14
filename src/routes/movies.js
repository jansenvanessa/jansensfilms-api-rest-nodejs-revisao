const express = require("express")
const router = express.Router()
const controller = require("../controllers/movieController")

// post - criacao
router.post("/", controller.createMovie) // crio um novo filme

// delete - remoção
router.delete("/:id", controller.deleteMovie) // remove um filme pelo id

// put e patch - alteração
router.put("/:id", controller.updateMovie) // altera o filme como um todo pelo id
router.patch("/:id/watched", controller.updateWatchedStatus) // altera o status de assistido pelo id

// get - recuperação
router.get("/", controller.getAllMovies) // recupera todos os filmes
router.get("/:id", controller.getMovie)  // recupera um filme pelo id

module.exports = router;
