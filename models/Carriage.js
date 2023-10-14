const Joi = require("joi")
const mongoose = require("mongoose"); 


const carriageSchema = mongoose.Schema({
    type: {type: String, required: true},
    type_slug: {type: String, required: true},
    seats: [{price: {type: Number, required: true},
        isBooked: {type: Boolean, required: true, default: false},
        userBooked: {email: String, options: [String]}}]
})
const Carriage = mongoose.model("Carriage", carriageSchema)

const validateCarriage = (carriage) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        isGold: Joi.bool().required(),
        phone: Joi.string().required()
    })
    return schema.validate(carriage);
}

exports.carriageSchema = carriageSchema;
exports.Carriage = Carriage;
exports.validate = validateCarriage;