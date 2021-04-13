const exp = require("express");
app = exp();
const colors = require("colors");

const path = require("path");
// connecting angular app with server
require("dotenv").config();

// npm install path
app.use(exp.static(path.join(__dirname, "dist/bookstore")));
const mongoose = require("mongoose");

mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const db = mongoose.connection;

db.on("error", () => console.log("error in DB connection".red));
db.once("open", () => console.log("DB connected".green));



mongoose.set('useFindAndModify', false);
const userApiObj = require("./apis/userapi");

const adminApiObj = require("./apis/adminapi");

const productApiObj = require("./apis/productapi");
app.use("/user", userApiObj);

app.use("/admin", adminApiObj);

app.use("/product", productApiObj);

app.use((req, res, next) => {
  res.send({ message: `path invalid ${req.url}` });
});

app.use((err, req, res, next) => {
  res.send({ message: "error occured", reason: err.message });
  console.log(err);
});

const port = process.env.PORT||8080;
// j0oin syntax ===> join(path of the file , )

app.listen(port, () => {
  console.log(`web server listening on port ${port}`);
});
