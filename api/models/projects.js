var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  date: String
});

var storiesSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  p_Id: {
    type: String,
    required: true
  }
});

var taskSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  hours: {
    type: Number,
    required: true
  },
  start: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  s_Id: {
    type: String,
    required: true
  },
  p_Id: {
    type: String,
    required: true
  }
});


mongoose.model('Project', projectSchema);
mongoose.model('Stories', storiesSchema);
mongoose.model('Task', taskSchema);

