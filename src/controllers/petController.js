const router = require('express').Router();
const Pet = require('../models/Pet');
const petService = require('../services/petService');
const { getErrorMessages } = require('../utils/errorHelper');
const { isAuth } = require('../middleware/authMiddleware');

router.get('/catalog', async (req, res) => {
    try {
        const pets = await Pet.find().populate('owner').lean();

        res.render('pets/catalog', { pets });
    } catch (error) {
        const err = getErrorMessages(error)[0];
        res.render('pets/catalog', { error: err });
    }

});

router.get('/add-photo', isAuth, (req, res) => {
    res.render('pets/create');
});

router.post('/add-photo', isAuth, async (req, res) => {
    const petData = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await petService.create(petData);
        res.redirect('/pets/catalog');
    } catch (error) {
        const err = getErrorMessages(error)[0];
        res.render('pets/create', { error: err });
    }

});

router.get('/:petId/details', async (req, res) => {
    const petId = req.params.petId;

    try {
        const pet = await petService.getById(petId).populate('owner').populate('commentList.userID').lean();

        const isOwner = req.user?._id === pet.owner._id.toString();
        const isLogged = !isOwner && res.locals.user !== undefined;

        res.render('pets/details', { pet, isOwner, isLogged });
    } catch (error) {
        res.status(400).redirect('404');
    }

});

router.post('/:petId/comment', isAuth, async (req, res) => {
    const petId = req.params.petId;

    const object = {
        userID: req.user._id,
        comment: req.body.comment,
    };

    try {
        const pet = await petService.getById(petId);
        pet.commentList.push(object);
        pet.save();

        res.redirect(`/pets/${petId}/details`);
    } catch (error) {
        const err = getErrorMessages(error)[0];
        res.render(`pets/${petId}/details`, { error: err });
    }
});

router.get('/:petId/delete', isAuth, async (req, res) => {
    const petId = req.params.petId;

    try {
        await petService.delete(petId);

        res.redirect('/pets/catalog');
    } catch (error) {
        const err = getErrorMessages(error)[0];
        res.render(`pets/${petId}/details`, { error: err });
    }
});

router.get('/:petId/edit', isAuth, async (req, res) => {
    const petId = req.params.petId;

    try {
        const pet = await petService.getById(petId).lean();

        res.render('pets/edit', { pet });
    } catch (error) {
        const err = getErrorMessages(error)[0];
        res.render(`pets/${petId}/details`, { error: err });
    }

});

router.post('/:petId/edit', isAuth, async (req, res) => {
    const petId = req.params.petId;
    const petDdata = req.body;
    try {
        await petService.update(petId, petDdata);
        res.redirect(`/pets/${petId}/details`);
    } catch (error) {
        const err = getErrorMessages(error)[0];
        res.render(`pets/${petId}/edit`, { error: err });
    }
});

module.exports = router;