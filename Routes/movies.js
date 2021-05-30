const mongoose = require('mongoose');
const {Movie, schemaValidate} = require('../Models/movie');
const {Genre, schemaValidate1, genreSchema} = require('../Models/genre');
const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

router.get('/:id', async (req, res) => {

    const movie = await movie.findOne({movieId : parseInt(req.params.id)});

    if(movie)
    {
        res.send(movie);
        return;
    }
    else{
        res.status(404).send('The course with given ID do not exist..!!');
        return;
    }
});

router.post('/', (req, res) => {

    const {error} = schemaValidate(req.body);

    if(error)
    {
        res.status(404).send(error);
        return;
    }

    Movie.count({}, async(err, count) => {

        const genre = await Genre.findOne({id: parseInt(req.body.genreId)});

        if(!genre)
            return res.status(404).send('Invalid Genre sent!');

        const movie = new Movie ({
            //movie details
            movieId : count + 1,
            title: req.body.title,
            genre : {
                _id : genre._id,
                id : genre.id,
                name : genre.name
            },
            numberInStock : req.body.numberInStock,
            dailyRentalRate : req.body.dailyRentalRate
        });

        const result = await movie.save();

        res.send(movie);
    });

});

router.put('/:id', async(req, res) => {

    const {error} = schemaValidate(req.body);

    if(error)
    {
        res.status(404).send(error);
        return;
    }

    const genre = await Genre.findOne({id: parseInt(req.body.genreId)});

    if(!genre)
        return res.status(404).send('Invalid Genre sent!');

    const movie = await Movie.findOneAndUpdate({movieId: parseInt(req.params.id)}, {
        //update movie details

        title: req.body.title,
        genre : {
            _id : genre._id,
            id: genre.id,
            name: genre.name
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
        
    }, {new: true});

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    
    const movie = await Movie.deleteOne({movieId: parseInt(req.params.id)});
    res.send(movie);
});

module.exports = router;