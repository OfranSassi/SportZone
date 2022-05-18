const mongoose = require("mongoose");
var bcrypt = require("bcrypt");

let Schema = mongoose.Schema;
const Genders = Object.freeze({
  Male: "male",
  Female: "female",
});

const laterilities = Object.freeze({
  left: "left",
  right: "right",
});

const functions = Object.freeze({
  student: "student",
  pupil: "pupil",
});

const type_establishment = Object.freeze({
  state: "state",
  mission: "mission",
  private: "private",
});

let userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
    },

    weight: {
      type: Number,
    },

    length: {
      type: Number,
    },

    gender: {
      type: String,
      enum: Object.values(Genders),
    },

    laterility: {
      type: String,
      enum: Object.values(laterilities),
    },
    establishment: {
      type: String,
      enum: Object.values(type_establishment),
    },
    function: {
      type: String,
      enum: Object.values(functions),
    },

    picture: {
      data: Buffer,
      contentType: String,
    },

    birth_place: {
      type: String,
    },
    isactive: {
      type: Boolean,
      default: false,
    },
    imc: {
      type: Number,
    },

    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
    locationtraining: [
      { type: mongoose.Schema.Types.ObjectId, ref: "location" },
    ],
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "subscription" },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "skills" }],
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "session" }],
    challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "challenge" }],

    statistics: [
      { type: mongoose.Schema.Types.ObjectId, ref: "typeStatistic" },
    ],
  },
  { timestamp: true }
);

Object.assign(userSchema.statics, {
  Genders,
  laterilities,
  functions,
  type_establishment,
});

userSchema.plugin(require("mongoose-role"), {
  roles: ["coach", "player"],
  accessLevels: {
    player: ["player"],
    coach: ["coach"],
  },
});

userSchema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.isValid = function (hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
