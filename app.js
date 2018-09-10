const express = require('express')
const mongodb = require('mongodb')

var app = express() // เรียกใช้เสมอ ถ้าใช้ express

app.get('/', (req, res) => {
    res.send('hello')
})



app.listen(3000, () => {
    console.log('is listen on port 3000')
})