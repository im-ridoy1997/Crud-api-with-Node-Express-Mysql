const { check, body, validationResult } = require('express-validator');

const validateCreateData = [
  check('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  check('email')
    .isEmail()
    .withMessage('Email must be valid'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

const userCreateValidation = [
  check('name').notEmpty().withMessage('Name is required.'),
  check('email').notEmpty().withMessage('Email is required.'),
  check('password').notEmpty().withMessage('Password is required.'),
  check('image').custom((value, {req}) => {
      if (!req.file) {
        throw new Error('Image file is required.');
      }
      const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedMimes.includes(req.file.mimetype)) {
        throw new Error('File type is not supported.');
      }
      return true;
    })
    .withMessage('Image file is invalid.'),
  (req, res, next) => {
    console.log(req);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

const customCreateValidation = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
      return res.status(400).json({
        status: 'false',
        message: 'Missing name or email or password' 
      });
  }
  next();
}

module.exports = { 
  validateCreateData, 
  userCreateValidation, 
  customCreateValidation 
};