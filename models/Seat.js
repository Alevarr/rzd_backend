const Joi = require("joi")
const mongoose = require("mongoose"); 


const seatSchema = mongoose.Schema({
    price: {type: Number, required: true},
    isBooked: {type: Boolean, required: true, default: false},
    userBooked: {options: [String]}
})
const Seat = mongoose.model("Seat", seatSchema)

const validateSeat = (seat) => {
    const schema = Joi.object({
        price: Joi.number().min(0).required(),
        isGold: Joi.bool().required(),
        phone: Joi.string().required()
    })
    return schema.validate(seat);
}

exports.seatSchema = seatSchema;
exports.Seat = Seat;
exports.validate = validateSeat;