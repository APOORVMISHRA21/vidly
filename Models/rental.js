const Joi = require('joi');
const mongoose = require('mongoose');

//---- JOI SCHEMA VALIDATION-----------------

const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
});

function validateRental(rental)
{
    return schema.validate(rental);
}

//------ MONGOOSE SCHEMA & VALIDATION----------

const rentalSchema = new mongoose.Schema({

    rentalId : {
        type: Number,
        required: true
    },

    customer : {
        type : new mongoose.Schema({
            name : {
                type: String,
                required: true
            },
            isGold: {
                type: Boolean,
                required: true
            },
            phone: {
                type: Number,
                required: true
            }
        }),
        required: true
    },

    movie : {
        type: new mongoose.Schema({
            title : {
                type: String,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                required: true
            }
        }),
        required: true
    },

    dateIn : {
        type: Date,
        default : Date.now
    },

    dateOut : {
        type : Date
    },

    rentalFee : {
        type : Number,
        min : 0
    }

});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;