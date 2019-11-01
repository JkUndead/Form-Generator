const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String
  },
  elementValue: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId
      },
      value: {}
    }
  ]
})

const Form = mongoose.model('Form', formSchema);

module.exports = Form;