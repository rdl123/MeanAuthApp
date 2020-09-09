const express = require("express");
const path =require("path");
const bodyParser =require("body-parser");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/database")

connectDB();
const app = express();
const users = require('./routes/users');
const port = process.env.Port || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use('/users',users);
app.use(passport.initialize());
app.use(passport.session())

require('./config/passport')(passport);

// THE client Side 
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname),'public/index.html')
})
app.listen(port, ()=>{
    console.log('Server statrted on port '+port)
})


