const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
dotenv.config();

const authRoutes = require("./routes/userAuthRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const fileRoutes = require("./routes/fileRoutes");
//---------------------------IMPORTS AND CONFIGS---------------------------------------------------------------------------//

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: null,
      httpOnly: true,
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser(process.env.SESS_SECRET));
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
require("./controllers/passportConfig")(passport);

//-----------------ROUTES--------------------------------------------------------//
app.use("/", authRoutes);
app.use("/", productRoutes);
app.use("/", orderRoutes);
app.use("/", cartRoutes);
app.use("/", fileRoutes)

//// -------------- END OF ROUTES------------------------------------------------//
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = app;
