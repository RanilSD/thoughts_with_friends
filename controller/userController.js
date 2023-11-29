const req = require("express/lib/request");
const { Thought, User } = require("../models");

const userController = {
    //getting all the users
    getAllUsers(req, res) {
        User.find().then((users) => res.json(users)).catch((err) => res.status(500).json(err));

    },

    // creating user
    createUser(req, res) {
        User.create(req.body).then((dbUserData) => res.json(dbUserData)).catch((err) => res.status(500).json(err));

    },

    //updating a user by its ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: req.body
            },
            {
                runValidators: true,
                new: true
            }).then((user) => {
                !user ? res.status(404).json({ message: 'No user' }) : res.json(user);
            }).catch((err) => res.status(500).json(err));
        
    },

    //deleting a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id }).then((user) => !user ? res.status(404).json({ message: 'No user with this ID'}): Thought.deleteMany(
            {
                _id: {
                    $in: user.thoughts
                }
            })).then(() => res.json({ message: 'User and apps associated deleted'})).catch((err) => res.status(500).json(err));

    },

    //get users by ID
    getUserById(req, res) {
        User.findOne({_id: req.params.id}).then((user) => !user ? res.status(404).json({message: 'No users with this ID'}) : res.json(user)).catch((err) => res.status(500).json(err));

    },

    //adding a friend
    addFriend({params}, res) {
        console.log('Now Adding Friend');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
          )
            .then((dbUserData) => {
              if (!dbUserData) {
                res.status(404).json({ message: "No user with this id" });
                return;
              }
              res.json(dbUserData);
            })
            .catch((err) => res.json(err));
        },

    //removing a friend
    removeFriend({ params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
          )
            .then((dbUserData) => {
              if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
              }
              res.json(dbUserData);
            })
            .catch((err) => res.json(err));
        },
      }


module.exports = userController;