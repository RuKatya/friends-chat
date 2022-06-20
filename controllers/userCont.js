const User = require('../model/userModel');

exports.userRegis = async (req, res) => {
    try {
        const { name } = req.body
        const newUser = new User({ name })
        await newUser.save();
        res.send({ ok: true, newUser })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}