
const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({

    username:String,
    password:String,
    email:String,
    products:[]
})


//Create a model
const Admin=mongoose.model("Adminslist",AdminSchema)

// Exports the model

module.exports=Admin;