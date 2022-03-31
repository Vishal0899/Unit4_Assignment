const express = require("express");
const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");
const Product = require("../models/products.model");
const router = express.Router();

router.get("", async (req, res) => {
    try {
        const products = await Product.find({}).lean().exec()
       return res.send(products)
    } catch (error) {
       return res.send(error.message)
    }
})

router.post("",authenticate,authorise["admin","seller"] ,async (req, res) => {
    try {
        const product = await Product.create(req.body)
       return res.send(product)
    } catch (error) {
       return res.send(error.message)
    }
})

router.patch("/:id",authenticate,authorise["seller","admin"] ,async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec()
       return res.send(product)
    } catch (error) {
       return res.send(error.message)
    }
})

router.delete("/:id",authenticate,authorise["seller","admin"] ,async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id).lean().exec()
       return res.send(product)
    } catch (error) {
       return res.send(error.message)
    }
})

module.exports = router