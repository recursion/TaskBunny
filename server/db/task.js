var mongoose = require('mongoose');



var TaskSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // user._id of creator of task
  information: Object,  
  // details of task (data from task creating form)
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  // array of individuals (user._id, as a string) applied for task (see below)
  
  // without .populate()
  // [{
  //   "xyzabc"
  // }]

  // with .populate()
  // [{
  //   _id: user._id,
  //   name: user.name
  // }]

  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // track task progress 
  // for now lets say states can be a number 0 - 5
  // 0 - dispute (by task owner)
  // 1 - open (set at creation)
  // 2 - pending (set at assignment)
  // 3 - task ready (completed)  (set by task doer)
  // 4 - completion confirmed (by task owner)
  state: {
    type: Number,
    default: 1,
    min: 0,
    max: 4,
  },

});

// this is called from the controller when the state is allowed to 
// progress to the next level
TaskSchema.methods.progress = function() {
  this.state++;
};

module.exports = mongoose.model('Task', TaskSchema);
