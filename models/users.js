var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv4 = require("uuid/v4");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    encry_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);


userSchema
  .virtual("password")
  .set(function(password) {
    console.log(password + " ye mera password");
    this._password = password;
    console.log(this._password + " ye humara _password");
    this.salt = uuidv4();
    console.log(this.salt + " ye humara salt");
    this.encry_password = this.securePassword(password);
    console.log(this.encry_password+" ye humara encry_password");
  })
  .get(function() {
    console.log(this._password + " ye .get wala _password");
    return this._password;
  });
  

userSchema.methods = {
  autheticate: function(plainpassword) {
    console.log(plainpassword + " authenticate ke andar wala plainpassword");
    console.log(this.encry_password + " authenticate ke andar wala encry_password");
    console.log(this.securePassword(plainpassword) + " method ka akhri wala");
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha512", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);