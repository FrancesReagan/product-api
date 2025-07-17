import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type:String, 
    required: true
  },

  description:{
    type:String, 
    required: true
},

  price:{
    type:Number,
    required: true
  },

  category: {
    type:String,
    required: true
  },

  inStock: {
    type:Boolean,
    default: true
  },

  tags: [String],

  createdAt: {
    type:Date,
    default: Date.now
  }

});

export default mongoose.model("Product", productSchema);