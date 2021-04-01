const express = require('express');
const app = express();
const mongoose = require('mongoose');
 var bodyParser = require('body-parser')
 var jsonParser = bodyParser.json();

const User = require('./users')
mongoose.connect('mongodb+srv://marvel:sanjayravidas@cluster0.fntz2.mongodb.net/helpone?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true

}

);
app.get('/users', function (req, res) {
    User.find().then((data) => {
        res.status(200).json(data)
    })
})
app.post('/user', jsonParser, function (req, res) {
    const data = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
    })
    data.save().then((result)=>{
        res.status(200).json(result)
    })
        .catch((error) => console.warn(error))
})
app.delete('/user/:id', function (req, res) {
    User.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(201).json(result)
    })
    .catch((error) => console.warn(error))
})
app.put('/user/:id',jsonParser,function(req,res){
    User.updateOne(
        { _id: req.params.id },
        { $set: { 
            name: req.body.name,
            email:req.body.email,
            address:req.body.address
        
        }}
    ).then((result) => {
        res.status(201).json(result)
    })
    .catch((error) => console.warn(error))
})

app.listen(3000)