const User = require('../models/user.model');

const createUser = async(req,res) => {
    const { firstName, lastName, email, password, avt } = req.body;
    const user = await User.create({
        firstName, lastName, email, password, avt
    })
    res.status(200).json({
        message: "Created!",
        data: user
    })
}

const getAll = async(req,res) => {
    const users = await User.find();
    res.status(200).json({
        message: "All User For You !",
        data: users
    })
}

module.exports = {
    createUser,
    getAll
}