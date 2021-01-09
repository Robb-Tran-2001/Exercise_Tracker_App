const express = require('express'); //get dependencies
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config(); //config environment variables in .env file

const app = express(); //express server
const port = process.env.PORT || 5000;

app.use(cors()); //cors policies
app.use(express.json()); //json parser

//connects to uri of database, flags to deal with mongodb updates
const uri = "mongodb+srv://bobby:XkdVHteHlnDKgreR@cluster0.mjlo9.mongodb.net/<dbname>?retryWrites=true&w=majority";
//process.env.ATLAS_URI
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection success")
})

//require router files, app uses these files when someone goes to the associated urls
const exerciseRouter = require('./routes/exercises')
const userRouter = require('./routes/users')

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter)

app.listen(port, () => {
    console.log('Server running on port:', port)
});

