const express = require("express");
const Product = require("../models/products.models");
const router = express.Router();
const client = require("../config/redish");
const { append } = require("express/lib/response");

router.post("", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const products = await Product.find({}).lean().exec();
    client.set("products", JSON.stringify(products));
    return res.send(product);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("", async (req, res) => {
  try {
    client.get("products", async (err, fetchProduct) => {
      if (fetchProduct) {
        const products = JSON.parse(fetchProduct);
        return res.send(products);
      } else {
        try {
          const products = await Product.find({}).lean().exec();
          client.set("products", JSON.stringify(products));

          return res.send(products);
        } catch (error) {
          res.send(error.message);
        }
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    const products = await Product.find({}).lean().exec();

    client.set(`products.${req.params.id}`, JSON.stringify(product));

    client.set("products", JSON.stringify(products));

    return res.send(product);
  } catch (error) {
    return res.send(error.message);
  }
});


router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id).lean().exec();

        const products = await Product.find({}).lean().exec()

        client.del(`products.${req.params.id}`);
        client.set("products",JSON.stringify(products));
        
        return res.send(product)
    } catch (error) {
        return res.send(error.message)
    }
})


module.exports = router;
