const Joi = require("joi")
const mongoose = require("mongoose"); 

const trainRouteSchema = mongoose.Schema({
    departureDate: {type: Number, required: true},
    arrivalDate: {type: Number, required: true},
    departureStation: {type: String, required: true},
    arrivalStation: {type: String, required: true},
    trainName: {type: String, required: true},
    features: {type: [String], required: true},
    carriages: [{
        number: {type: Number, required: true},
        type: {type: String, required: true},
        typeSlug: {type: String, required: true},
        seats: [{
            price: {type: Number, required: true},
            isBooked: {type: Boolean, required: true, default: false},
            userBooked: {
                email: String, 
                options: {
                    travel : {type: Boolean},
                  silence : {type: Boolean},
                  sleep : {type: Boolean},
                  uncommunicative : {type: Boolean},
                  read : {type: Boolean},
                  gardening : {type: Boolean},
                  cars : {type: Boolean},
                  arts : {type: Boolean},
                  sports : {type: Boolean},
                  activeLifeStyle : {type: Boolean},
                  work : {type: Boolean},
                  withFriends : {type: Boolean},
                  // communicative :checked : {type: Boolean, default: fal  
                  youngAge : {type: Boolean},
                  midAge : {type: Boolean},
                  oldAge : {type: Boolean},
                  // withChildren : {
                  //   description:{ type: String, enum: "Еду с детьми", default: "Еду с детьми"},
                  //   checked : {type: Boolean, default: false}
                  // },
                  noChildren : {type: Boolean, default: false}
                  // noJews : {
                  //   description:{ type: String, enum: "Ненавижу, блять, евреев", default: "Ненавижу, блять, евреев"},
                  //   checked : {type: Boolean, default: false}
                  // },
                }
            }
        }]
    }]
    
})

const TrainRoute = mongoose.model("TrainRoute", trainRouteSchema)

const validateTrainRoute = (trainRoute) => {
    const schema = Joi.object({
        // departureDate: Joi.date().required(),
        // arrivalDate: Joi.date().required(),
        // departureStation: Joi.string().required(),
        // arrivalStation: Joi.string().required(),
        // trainName: Joi.string().required(),
        // features: Joi.array().items(Joi.string()).required()


    })
    return schema.validate(trainRoute);
}

exports.trainRouteSchema = trainRouteSchema;
exports.TrainRoute = TrainRoute;
exports.validate = validateTrainRoute;