const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null, "./uploade/categories");
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req , file, callback) => {
    const acceptableExt = [".png" , ".jpg" , ".jpeg"];
    if (!acceptableExt.includes(path.extname(file.originalname).toLowerCase())) {
        return callback(new Error('Only .pnf .jpg and .jpeg images are allowed'));
    }

    const fileSize = parseInt(req.headers["content-length"]);

    if (fileSize > 1048576){
        return callback(new Error('File size should not exceed 1MB'));
    }

    callback(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1048576
    }
});

module.exports = upload.single('categoryImage');