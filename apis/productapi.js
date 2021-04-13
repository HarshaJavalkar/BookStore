const exp = require("express");
const productApiObj = exp.Router();

productApiObj.use(exp.json());
const errorHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const Product = require("../models/Product");
const User = require("../models/User");

const bcryptjs = require("bcryptjs");
const verifyTokenMethod=require('./middlewares/verifytoken')

// 1.cloudinary  configuration imports
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// config user cloudinary

cloudinary.config({
  cloud_name: "dxjwuevta",
  api_key: "815813133458844",
  api_secret: "70H2LHBBcJOdOpfOZxZ8XO45wu4",
});

// config cloudinary storage

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "onlineStore",
      public_id: file.fieldname + "-" + Date.now(),
    };
  },
});

// cnfigure multer

var upload = multer({ storage: storage });

var loggedUser;

productApiObj.post(
  "/createproduct",
  upload.single("photo"),
  errorHandler(async (req, res) => {
    req.body = JSON.parse(req.body.productObj);
    req.body.photo = req.file.path;
    let productObj = req.body;

    let product = await Product.findOne({ prod_id: req.body.prod_id });

    if (product == null) {
      let prodObj = new Product({
        active: productObj.active,
        creator: productObj.creator,
        author: productObj.author,
        prod_lang: productObj.prod_lang,
        prod_price: productObj.prod_price,
        prod_desc: productObj.prod_desc,
        prod_id: productObj.prod_id,
        prod_name: productObj.prod_name,
        photo: productObj.photo,
        type: productObj.type,
      });

      await prodObj.save();

      res.send({ message: "Product created successfully" });
    } else {
      res.send({ message: "Product already exist" });
    }
  })
);



productApiObj.post("/getSingleProduct",verifyTokenMethod,errorHandler(async(req,res)=>{

    let prod_id=req.body.id 
    
    

   let product =  await Product.findOne({_id:prod_id})
    

   res.send({message:product})
   


}))

productApiObj.post(
  "/getproducts",
  errorHandler(async (req, res) => {
    let products = await Product.find({
      creator: req.body.username,
      active: true,
    });

    res.send({ message: products });
  })
);

productApiObj.post(
  "/deleteproduct",

  errorHandler(async (req, res) => {
    let deleteObj = req.body.prodIdDel;
    // console.log(deleteObj)
    let deleteProd = await Product.updateOne(
      {
        prod_id: deleteObj,
      },
      {
        $set: {
          active: false,
        },
      }
    );
    res.send({ message: "deleted" });
  })
);

productApiObj.post(
  "/updateadminproduct",
  errorHandler(async (req, res) => {
    let productObj = req.body;

    let product = await Product.updateOne(
      { prod_id: req.body.prod_id },
      {
        $set: {
          prod_name: req.body.prod_name,
          prod_price: req.body.prod_price,
          prod_desc: req.body.prod_desc,
        },
      }
    );
    // //  await product.save()
    res.send({ message: "updated" });
  })
);

productApiObj.post(
  "/getproductwithid",
  errorHandler(async (req, res) => {
    let bookInfo = req.body;


    let filter = { _id: bookInfo.id };

    let product = await Product.findOne(filter);
    res.send({ message: product });

  })
);

productApiObj.post(
  "/checkDeleted",

  errorHandler(async (req, res) => {
    let cartObj = req.body;

    // console.log(req.body)
    let boolean = [];

    for (let i = 0; i < cartObj.length; i++) {
      if (cartObj.length) {
        let cartDel = await Product.findOne({ _id: cartObj[i]._id });

        if (cartObj[i].active != cartDel.active) {
          //  console.log( i,"----",cartObj[i].active,"++++",cartDel.active)

          boolean.push("false");
        } else {
          boolean.push("true");

          // console.log(i,"----",cartObj[i].active,"++++",cartDel.active)
        }
      }
    }

    res.send({ message: boolean });
  })
);

productApiObj.get(
  "/getAllProductsToUsers",

  errorHandler(async (req, res) => {
    let productsTOUsers = await Product.find();

    res.send({ message: productsTOUsers });
  })
);

module.exports = productApiObj;
