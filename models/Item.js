const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  howMuch:{
    type:Number,
    required: true,
  },
notes:{
    type:String,
    required:true,
},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Item", ItemSchema);
