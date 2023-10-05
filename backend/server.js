const express = require('express')
const mongoose = require('mongoose')
const routes = require('./router/routes')


require('dotenv').config()
const port = process.env.PORT
const url = process.env.URL

const app = express();

app.use(express.json())

//connecting to db
mongoose.connect(url , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
        app.listen(port, () => console.log(
            `Server is now listening on port: http://localhost:${port} \nConnected to Mongo DB`
        ));
    })
    .catch((error) => {
        console.error(error);
    })

app.use('/workout/', routes)