const  mongoose  = require("mongoose");

const usersSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please add a name ']
    },
    email:{
        type: String,
        required: [true,'Please add an email '],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Please add a password ']
    },
    isAdmin:{
      type: Boolean,
      required: true,
      default: false
    }
},
    {
        timestamps: true
})

module.exports = mongoose.models.Users || mongoose.model('Users',usersSchema)
