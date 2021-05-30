const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User, validateUser } = require('../Models/user');

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

    const { error } = validateUser(req.body);

    if(error)
    {
        return res.send(error.message);
    }
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password, salt);

    User.count({}, async (err, count) => {

            const user = new User({
                userId : count+1,
                name : req.body.name,
                email : req.body.email,
                password : pass
            });
            // console.log('User created!!!');
            const result = await user.save();
            // console.log('User saved to DB!!!');
            res.send(user);
        
    });

    
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

module.exports = router;