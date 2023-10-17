const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { TrainRoute, validate } = require("../models/TrainRoute");
const { User } = require("../models/User")
const { isValidObjectId } = require("mongoose");
const auth = require("../middleware/auth");


router.use(express.json());

// router.post("/", async (req, res) => {

//   const routeObject = new TrainRoute({
//     departureDate: req.body.departureDate,
//     arrivalDate: req.body.arrivalDate,
//     departureStation: req.body.departureStation,
//     arrivalStation: req.body.arrivalStation,
//     trainName: req.body.trainName,
//     features: req.body.features,
//     carriages: req.body.carriages
    
//   });
//   routeObject
//     .save()
//     .then((result) =>
//       res
//         .send(result)
//     )
//     .catch((error) => res.status(400).send("Bad request " + error));
// });

router.get("/", async (req, res) => {

  TrainRoute.find({}).then(result => res.send({results: result})).catch(e => res.status(400).send(e.message))
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if(!isValidObjectId(id)) return res.status(400).send("Bad request");
  TrainRoute.findById(id).then(result => res.send(result)).catch(e => res.status(400).send(e.message))
})

router.post("/", auth, async (req, res) => {
  req.body = req.body.params
  const userId = req.user._id;
  const carriage = req.body.carriage;
  const seat = req.body.seat;
  const routeId = req.body.trainRouteId;
  const user = await User.findOne({_id: userId});
  const trainRoute = await TrainRoute.findOne({_id: routeId})

  for(let i = 0; i < trainRoute.carriages.length; i++) {
    const cart = trainRoute.carriages[i];
    if(cart.number == carriage) {
      trainRoute.carriages[i].seats[seat].isBooked = true;  
      trainRoute.carriages[i].seats[seat].userBooked = {email: user.email, options: user.options}  
    }
  }
  
  trainRoute.save().then(result => res.send(result)).catch(e => res.status(400).send(e.message))
})

module.exports = router;