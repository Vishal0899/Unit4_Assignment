const express = require("express");
const authenticate = require("../middlewares/authenticate");
const Posts = require("../models/posts.model");
const router = express.Router();


router.get("",async (req, res) => {
    try {
        const users = await Posts.find({}).lean().exec();

        return res.send(users)
        
    } catch (error) {
        console.log(error.message)
    }
})

router.post("", authenticate, async (req, res) => {
    req.body.user_Id = req.userID;
    try {
        const posts = await Posts.create(req.body);
        return res.send(posts)
        
    } catch (error) {
        return res.send(error.message)
    }
})

router.patch("/:id", authenticate, async (req, res) => {
    // req.body.user_Id = req.userID;
    try {
        const posts = await Posts.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        return res.send(posts)
        
    } catch (error) {
        return res.send(error.message)
    }
})

router.delete("/:id", authenticate, async (req, res) => {
    req.body.user_Id = req.userID;
    try {
        const posts = await Posts.findByIdAndDelete(req.params.id)
          .lean()
          .exec();
        return res.send(posts)
        
    } catch (error) {
        return res.send(error.message)
    }
})

module.exports = router;