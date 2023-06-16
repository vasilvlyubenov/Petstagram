const router = require('express').Router();
const Pet = require('../models/Pet');
const petService = require('../services/petService');
const { getErrorMessages } = require('../utils/errorHelper');

router.get('/catalog', async (req, res) => {
    try {
        const pets = await Pet.find().populate('owner').lean();
        console.log(pets);
        res.render('pets/catalog', { pets });
    } catch (error) {
        const err = getErrorMessages(error)[0];
        res.render('pets/catalog', { error: err });
    }

});

router.get('/add-photo', (req, res) => {
    res.render('pets/create');
});

router.post('/add-photo', async (req, res) => {
    const petData = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await petService.create(petData);
        res.redirect('/pets/catalog');
    } catch (error) {
        const err = getErrorMessages(error)[0];
        res.render('pets/create', { error: err, petData });
    }

});


module.exports = router;