const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  year: Number,
  genre: [String],
  director: String,
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "actor" }],
  isNominated: { type: Boolean, default: false }
});

const MovieModel = mongoose.model("movie", movieSchema);

module.exports = MovieModel;
