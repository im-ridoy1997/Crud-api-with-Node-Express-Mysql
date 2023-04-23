const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });



const uploadFile = (req, res, next) => {
  // Use the `upload.any()` method to process any number of uploaded files
  upload.single('image')(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err });
    } else if (err) {
      return res.status(500).json({ error: err });
    }
    if (!req.file) {
      return res.status(400).json({ 
        status: 'false',
        message: 'Image is missing' 
      });
    }
    next();
  });
}

const updateFile = (req, res, next) => {
  // Use the `upload.any()` method to process any number of uploaded files
  upload.single('image')(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err });
    } else if (err) {
      return res.status(500).json({ error: err });
    }
    next();
  });
}

module.exports = { 
  uploadFile,
  updateFile 
};