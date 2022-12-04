const db = require("../models");
var bcrypt = require('bcryptjs');
const { createError } = require("../utils/error");
const User = db.user


// Create and Save a new Tutorial
exports.login = async (req, res, next) => {

  const email = req.body.email

    const user = await User.findOne({where:{email:email}})
    console.log(user)
    // res.status(200).send(product)
};

exports.register = async (req, res, next) => {

  const tempUser = await User.findOne({where:{email:req.body.email}})
  if(tempUser) return next(createError(403,"Email already sign up "))


  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

    const user = await User.create(req.body)
    res.status(200).send(user)

};