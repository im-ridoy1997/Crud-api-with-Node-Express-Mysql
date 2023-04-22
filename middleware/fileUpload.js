const multer  = require('multer');
var createError = require('http-errors');


// // Create a multer instance with the desired configuration
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });

// const upload = multer(
//     { 
//         storage: storage,
//         fileFilter : (req, file, cb) => {
//             // Check if the file type is allowed
//             const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
//             if (!allowedTypes.includes(file.mimetype)) {
//                 return cb(createError(404, 'Only PNG, JPEG and JPG images are allowed.'));
//             }

//             // Check if the file size is within the limit
//             const maxSize = 1024 * 1024 * 10; // 5 MB
//             if (file.size > maxSize) {
//                 return cb(createError(404, 'File size exceeds the limit of 10MB.'));
//             }

//             // If the file passes validation, accept it
//             cb(null, true);
//         }
//     }
// );

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const uploadFile = (req, res, next) => {
    // Use the `upload.any()` method to process any number of uploaded files
    upload.any()(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: err });
      } else if (err) {
        return res.status(500).json({ error: err });
      }
      next();
    });
  }

module.exports = { uploadFile };