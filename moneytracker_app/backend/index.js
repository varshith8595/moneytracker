const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer();
const app = express();
const transactionmodel = require("./models/transactionmodel");
mongoose.connect(
  "mongodb+srv://varshithgorle99:DCps1R1gaO5d2MYU@cluster0.aqw432k.mongodb.net/?retryWrites=true&w=majority&appName=cluster0"
);
app.use(cors());
app.use(express.json());
app.listen(4000, () => {
  console.log("server is running on port no 4000");
});
app.post("/post", upload.none(), async (req, res) => {
  const { info, date, description, price } = req.body;
  await transactionmodel.create({
    info: info,
    date: date,
    description: description,
    price: price,
  });
  res.json("done");
});

app.get("/getpost", async (req, res) => {
  await transactionmodel
    .find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
