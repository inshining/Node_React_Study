var express = require('express');
var router = express.Router();
const locationModel = require('../model/location');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload', (req, res, next) => {
  res.render('upload');
})

router.get('/test', (req, res, next) => {
  console.log("테스트 완료");
  res.json({
    message: "response 완료!"
  })
})

router.post("/test2", (req, res, next) => {
  res.json({
    message: "post 요청 완료"
  })
})

router.post('/location', (req, res, next) => {
  const {title, address, lat, lng} = req.body;
  let location = new locationModel();
  location.title = title;
  location.address = address;
  location.lat = lat;
  location.lng = lng;

  location.save().then(result => {
    console.log(result);
    res.json({
      message: 'success',
    })
  })
  
})

module.exports = router;
