const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actorSchema = new Schema({
  name: String,
  birthdate: Date,
  gender: { type: String, enum: ["Female", "Male"] },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "movie" }],
  hasOscar: { type: Boolean, default: false }
});

const ActorModel = mongoose.model("actor", actorSchema);

module.exports = ActorModel;
