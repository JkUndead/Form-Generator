const express = require('express'),
      router = express.Router();
      formHelpers = require('../helpers/forms');

//For all forms
router.route('/')
    .get(formHelpers.getForms)
    .post(formHelpers.createForm);

//For one form
router.route('/:formId')
    .get(formHelpers.getForm)
    .put(formHelpers.updateForm)
    .delete(formHelpers.deleteForm);

module.exports = router;