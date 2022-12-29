var multer = require('multer');
const path = require('path')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
});
 
var uploadSingleAvatar = multer({ storage: storage }).single('avatar');

module.exports = {
    storage,
    uploadSingleAvatar,
}