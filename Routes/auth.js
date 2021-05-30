const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User, validateUser } = require('../Models/user');
const Joi = require('joi');

router.use(express.json());

router.get('/', async (req, res) => {
    const user = await User.find();
    res.status(200).send(user);
});

router.get('/:id', async (req, res) => {
    const user = await User.findOne({userId: parseInt(req.params.id)});
    if(!user)
        return res.status(400).send("No such user exists in DB");
    
    res.send(user);
    return;
});

router.post('/', async (req, res) => {

    // console.log('post called');

    const { error } = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});

    if(!user) return res.status(400).send('Invalid Email or Password');

    console.log(user);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(user.password);

    const validCred = await bcrypt.compare(req.body.password, user.password);

    if(!validCred) return res.status(400).send('Invalid Email or Password');

    const token = jwt.sign({_id : user._id}, 'privateJWTKey');

    return res.send(token);
});

router.put('/:id', async (req, res) => {
    const { error } = validateUser(req.body);

    if(error)
    {
        res.status(400).send(error.message);
        return;
    }    
    
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password, salt);

    const user = await User.findOneAndUpdate({userId : parseInt(req.params.id)}, {
        name: req.body.name,
        email: req.body.email,
        password: pass
    }, {new: true});

    res.status(200).send(user);
    return;
});

router.delete('/:id', async (req, res) => {
    
    const user = await User.deleteOne({userId: parseInt(req.params.id)});
    res.send(user);
});



function validate(req)
{
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });

    return schema.validate(req);
}

module.exports = router;