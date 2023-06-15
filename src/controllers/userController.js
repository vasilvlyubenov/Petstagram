const router = require('express').Router();
const userService = require('../services/userService');
const { getErrorMessages } = require('../utils/errorHelper');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, rePassword } = req.body;
    try {
        await userService.register({ username, email, password, rePassword });
        res.redirect('/');
    } catch (error) {
        const err = getErrorMessages(error)[0];
        res.render('register', { error: err });
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    try {
        const token = await userService.login(username, password);
        res.cookie('auth', token, {httpOnly: true});

        res.redirect('/');
    } catch (error) {
        const err = getErrorMessages(error)[0];
        res.render('login', { error: err });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});
module.exports = router;