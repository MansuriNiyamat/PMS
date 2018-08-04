var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');
var Stories = mongoose.model('Stories');



module.exports.create = function (req, res) {

  if (req.body.type === 'project') {
    console.log("++++++create/project+++++");
    console.log(req.body.payload);
    var project = new Project();
    var payload = req.body.payload;
    project.name = payload.name;
    project.description = payload.description;
    project.owner = payload.owner;
    project.date = payload.date;

    project.save(function (err, resp) {
      res.status(200);
      res.json({
        "message": 'Project add Sucessfully',
        "flag": true,
        "resp": resp
      });
    });
  }
  else if (req.body.type === 'stories') {
    console.log(req.body);

    console.log("+++++create/stories++++++");
    console.log(req.body.payload);
    var stories = new Stories();
    var payload = req.body.payload;
    stories.name = payload.name;
    stories.description = payload.description;
    stories.priority = payload.priority;
    stories.p_Id = payload.p_Id;

    stories.save(function(err, resp) {
      res.status(200);
      res.json({
        "message" : 'Stories add Sucessfully',
        "flag": true,
        "resp": resp
      });
    });
  }
};

module.exports.update = function (req, res) {
  console.log(req.body.payload);
  var payload = req.body.payload;
  var temp;
  temp.name = payload.name;
  temp.description = payload.description;
  temp.owner = payload.owner;
  temp.date = payload.date;

  Project
    .update({ _id: payload._id }, {
      $set: {
        name: payload.name,
        description: payload.description,
        owner: payload.owner,
        date: payload.date
      }
    }).exec(
      function (err, resp) {
        console.log(resp);
        res.status(200).json(resp);
      });
};



module.exports.read = function (req, res) {
  console.log("++++++read+++++");

  console.log(req.headers)
  var header = req.headers;
  console.log(header);
  if (header.type == 'project') {
    console.log("inside project")
    Project
      .find()
      .exec(function (err, resp) {
        res.status(200).json(resp);
      });
  } else if (header.type == 'stories'){
    console.log("inside stories")
    Stories
    .find({ p_Id: header.id})
    .exec(function (err, resp) {
      res.status(200).json(resp);
    });
  }

};

module.exports.delete = function (req, res) {
  console.log("++++++delete+++++");
  var header = req.headers;
  if (header.type === 'project') {
   Project
      .remove({_id:header.id})
      .exec(function(err, resp) {
        res.status(200).json(resp);
      });
  } else if (header.type === 'stories'){
    Stories
    .remove({_id:header.id})
    .exec(function(err, resp) {
      res.status(200).json(resp);
    });
  }
 
};





