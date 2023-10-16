const Joi = require("joi")
const mongoose = require("mongoose"); 

const trainRouteSchema = mongoose.Schema({
    departureDate: {type: Date, required: true},
    arrivalDate: {type: Date, required: true},
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
                options: [String]
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