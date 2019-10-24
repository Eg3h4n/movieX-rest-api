const express = require("express");
const router = express.Router();

const ActorModel = require("../models/actor");

router.get("/", async (req, res) => {
  const actors = await ActorModel.find();
  res.send(actors);
});

router.get("/:id", async (req, res) => {
  const actor = await ActorModel.findById(req.params.id);

  if (!actor) return res.status(404).send(`Actor:${req.params.id} not found!`);

  res.send(actor);
});

router.post("/", async (req, res) => {
  const actor = new ActorModel(req.body);
  const saved = await actor.save();
  res.send(saved);
});

router.put("/:id", async (req, res) => {
  const actor = await ActorModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  if (!actor) return res.status(404).send(`Actor:${req.params.id} not found!`);

  res.send(actor);
});

router.delete("/:id", async (req, res) => {
  const actor = await ActorModel.findByIdAndDelete(req.params.id);

  if (!actor) return res.status(404).send(`Actor:${req.params.id} not found!`);

  res.send(actor);
});

module.exports = router;
