// import statement
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors= require('cors');
const albumsRoutes = require('./routes/albums');
const authuserRotes = require('./routes/users');


const app = express();
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:true
})
.then(()=>{              
    console.log("DB CONNECT");
});
//MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes API
app.use("/api",albumsRoutes);
app.use("/api",authuserRotes);
//Port
const port = process.env.PORT || 8000;
   
//Server
app.listen(port, () => console.log(`Server up and running on port ${port} !`));