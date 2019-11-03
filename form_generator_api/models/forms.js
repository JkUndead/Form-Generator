const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  status: {
    type: String
  },
  elementValues: {}

})

const Form = mongoose.model('Form', formSchema);

module.exports = Form;