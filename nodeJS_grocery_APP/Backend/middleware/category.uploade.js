const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../uploade/categories"));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    const acceptableExt = [".png", ".jpg", ".jpeg"];
    const fileExt = path.extname(file.originalname).toLowerCase();

    if (!acceptableExt.includes(fileExt)) {
        return callback(new Error('Only .png, .jpg, and .jpeg images are allowed'));
    }

    callback(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1048576 // 1MB file size limit
    }
});

module.exports = upload.single('category_image'); 
