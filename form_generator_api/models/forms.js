const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  template: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template'
    },
    title: String
  },

  managerList: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      managerName: String
    }
  ],

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
  currentProgress: {
    type: String
  },

  elementValues: {},

  submission_date: {
    type: Date
  }

})

const Form = mongoose.model('Form', formSchema);

module.exports = Form;