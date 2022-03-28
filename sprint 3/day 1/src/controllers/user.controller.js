const express = require("express")
const router = express.Router()
const User = require("../modules/user.module")
const {body,validationResult} = require("express-validator")

router.post("/", 
body("first_name").trim().not().isEmpty().withMessage("First name is required"),
body("last_name").trim().not().isEmpty().withMessage("Last name is required"),
body("email").isEmail().custom(async (value) =>
 {
    const user = await User.findOne({ email: value });

    if (user) {
      throw new Error("Email is already taken");
    }
    return true;
  }),
  body("age").not().isEmpty().withMessage("Age is required").isNumeric().withMessage("Age must be a number").custom((value)=>{
      if(value < 1 || value > 100){
          throw new Error("Age should be between 1 - 100")
      }
      return true;
  }),
  body("pincode").notEmpty().withMessage("Pin code is required").isLength({min:6 , max : 6}).withMessage("Pincode shuold be of 6 digit"),
  body("gender").notEmpty()
//   .custom((value)={
//       if(value){
//           throw new Error("Gender should be Male , Female or Others")
//       }
//   })
,async (req,res)=>
{
    try {
      const errors = validationResult(req);
    //   console.log({ errors });
      if (!errors.isEmpty())
       {
        return res.status(400).send({ errors: errors.array() });
      }

        const user = await User.create(req.body)
        res.send(user)        
    } catch (error) {
        console.log(error.message)
    }
})

router.get("/",async (req,res)=>{
    try {
        const user = await User.find({}).lean().exec();
        console.log("You are on users");
        res.send(user);
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router;