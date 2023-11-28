const { Thought, User} = require("../models");
const { populate } = require("../models/User");

const thoughtController = {
    //getting all thoughts
    getAllThoughts(req, res) {
        Thought.find().then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
    },

    //creating thought to user and getting one thought by id
    createThought(req, res) {
        Thought.create(req.body).then((dbThoughtData) => {
            return User.findOneAndUpdate(
                {_id:req.body.userID},
                {$push:{ thoughts:dbThoughtData._id}},
                {new:true}
            )
        })
        .then(userData => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    //updating thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {
                _id:req.params.id
            }, {
                $set: req.body
            }, {
                runValidators: true,
                new: true
            }).then((thought) => {
                !thought ? res.status(404).json({message: 'No thought by ID'}) : res.json(thought);

            }).catch((err) => res.status(500).json(err));

        },

        //getting thought by id
        getThoughtById({ params }, res) {
            Thought.findOne({ _id: params.id})
            .then((dbThoughtData) => {
                //if thought not found
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought by this ID'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id})
        .then((thought) => {
            if(!thought){
                res.status(404).json({ message: 'No thought by this ID'})
            }
            return User.findOneAndUpdate(
                { _id:req.body.userID},
                {$pull:{thoughts:thought._id}},
                {new:true}
            )
        }).then(() => res.json({message: 'User and apps associated deleted.'})).catch((err) => res.status(500).json(err));

    },

    //adding a reaction
    addReaction(req, res) {
        console.log('You added a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true }
        )
        .then((thought) => !thought ? res.status(404).json({message: 'No friend with this ID :(' }): res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    //deleting a reaction
    deleteReaction(req, res) {
        console.log(req.params)
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId} } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought ? res.status(404).json({message: 'Nothing found with that ID :(' })
        :res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },


}


module.exports = thoughtController;