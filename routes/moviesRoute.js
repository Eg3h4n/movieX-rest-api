const express = require("express");
const router = express.Router();

const MovieModel = require("../models/movie");
const ActorModel = require("../models/actor");

router.get("/", async (req, res) => {
  const movies = await MovieModel.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await MovieModel.findById(req.params.id);

  if (!movie) return res.status(404).send(`Movie:${req.params.id} not found!`);

  res.send(movie);
});

router.get("/:id/actors", async (req, res) => {
  const movie = await MovieModel.findById(req.params.id).populate("actors");

  if (!movie) return res.status(404).send(`Movie:${req.params.id} not found!`);

  res.send(movie.actors);
});

router.post("/:movieId/actors/add/:actorId", async (req, res) => {
  const movie = await MovieModel.findById(req.params.movieId).populate(
    "actors"
  );
  const actor = await ActorModel.findById(req.params.actorId);

  if (!movie)
    return res.status(404).send(`Movie:${req.params.movieId} not found!`);
  if (!actor)
    return res.status(404).send(`Actor:${req.params.actorId} not found!`);

  const actorExists = movie.actors.find(
    actor => req.params.actorId === actor.id
  );

  if (actorExists) {
    return res
      .status(400)
      .send(
        `Actor:${req.params.actorId} already exists int the movie:${req.params.movieId}`
      );
  }
  movie.actors.push(actor);
  await movie.save();
  res.send(movie);
});

router.post("/", async (req, res) => {
  const movie = new MovieModel(req.body);
  const saved = await movie.save();
  res.send(saved);
});

router.put("/:id", async (req, res) => {
  const movie = await MovieModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  if (!movie) return res.status(404).send(`Movie:${req.params.id} not found!`);

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await MovieModel.findByIdAndDelete(req.params.id);

  if (!movie) return res.status(404).send(`Movie:${req.params.id} not found!`);

  res.send(movie);
});

module.exports = router;
