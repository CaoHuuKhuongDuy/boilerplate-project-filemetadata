const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer')
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.bodyParser())

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

let upload = multer({ dest: 'uploads/' })

app.post('/api/fileanalyse',upload.single('upfile'),function (req,res){
  let result = {
    name : req.file.originalname,
    type : req.file.mimetype,
    size : req.file.size
  }
  res.send(result)
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
