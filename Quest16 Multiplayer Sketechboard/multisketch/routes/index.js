var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// io.on('connection', function(socket) {
// 	console.log('a user connected');
// });

module.exports = router;
