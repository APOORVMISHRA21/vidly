const Joi = require('joi');
const mongoose = require('mongoose');

//JOI SCHEMA VALIDATION------------------

const schema = Joi.object({
    isGold: Joi.boolean().required(),
    name: Joi.string().min(3).required(),
    phone: Joi.number().required()
});

function schemaValidate(genre)
{
   return schema.validate(genre);
}

//-------MONGOOSE SCHEMA------------------

const custSchema = new mongoose.Schema({

    customerId: {
        type: Number,
        required: true
    },

    isGold: {
        type: Boolean,
        required: true
    },

    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },

    phone: {
        type: Number,
        required: true
    }
});

//---------MONGOOSE MODEL-----------------

const Customer = mongoose.model('Customer', custSchema);

module.exports.Customer = Customer;
module.exports.schemaValidate = schemaValidate;