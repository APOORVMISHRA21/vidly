const Joi = require('joi');
const mongoose = require('mongoose');
const {Genre, schemaValidate1, genreSchema} = require('./genre.js');

//JOI SCHEMA VALIDATION------------------

const schema = Joi.object({
    title : Joi.string().min(3).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
});

function schemaValidate(genre)
{
   return schema.validate(genre);
}

//-------MONGOOSE SCHEMA------------------

const movieSchema = new mongoose.Schema({

    movieId: {
        type: Number,
        required: true
    },

    title: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },

    genre: {
        type: genreSchema,
        required: true
    },

    numberInStock: {
        type : Number,
        required: true
    },

    dailyRentalRate : {
        type : Number,
        required: true
    }
    
});

//---------MONGOOSE MODEL-----------------

const Movie = mongoose.model('Movie', movieSchema);

module.exports.Movie = Movie;
module.exports.schemaValidate = schemaValidate;