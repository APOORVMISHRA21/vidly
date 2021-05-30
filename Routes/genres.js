const {Genre, schemaValidate, genreSchema} = require('../Models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.use(express.json());


router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.send(genres);
});

router.get('/:id',async (req, res) => {

    const genre = await Genre.find({id: parseInt(req.params.id)});

    if(genre)
    {
        res.send(genre);
        return;
    }
    else{
        res.status(404).send('The course with given ID do not exist..!!');
        return;
    }
});


router.post('/', async (req, res) => {

    const {error} = schemaValidate(req.body);

    if(error)
    {
        res.status(404).send(error);
        return;
    }

    Genre.count({}, async (err, count) => {

        const genre = new Genre({
        
            id : count + 1,
            name : req.body.name
        });
    
        console.log(genre.id);
    
        const result = await genre.save();
        res.send(genre);
    });

    
});


router.put('/:id', async (req, res) => {

    const { error } = schemaValidate(req.body);

    if(error)
    {
        res.status(404).send(error);
        return;
    }

    const genre = await Genre.findOneAndUpdate({id: parseInt(req.params.id)}, {name: req.body.name}, {new: true});

    res.send(genre);
});


router.delete('/:id', async (req, res) => {
    
    const genre = await Genre.deleteOne({id: parseInt(req.params.id)});
    res.send(genre);
});



module.exports = router;