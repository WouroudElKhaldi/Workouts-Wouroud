const express = require('express')
const mongoose = require('mongoose')
const routes = require('./router/routes')
const userRoutes = require('./router/user')
const Logging = require('./middleware/Logging.js')
const morgan = require('morgan')
const customMorgan  = require('./middleware/morgan.js')

require('dotenv').config()
const port = process.env.PORT
const url = process.env.URL

const app = express();

app.use(express.json())
app.use(Logging)
// morgan.token('customFormat', customMorgan);
// app.use(morgan(':customFormat'));
app.use(morgan)


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
app.use('/users/', userRoutes)