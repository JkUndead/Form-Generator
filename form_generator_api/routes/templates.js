const express = require('express'),
	  router = express.Router(),
	  templateHelpers = require('../helpers/templates'),
	  elementHelpers = require('../helpers/elements');
	  //db = require('../models');

//For All templates
router.route('/')
	.get(templateHelpers.getTemplates) //show all templates
	.post(templateHelpers.createTemplates); //create new templates

//For One specific template
router.route('/:templateId')
	.get(templateHelpers.getTemplate) //show one specific template
	.put(templateHelpers.updateTemplate) //update that template
	.delete(templateHelpers.deleteTemplate); //delete that template

//For all elements
router.route('/:templateId/elements')
	.post(elementHelpers.createElement); //create new element

//For each elements
router.route('/:templateId/elements/:elementId')
	.get(elementHelpers.getElement) //show one element
	.put(elementHelpers.updateElement) //update one element
	.delete(elementHelpers.deleteElement); //delete one element

module.exports = router;










