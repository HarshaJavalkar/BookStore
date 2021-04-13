const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

active:Boolean,
creator:String,
author: String,
prod_lang: String,
prod_price:Number,
prod_desc: String,
prod_id: Number,
prod_name: String,
photo: String,
type: String
})


//Create a model
const Product=mongoose.model("products",productSchema)

// Exports the model
module.exports=Product;