const router = require("express").Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require("../../controller/userController");

//setting up get all and post at /api/users
router.route("/").get(getAllUsers).post(createUser);

//setting up get one, put, and delete at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

//adding and deleting friend
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);


module.exports = router;