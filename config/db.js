const mongoose = require('mongoose')
const DB = process.env.DB

mongoose.connect(DB).then(() => {
    console.log(`Connected to Mongo::DB`)
}).catch(err => {
    console.log(err);
})