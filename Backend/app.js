const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path'); 
const cors = require('cors');

// On importe la route dédiée aux sauces
const pangolinRoutes = require('./routes/pangolin');
// On importe la route dédiée aux users
const userRoutes = require('./routes/user');


mongoose.connect("mongodb+srv://NicolaPaolss:Password1234@cluster2.bncco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();



app.use(bodyParser.json()); 
app.use(cors());

app.use('/api/pangolin', pangolinRoutes);
app.use('/api/auth', userRoutes);


module.exports = app; 