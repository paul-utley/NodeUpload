var express = require('express');
var multer = require('multer');
var path = require('path');
var mime = require('mime');

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, "./uploads");
	},
	filename: function(req, file, cb){
		var fileNameArr = file.originalname.split(".");
		fileNameArr.pop();
		var fileNoExt = fileNameArr.join(".");
		cb(null, fileNoExt + '-' + Date.now() + "." + mime.extension(file.mimetype));
	}
});


function fileFilter(req, file, cb){

}

var upload = multer({ storage: storage});


var app = express();

app.post('/upload', upload.single('data'), function(req, res, next){
	console.log('uploading: ' + req.file.originalname.split(".").pop());
	console.log(req.file);
});

app.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.listen(3000, function(){
	console.log("Listening on port 3000");
});

