const mongoose = require('mongoose');
const {Rental, validateRental} = require('../Models/rental');
const {Movie, schemaValidate} = require('../Models/movie');
const {Customer, schemaValidate1, customerSchema} = require('../Models/customer');

const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    const rental = await Rental.find();
    res.send(rental);
    return;
});

router.get('/:id', async (req, res) => {

    const rental = await Rental.findOne({rentalId: req.params.id});

    if(!rental)
        return res.send('No such rental record available').status(400);

    res.send(rental);
    return;
});

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);

    if(error)
        return res.send(error.message);
    
    const customer = await Customer.findOne({_id: req.body.customerId});
    const movie = await Movie.findOne({_id: req.body.movieId});

    if(!customer)
        return res.status(400).send("Invalid Customer ID");
    if(!movie)
        return res.status(400).send("Invalid Movie Id");

    Rental.count({}, async(err, count) => {

        const rental = new Rental({

            rentalId : count+1,

            customer : {
                name: customer.name,
                isGold: customer.isGold,
                phone : customer.phone
            },

            movie: {
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }

        });

        const result = await rental.save();
        res.send(rental);
        return;
    });
});

router.put('/:id', async (req, res) => {

    const { error } = validateRental(req.body);

    if(error)
        return res.send(error.message);

    const customer = await Customer.findOne({customerId: parseInt(req.body.customerId)});
    const movie = await Movie.findOne({movieId: parseInt(req.body.movieId)});

    if(!customer)
        return res.status(400).send("Invalid Customer ID");
    if(!movie)
        return res.status(400).send("Invalid Movie Id");


    const rental = await Rental.findOneAndUpdate({movieId: parseInt(req.params.id)}, {
            //update rental details
    
            customer : {
                name: customer.name,
                isGold: customer.isGold,
                phone : customer.phone
            },                        

            movie: {
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
            
    }, {new: true});

    res.send(rental);
    return;
    
});

router.delete('/:id', async (req, res) => {
    
    const rental = await Rental.deleteOne({rentalId: parseInt(req.params.id)});
    res.send(rental);
});

module.exports = router;