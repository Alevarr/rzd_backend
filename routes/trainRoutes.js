const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { TrainRoute, validate } = require("../models/TrainRoute");
const { User } = require("../models/User")
const { isValidObjectId } = require("mongoose");
const auth = require("../middleware/auth");


router.use(express.json());


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
      // console.log(user.options.travel.description)
      trainRoute.carriages[i].seats[seat].isBooked = true;
      trainRoute.carriages[i].seats[seat].userBooked.email = user.email;
      trainRoute.carriages[i].seats[seat].userBooked.options = {
        travel: user.options.travel.checked,
        silence: user.options.silence.checked,
        sleep: user.options.sleep.checked,
        uncommunicative: user.options.uncommunicative.checked,
        read: user.options.read.checked,
        gardening: user.options.gardening.checked,
        cars: user.options.cars.checked,
        arts: user.options.arts.checked,
        sports: user.options.sports.checked,
        activeLifeStyle: user.options.activeLifeStyle.checked,
        work: user.options.work.checked,
        withFriends: user.options.withFriends.checked,
        youngAge: user.options.youngAge.checked,
        midAge: user.options.midAge.checked,
        oldAge: user.options.oldAge.checked,
        noChildren: user.options.noChildren.checked
      }
    }
  }
  trainRoute.save().then(result => res.send(result)).catch(e => res.status(400).send(e.message))
})

module.exports = router;