const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/');
  },
  filename: (req, file, cb) => {
    // remove extension from filename (e.g. 'filename.jpg' => 'filename')
    // if that results in a falsy value, use original filename
    const filename =
      file.originalname.split('.').slice(0, -1).join('.') || file.originalname;
    // get extension from mimetype (e.g. 'image/jpeg' => 'jpeg')
    const extension = file.mimetype.split('/').pop();
    // e.g. filename: filename-1710463486885.jpeg
    cb(null, `${filename}-${Date.now()}.${extension}`);
  },
});

module.exports.upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // if `image` mimetype: return true; else: false
    file.mimetype.split('/')[0] === 'image' ? cb(null, true) : cb(null, false);
  },
});
