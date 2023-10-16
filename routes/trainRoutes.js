const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { TrainRoute, validate } = require("../models/TrainRoute");

router.use(express.json());

router.post("/", async (req, res) => {
  req.body = req.body.params;

  const routeObject = new TrainRoute({
    departureDate: req.body.departureDate,
    arrivalDate: req.body.arrivalDate,
    departureStation: req.body.departureStation,
    arrivalStation: req.body.arrivalStation,
    trainName: req.body.trainName,
    features: req.body.features,
    carriages: req.body.carriages
    
  });
  routeObject
    .save()
    .then((result) =>
      res
        .send(result)
    )
    .catch(() => res.status(400).send("Bad request"));
});