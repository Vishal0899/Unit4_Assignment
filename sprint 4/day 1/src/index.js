const express = require("express");
const connect = require("./config/db");
const userController = require("./controllers/users.controller")
const {
  register,
  login,
  generateToken,
} = require("./controllers/auth.controller");
const productController = require("./controllers/product.controller")
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Port is working");
});


app.post("/register", register);
app.post("/login", login);
app.use("/users",userController)
app.use("/products", productController)
app.use("/users",userController);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),

  function (req, res) {
    const token = generateToken(req.user);
    return res.status(200).send({ user: req.user, token });
  }
);


app.listen(6000, async (req, res) => {
  try {
    await connect();
    console.log("Listening at 6000");
  } catch (error) {
    console.log(error.message);
  }
});
