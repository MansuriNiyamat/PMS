var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');
var Stories = mongoose.model('Stories');
var Task = mongoose.model('Task');




module.exports.create = function (req, res) {

  if (req.body.type === 'project') {
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
        "response": resp,
        'error':err
      });
    });
  }
  else if (req.body.type === 'stories') {
    var stories = new Stories();
    var payload = req.body.payload;
    stories.name = payload.name;
    stories.description = payload.description;
    stories.priority = payload.priority;
    stories.p_Id = payload.p_Id;

    stories.save(function (err, resp) {
      res.status(200);
      res.json({
        "message": 'Stories add Sucessfully',
        "flag": true,
        "response": resp,
        'error':err
      });
    });
  }
  else if (req.body.type === 'task') {
    var task = new Task();
    var payload = req.body.payload;
    task.name = payload.name;
    task.description = payload.description;
    task.priority = payload.priority;
    task.owner = payload.owner;
    task.hours = payload.hours;
    task.start = payload.start;
    task.status = payload.status;
    task.s_Id = payload.s_Id;
    task.p_Id = payload.p_Id;
    task.save(function (err, resp) {
      res.status(200);
      res.json({
        "message": 'Task add Sucessfully',
        "flag": true,
        "response": resp,
        'error':err
      });
    });
  }
};

module.exports.update = function (req, res) {
  var payload = req.body.payload;
  console.log('+++from Update+++');
  console.log(payload)
  

  Task
    .update({"_id": payload._id},

    {
      "name" : payload.name,
      "description" : payload.description,
      "priority" : payload.priority,
      "owner" : payload.owner,
      "hours" : payload.hours,
      "start" : payload.start,
      "status" : payload.status
    }).exec(
      function (err, resp) {
        console.log(err);
        res.status(200).json({
          "message": 'Task updated Sucessfully',
          "flag": true,
          "response": resp,
          'error':err
        });
      });
};




module.exports.read = function (req, res) {
  var header = req.headers;
  if (header.type == 'project') {
    Project
      .find()
      .exec(function (err, resp) {
        res.status(200).json(resp);
      });
  } else if (header.type == 'stories') {
    Stories
      .find({ p_Id: header.id })
      .exec(function (err, resp) {
        res.status(200).json(resp);
      });
  } else if (header.type == 'task') {
    Task
      .find({ s_Id: header.id })
      .exec(function (err, resp) {
        res.status(200).json(resp);
      });
  }

};

module.exports.delete = function (req, res) {
  var header = req.headers;
  if (header.type === 'project') {
    Project
      .remove({ _id: header.id })
      .exec(function (err, resp) {
        res.status(200).json({
          "message": 'project deleted Sucessfully',
          "flag": true,
          "response": resp,
          'error':err
        });
      });
  } else if (header.type === 'stories') {
    Stories
      .remove({ _id: header.id })
      .exec(function (err, resp) {
        res.status(200).json({
          "message": 'stories deleted Sucessfully',
          "flag": true,
          "response": resp,
          'error':err
        });
      });
  }
  else if (header.type === 'task') {
    Task
      .remove({ _id: header.id })
      .exec(function (err, resp) {
        res.status(200).json({
          "message": 'task deleted Sucessfully',
          "flag": true,
          "response": resp,
          'error':err
        });
      });
  }

};






