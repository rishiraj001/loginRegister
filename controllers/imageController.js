const User = require('../models/user')
const Image = require('../models/image')

exports.upload_image = function(req,res){
    if(req.isAuthenticated()) {
        return res.render('upload_image',{
            title: "Upload Image"
        })
    }
    return res.redirect('/')
}

exports.imageUploadRoute = async (req, res, next) => {
    try{
        const { imageTitle } = req.body;
        const image = new Image({imageTitle, user: req.user._id});
        if(req.file) {
            image.image = {
                data : req.file.filename
            }
        }

        await image.save()
        console.log(image)
        return res.redirect('/profile');
    }
    catch(err) {
        next(err)
    }
}

exports.filterImage = async (req, res, next) => {
    try {
        const { imageTitle } = req.body;
        if(imageTitle) {
            const result = await Image.find(req.body);
            return res.render('filter_images.ejs',{
                title: "Filter Images",
                images : result,
            });
        }
        return res.redirect('/profile');
    }
    catch(err) {
        console.log(err)
        next(err)
    }
}

exports.deleteAllImages = async (req,res) => {
    const images = await Image.deleteMany();
    res.send(images)
}

exports.findAllImages = async (req,res) => {
    const images = await Image.find();
    res.send(images)
}

exports.getCombineData = async (req, res, next) => {
    try{
        const id = req.params.id;
        const images = await Image.find({user: id});
        return res.render('show_images.ejs',{
            title: "Show Images",
            images : images,
        });
    }
    catch(err) {
        console.log(err)
        next(err)
    }
}