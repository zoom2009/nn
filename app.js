const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/DB').then((doc) => {
    console.log('success to connect db')
}, (err) => {
    console.log('fail to connect db')
})

var Schema = mongoose.Schema

var StudentSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        minlength: 8,
        maxlength: 8
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: Number
})


var CarSchema = new Schema({
    carID: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    prize: {
        type: Number,
        required: true
    }
})


var Student = mongoose.model('Student', StudentSchema)
var Car = mongoose.model('Car', CarSchema)


var app = express() // เรียกใช้เสมอ ถ้าใช้ express
app.use(bodyParser.json())

app.get('/getStudent', (req, res) => {
    Student.find().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.post('/postStudent', (req, res) => {
    let newStudent = new Student({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    })
    newStudent.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/getCar', (req, res) => {
    Car.find().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.post('/postCar', (req, res) => {
    let newCar = new Car({
        carID: req.body.carID,
        brand: req.body.brand,
        owner: req.body.owner,
        prize: req.body.prize
    })
    newCar.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})


app.listen(3000, () => {
    console.log('is listen on port 3000')
})
