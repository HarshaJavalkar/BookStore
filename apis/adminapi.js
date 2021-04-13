const exp = require("express");
const adminApiObj = exp.Router();

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

adminApiObj.use(exp.json());
const errorHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const bcryptjs = require("bcryptjs");
const User = require("../models/User");

// const authSchema=require('../helpers/validation')

adminApiObj.post(
  "/createadmin",
  errorHandler(async (req, res) => {
    // console.log("adminApi is Working ");

    let adminObj = req.body;

    let admin = await Admin.findOne({ username: adminObj.username });

    if (admin == null) {
      let hashedPassword = await bcryptjs.hash(req.body.password, 7);
      //create admin obj for Admin model
      let newAdminObj = new Admin({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      });
      //save
      await newAdminObj.save();
      //  console.log(user)
      res.send({ message: "Admin created" });
    } else {
      res.send({ message: "Admin already existed" });
    }
  })
);

// get admin sales 








adminApiObj.post(
  "/login",
  errorHandler(async (req, res) => {
    let adminObj = req.body;
    // console.log(adminObj);

    let admin = await Admin.findOne({ username: adminObj.username });
 

    if (admin == null) {
      res.send({ message: "Invalid username" });
    } else {
      let status = await bcryptjs.compare(adminObj.password, admin.password);
     

      if (status) {
        let token = await jwt.sign({ username: admin.username }, "abcd", {
          expiresIn: 100,
        });

        res.send({
          message: "success",
          token: token,
          adminObj: admin.username
        });
      } else {
        res.send({ message: "Invalid Password" });
      }
    }
  })
);

module.exports = adminApiObj;
