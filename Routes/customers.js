const mongoose = require('mongoose');
const {Customer, schemaValidate} = require('../Models/customer');
const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});

router.get('/:id', async (req, res) => {

    const customer = await Customer.findOne({customerId : parseInt(req.params.id)});

    if(customer)
    {
        res.send(customer);
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

    Customer.count({}, async(err, count) => {

        const customer = Customer({
            customerId: count+1,
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        });

        const result = await customer.save();

        res.send(customer);
    });

});

router.put('/:id', async(req, res) => {

    const {error} = schemaValidate(req.body);

    if(error)
    {
        res.status(404).send(error);
        return;
    }

    const customer = await Customer.findOneAndUpdate({customerId: req.params.id}, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: parseInt(req.body.phone)
    }, {new: true});

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    
    const customer = await Customer.deleteOne({customerId: parseInt(req.params.id)});
    res.send(customer);
});

module.exports = router;