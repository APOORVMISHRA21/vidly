const mongoose = require('mongoose');
require('mongoose-type-email')
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
});

function validateUser(user)
{
    return schema.validate(user);
}

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength : 50
    },

    email:  {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    }

});

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.validateUser = validateUser;