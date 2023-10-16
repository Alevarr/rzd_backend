const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  numberOfTrips: Number,
  options: {
    travel : {
      description: "Много путешествую",
      checked : {type: Boolean, required: true, default: false}
    },
    silence : {
      description: "Предпочитаю тишину",
      checked : {type: Boolean, required: true, default: false}
    },
    sleep : {
      description: "Желаю выспаться",
      checked : {type: Boolean, required: true, default: false}
    },
    uncommunicative : {
      description: "Малообщительный",
      checked : {type: Boolean, required: true, default: false}
    },
    read : {
      description: "Люлю читать",
      checked : {type: Boolean, required: true, default: false}
    },
    gardening : {
      description: "Занимаюсь садоводством",
      checked : {type: Boolean, required: true, default: false}
    },
    cars : {
      description: "Разбираюсь в автомобилях",
      checked : {type: Boolean, required: true, default: false}
    },
    arts : {
      description: "Люблю искусство/творчество",
      checked : {type: Boolean, required: true, default: false}
    },
    sports : {
      description: "Занимаюсь спортом",
      checked : {type: Boolean, required: true, default: false}
    },
    activeLifeStyle : {
      description: "Веду активный образ жизни",
      checked : {type: Boolean, required: true, default: false}
    },
    work : {
      description: "Желаю работать в тишине",
      checked : {type: Boolean, required: true, default: false}
    },
    withFriends : {
      description: "Еду с друзьями",
      checked : {type: Boolean, required: true, default: false}
    },
    communicative : {
      description: "Общительный",
      checked : {type: Boolean, required: true, default: false}
    },
    youngAge : {
      description: "Предпочту молодых попутчиков",
      checked : {type: Boolean, required: true, default: false}
    },
    MidAge : {
      description: "Предпочту попутчиков среднего возраста",
      checked : {type: Boolean, required: true, default: false}
    },
    oldAge : {
      description: "Предпочту пожилых попутчиков",
      checked : {type: Boolean, required: true, default: false}
    },
    withChildren : {
      description: "Еду с детьми",
      checked : {type: Boolean, required: true, default: false}
    },
    noChildren : {
      description: "Без детей в вагоне",
      checked : {type: Boolean, required: true, default: false}
    },
    noJews : {
      description: "Ненавижу, блять, евреев",
      checked : {type: Boolean, required: true, default: false}
    },
  }
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, name: this.name, role: this.role }, config.get("jwtPrivateKey"));
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
