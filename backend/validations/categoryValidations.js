const { body } = require('express-validator');

module.exports = [body('name').not().isEmpty().trim().escape().withMessage('Es necesario un nombre para la categoría')];