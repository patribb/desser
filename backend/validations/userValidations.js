const { body } = require('express-validator');

module.exports.registerValidations = [
    body('name').not().isEmpty().trim().escape().withMessage('El nombre es necesario.'),
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('El email es necesario.'),
    body('password').isLength({min: 5}).withMessage('La contraseña debe tener al menos 5 caracteres')
]

module.exports.loginValidations = [
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('El email es necesario.'),
    body('password').not().isEmpty().withMessage('La contraseña es necesaria')
]