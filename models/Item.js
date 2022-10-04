const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  expirationDate: {
    type: Date,
    required: false,
  },
  howMuch:{
    type:Number,
    required: false,
  },
notes:{
    type:String,
    required:false,
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
