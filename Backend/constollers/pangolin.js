
const ObjectId = require('mongoose').Types.ObjectId;

const Pangolin = require('../models/Pangolin');

exports.getAllPangolin = (req, res, next) => {
  Pangolin.find((err,docs) => {
    if (!err) {res.send(docs); } 
    else { console.log ('Error in Pangolin:', + JSON.stringify(err, undefined, 2)); }
  })
}; 


exports.getOnePangolin = (req, res, next) => {
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record width given id: ${req.params.id}`); 

  Pangolin.findById(req.params.id, (err,doc) => {
    if (!err) {res.send(doc); } 
    else { console.log ('Error in Pangolins:', + JSON.stringify(err, undefined, 2)); }
  })
  
}

exports.PostPangolin = (req, res, next) => {
  const pan = new Pangolin({
    age: req.body.age,
    famille: req.body.famille, 
    race: req.body.race, 
    norriture: req.body.norriture
  });
  pan.save((err,doc)=> {
    if (!err) {res.send(doc); } 
    else { console.log ('Error in Pangolins:', + JSON.stringify(err, undefined, 2)); }
  })
} 

exports.ModifyPangolin = (req, res, next) => {
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record width given id: ${req.params.id}`); 
  const pan = {
    age: req.body.age,
    famille: req.body.famille, 
    race: req.body.race, 
    norriture: req.body.norriture
  };
  Pangolin.findOneAndUpdate(req.params.id, { $set : pan}, { new: true}, (res, doc) => {
    if (!err) {res.send(doc); } 
    else { console.log ('Error in Pangolins:', + JSON.stringify(err, undefined, 2)); }
  })
}

exports.DeletePangolin = (req, res, next) => {
  if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record width given id: ${req.params.id}`); 
  Pangolin.findByIdAndRemove(req.params.id, ( err, doc) => {
    if (!err) {res.send(doc); } 
    else { console.log ('Error in Employees:', + JSON.stringify(err, undefined, 2)); }
  });
}




