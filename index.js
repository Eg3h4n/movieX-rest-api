const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const server = express();

console.log(config.get("name"));
mongoose
  .connect(config.get("mongodb.host"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("MongoDB Error:", err.message));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

const moviesRoutes = require("./routes/moviesRoute");
const actorsRoutes = require("./routes/actorsRoute");

server.use("/movies", moviesRoutes);
server.use("/actors", actorsRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server is listening on PORT = ${PORT}...`)
);
