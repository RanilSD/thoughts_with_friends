const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./Reaction");


//creating reactions
//const reactionSchema = new Schema(
  //  {
    //    reactionId: {
      //      type: Schema.Types.ObjectId,
        //    default: () => new Types.ObjectId(),
       // },
       // reactionBody: {
         //   type: String,
          //  required: true,
           // minlength: 1,
           // maxlength: 280,
       // },
       // username: {
         //   type: String,
           // required: true,
       // },
       // createdAt: {
         //   type: Date,
           // default: Date.now,
           // get: (createdAtVal) => dateFormat(createdAtVal),
       // },
   // },
   // {
       // toJSON: {
        //    getters: true,
      //  },
    //    id: false,
  //  }
//);


//creating thought text with created at and user name and reactions
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


//creating a virtual that takes in the length of thoughts and reactions calling it "reactionCount"
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});


//creating the model "thought" with the thoughtSchema and exporting
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;