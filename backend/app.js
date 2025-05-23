const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(bodyParser.json());

// app.use('/uploads/images', express.static('uploads/images')); // for serving images
app.use("/uploads/images", express.static(path.join("uploads", "images"))); // for serving images

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/places", placesRoutes); // => /api/places...
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://sobaan:helloworld@cluster0.8ccefyx.mongodb.net/users-places_db?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));
