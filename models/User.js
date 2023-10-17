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
  class: Number,
  numberOfTrips: {type: Number, required: true, default: 0},
  options: {
    travel : {
      description:{ type: String, enum: "Много путешествую", required: true, default: "Много путешествую"},
      checked : {type: Boolean, required: true, default: false}
    },
    silence : {
      description:{ type: String, enum: "Мне нужна тишина", required: true, default: "Предпочитаю тишину"},
      checked : {type: Boolean, required: true, default: false}
    },
    sleep : {
      description:{ type: String, enum: "Желаю выспаться", required: true, default: "Желаю выспаться"},
      checked : {type: Boolean, required: true, default: false}
    },
    uncommunicative : {
      description:{ type: String, enum: "Не знакомлюсь с попутчиками", required: true, default: "Малообщительный"},
      checked : {type: Boolean, required: true, default: false}
    },
    read : {
      description:{ type: String, enum: "Люблю читать", required: true, default: "Люлю читать"},
      checked : {type: Boolean, required: true, default: false}
    },
    gardening : {
      description:{ type: String, enum: "Занимаюсь садоводством", required: true, default: "Занимаюсь садоводством"},
      checked : {type: Boolean, required: true, default: false}
    },
    cars : {
      description:{ type: String, enum: "Разбираюсь в автомобилях", required: true, default: "Разбираюсь в автомобилях"},
      checked : {type: Boolean, required: true, default: false}
    },
    arts : {
      description:{ type: String, enum: "Творчество - мое все", required: true, default: "Люблю искусство/творчество"},
      checked : {type: Boolean, required: true, default: false}
    },
    sports : {
      description:{ type: String, enum: "Занимаюсь спортом", required: true, default: "Занимаюсь спортом"},
      checked : {type: Boolean, required: true, default: false}
    },
    activeLifeStyle : {
      description:{ type: String, enum: "Веду здоровый образ жизни", required: true, default: "Веду активный образ жизни"},
      checked : {type: Boolean, required: true, default: false}
    },
    work : {
      description:{ type: String, enum: "Работаю в тишине", required: true, default: "Желаю работать в тишине"},
      checked : {type: Boolean, required: true, default: false}
    },
    withFriends : {
      description:{ type: String, enum: "Еду с друзьями", required: true, default: "Еду с друзьями"},
      checked : {type: Boolean, required: true, default: false}
    },
    // communicative : {
    //   description:{ type: String, enum: "Общительный", required: true, default: "Общительный"},
    //   checked : {type: Boolean, required: true, default: false}
    // },
    youngAge : {
      description:{ type: String, enum: "Предпочту молодых попутчиков", required: true, default: "Предпочту молодых попутчиков"},
      checked : {type: Boolean, required: true, default: false}
    },
    midAge : {
      description:{ type: String, enum: "Предпочту попутчиков среднего возраста", required: true, default: "Предпочту попутчиков среднего возраста"},
      checked : {type: Boolean, required: true, default: false}
    },
    oldAge : {
      description:{ type: String, enum: "Предпочту пожилых попутчиков", required: true, default: "Предпочту пожилых попутчиков"},
      checked : {type: Boolean, required: true, default: false}
    },
    withChildren : {
      description:{ type: String, enum: "Еду с детьми", required: true, default: "Еду с детьми"},
      checked : {type: Boolean, required: true, default: false}
    },
    noChildren : {
      description:{ type: String, enum: "Без детей в вагоне", required: true, default: "Без детей в вагоне"},
      checked : {type: Boolean, required: true, default: false}
    }
    // noJews : {
    //   description:{ type: String, enum: "Ненавижу, блять, евреев", required: true, default: "Ненавижу, блять, евреев"},
    //   checked : {type: Boolean, required: true, default: false}
    // },
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
    age: Joi.number().min(1).max(106).required(),
    sex: Joi.string().valid("m", "f").required()
  });
  return schema.validate(user);
};

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
