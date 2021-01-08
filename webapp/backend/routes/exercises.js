const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//path for get requests
router.route('/').get((req, res) => {
    //find in database
    Exercise.find()
        .then(exercises => res.json(exercises)) //then responds as json
        .catch(err => res.status(400).json('Error: ' + err)); //responds error as json
});

router.route('/add').post((req, res) => {
    //grab username, create new User
    const username = req.body.username;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({username, description, duration, date});
    //save to database then respond with status
    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/get/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/delete/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise =>{
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;