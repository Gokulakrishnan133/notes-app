const express = require('express');
const cors = require("cors");
const noteRouter = require('./routes/noteRoute');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(express.json());
app.use(cors());

const DB_URL = process.env.DB_URL;
const DB = DB_URL.replace('<password>', process.env.DB_PWD);
console.log("DB is "+DB)
mongoose.connect(DB).then(()=>{
    console.log('MongoDB connection successful')
}).catch((err) => {
    console.log(`MongoDB connection failed `, err.message);
});

app.use('/api/notes', noteRouter);

module.exports = app;