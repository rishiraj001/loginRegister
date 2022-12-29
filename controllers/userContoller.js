const User = require('../models/user')
const bcrypt = require('bcryptjs')

//Rendering the Home
exports.profile = function(req,res){
    return res.render('profile',{
        title: "Profile",
    })
}

exports.register = function(req,res){
    if(req.isAuthenticated()) {
        return res.redirect('/api/profile')
    }
    return res.render('register',{
        title: "Sign Up"
    })
}

exports.signIn = function(req,res){
    if(req.isAuthenticated()) {
        res.redirect('/api/profile')
    }
    else return res.render('login',{
        title: "Sign In"
    })
}

exports.createUser = async (req,res) => {
    const { name, email, phone, password, address } = req.body;
    if(!name || !email || !phone || !address){
        return res.status(422).json({
            message:'please fill the information properly'
        })
    }
    try{
        const userExist = await User.findOne({ "$or": [ { email: email }, { phone: phone} ] });
        if(userExist){
            return res.status(422).json({error: 'email or phone  already exists'})
        }

        // if it not exist
        const user = new User({name, email, phone, password, address});
        console.log(req.file)
        if(req.file) {
            user.avatar = {
                data : req.file.filename
            }
        }

        user.password = await bcrypt.hash(user.password , 10)
        await user.save()
        return res.redirect('/api/signIn');
    }
    catch(error){
        res.status(500).json({error: 'error while creating user'})
    }
}

exports.loginUser = async (req, res) => {
    res.redirect('/api/profile');
}

exports.findAllUsers = async (req,res) => {
    const users = await User.find({});
    res.send(users)
}

// For logout
exports.logout = (req, res, next)=>{
    req.logout( (err) => {
        if (err) { 
            return next(err); 
        }
        res.redirect('/api');
    });
}
