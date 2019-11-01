const express = require('express'),
    router = express.Router();
    userHelpers = require('../helpers/users'),
    db = require('../models');

router.route('/')
    .get(userHelpers.getUsers)
    .post(userHelpers.createUser);

router.route('/:userId')
    .get(userHelpers.getUser)
    .put(userHelpers.updateUser)
    .delete(userHelpers.deleteUser);


module.exports = router;
