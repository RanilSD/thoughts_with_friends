const { ObjectId } = require("mongoose").Types;
const { Thought, User, Reaction } = require("../models");

    //getting all thoughts



//const thoughtController = {

  //  getAllThoughts(req, res) {
    //    Thought.find({})
      //  .then((thought) => res.json(thought))
        //.catch((err) => res.status(500).json(err));
    //},

    module.exports = {
      async getAllThoughts(req, res) {
        try {
          const thoughts = await Thought.find();
          res.json(thoughts);
        } catch (err) {
          re.status(500).json(err);
        }
      },
      async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId });

        res.json(thought);
      } catch (err) {
        res.status(500).json(err)
      }
      },
  

    //creating thought to user and getting one thought by id
    async createThought(req, res) {
     // Thought.create(req.body)
      //.then((dbThoughtData) => {
        //  return User.findOneAndUpdate(
          //    {_id:req.body.userID},
            //  {$push:{ thoughts:dbThoughtData._id}},
              //{new:true}
   
         // )
       
      //})
      //.then(userData => res.json(userData))
      //.catch((err) => res.status(500).json(err));
   //},
   try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404)
      .json({ message: 'thought created with no user id found'})
    }

    res.json('thought created!!!');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
   },
  
    //updating thought by id
    updateThought(req, res) {
      Thought.findOneAndUpdate({
          _id: req.params.id
      }, {
          $set: req.body
      }, {
          runValidators: true,
          new: true
      }).then((thought) => {
          !thought ? res.status(404).json({message: 'No thought with this ID'}) : res.json(thought);
  
      }).catch((err) => res.status(500).json(err));
  
  
  },

        //getting thought by id
        getThoughtById({ params }, res) {
          Thought.findOne({ _id: params.id })
            .then((dbThoughtData) => {
              // if no thought is found
              if (!dbThoughtData) {
                res.status(404).json({ message: "No thought with this ID" });
                return;
              }
              res.json(dbThoughtData);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json(err);
            });
        },

    //deleting thought
    deleteThought(req, res) {
      Thought.findOneAndDelete({_id: req.params.id})
      .then((thought) => {
          if(!thought){
              res.status(404).json({message: 'No thought with this ID'}) 
  
  
          }      
          
          return User.findOneAndUpdate(
              {_id:req.body.userID},
              {$pull:{thoughts:thought._id}},
              {new:true}
   
          )
     }).then(() => res.json({message: 'Thought deleted!'}))
     .catch((err) => res.status(500).json(err));
  },

  // Adding a reaction to thought
  async addReaction(req, res) {
    console.log('You are now adding a Reaction');
    console.log(req.body);

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.reactionBody } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with this ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

   // addReaction(req, res) {
     // console.log('Adding Reaction');
     // console.log(req.reactionBody);
     // Thought.findOneAndUpdate(
         // { _id: req.params.thoughtId },
         // { $addToSet: { reactions: req.reactionBody } },
         // { new: true, runValidators: true }
       // )
         // .then((dbThoughtData) => {
           // if (!dbThoughtData) {
             // res.status(404).json({ message: "No thought with this id" });
            //  return;
          //  }
         //   res.json(dbThoughtData);
       //   })
     //     .catch((err) => res.json(err));
   //   },

    //async addReaction(req, res) {
     // try {
      // const reaction = await Reaction.create(req.body);
      // const thought = await Thought.findOneAndUpdate(
       //  { _id: req.body.reactionId },
        // { $addToSet: { reactions: reaction._id } },
        // { new: true }
      // );
   
      // if (!user) {
       //  return res.status(404)
        // .json({ message: 'reaction created with no user id found'})
      // }
   
      // res.json('reaction created!!!');
    // } catch (err) {
     //  console.log(err);
      // res.status(500).json(err);
    // }
     // },

   // addReaction({ params, body }, res) {
     // Thought.findOneAndUpdate(
       // { _id: params.thoughtId },
       // { $addToSet: { reactions: body } },
        //{ runValidators: true, new: true }
      //).then((dbThoughtData) => {
        //if (!dbThoughtData) {
          //res.status(404).json({ mesage: "no thought with this ID" });
         // return;
       // }
       // res.json(dbThoughtData);
     // }).catch((err) => res.json(err));
   // },
    //addReaction(req, res) {
      //console.log('Adding reaction');
      //console.log(req.body);
      //Thought.findOneAndUpdate(
        //{ _id: req.params.thoughtId },
        //{ $addToSet: { reactions: req.body} },
        //{ runValidators: true, new: true }
      //)
       // .then((thought) =>
         // !thought
           // ? res
             //   .status(404)
               // .json({ message: 'No friend with this ID :(' })
           // : res.json(thought)
        //)
        //.catch((err) => res.status(500).json(err));
    //},

    //deleting a reaction
    deleteReaction(req, res) {
      console.log(req.params)
    
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId} } },
          { runValidators: true, new: true }
 
        ).then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought with this ID :(' })
              : res.json(thought)
          ).catch((err) => res.status(500).json(err));
      },
    }


//module.exports = thoughtController;