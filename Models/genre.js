const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },

    name:{
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);


const schema = Joi.object({
    name :Joi.string().min(3).required()
});


function schemaValidate(genre)
{
   return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.schemaValidate = schemaValidate;
module.exports.genreSchema = genreSchema;