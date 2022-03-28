const express = require("express");
const User = require("../models/user.model")
const upload = require("../middlewares/uploads")

const router = express.Router();

router.get("/", async (req,res)=>{
    try {
        const user = await User.find({}).lean().exec();
        return res.send(user)
    } catch (error) {
        return res.send(error.message);
    }    
})

router.post("/",upload.single("profilepic"), async (req,res)=>{
    try {
        const users = await User.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            profile_pic : req.file.path,
        })
        return res.send(users)
    } catch (error) {
        return res.send(error.message);
    }
}  )

router.patch("/:id",async (req,res)=>{
    try {
        const users = await User.findByIdAndUpdate(
          req.params.id,{
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path,
          },
          { new: true }
        )
          .lean()
          .exec();

        return res.send(users)
    } catch (error) {
        return res.send(error.message);
    }
})

router.delete("/:id",async (req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    res.send(user)
})

module.exports = router;