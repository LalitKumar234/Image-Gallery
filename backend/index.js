require("dotenv").config();
const connectDatabase = require("./mongo.config");
const cors = require('cors');
const express = require('express');
const port = process.env.PORT || 4000
const uploadRoute = require('./Router/fileUpload.router')
const expressUploader = require('express-fileupload')
const fetch = require('node-fetch')

const app = express();

app.use(expressUploader())

connectDatabase();
app.use(cors());
app.use(uploadRoute);

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => console.log(`server started on port ${port}`))