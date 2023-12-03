const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require("../../controller/thoughtController");

//setting up get all and post at /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

//setting up get one, put, and delete at /api/thoughts/:id
router
.route("/:id")
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);


router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);




module.exports = router;