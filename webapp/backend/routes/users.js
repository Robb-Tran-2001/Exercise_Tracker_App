const router = require('express').Router();
let User = require('../models/user.model');

//path for get requests
router.route('/').get((req, res) => {
    //find in database
    User.find()
        .then(users => res.json(users)) //then responds as json
        .catch(err => res.status(400).json('Error: ' + err)); //responds error as json
});

router.route('/add').post((req, res) => {
    //grab username, create new User
    const username = req.body.username;
    const newUser = new User({username});
    //save to database then respond with status
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;