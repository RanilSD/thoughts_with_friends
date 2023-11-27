const {Schema, model} = require("mongoose");

//creating user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Incorrect Email, please enter valid Email address",]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "USER"
            },
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


//creating virtual that takes in the length of the user's friends count
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});


//creating the model "user" with the userSchema and exporting
const User = model("User", userSchema);

module.exports = User;
