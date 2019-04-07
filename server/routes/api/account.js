const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const User = require('mongoose').model('User');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now()+path.extname(file.originalname));
  }
});

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 100000000 }
// }).single("myImage");

const upload2 = multer({
  storage: storage,
  limits: { fileSize: 100000000 }
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

router.post("/uploadPhoto", upload2.single("testFile"), (req, res, next) => {
  console.log(req.body)
  const userID = require('jsonwebtoken').decode(req.body.token)._id;
  console.log('userID: ' + userID);
  const img = {
    data: fs.readFileSync(req.file.path),
    contentType: 'image/jpeg'
  }
  User.findOneAndUpdate({_id: userID}, {$set:{image: img}}, (err, doc) => {
    if(!err) res.status(200).send({success: true});
    else res.sendStatus(500);
  })
});
function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

router.get('/getImage/:_id', (req,res,next) => {
  User.findOne({_id: req.params._id}, (err, user) => {
    if(!err) res.send(user.image)
    else res.status(500).send({success: false})
  })  
})
// router.post("/uploadPhoto", (req, res, next) => {
//   // upload(req, res, err => {
//   //   console.log(req);
//   //   console.log("Request ---", req.body);
//   //   console.log("Request file ---", req.file); //Here you get file.
//   //   /*Now do where ever you want to do*/
//   //   if (!err) return res.send(200).end();
//   // });
//   console.log('uploading..')
//   upload2.single("file"),
//   (req1, res1, next1) => {
//     console.log(req1.file)
//     const tempPath = req.file.path;
//     const targetPath = path.join(__dirname, "./uploads/image.png");

//     if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//       fs.rename(tempPath, targetPath, err => {
//         if (err) return handleError(err, res);

//         res
//           .status(200)
//           .contentType("text/plain")
//           .end("File uploaded!");
//       });
//     } else {
//       fs.unlink(tempPath, err => {
//         if (err) return handleError(err, res);

//         res
//           .status(403)
//           .contentType("text/plain")
//           .end("Only .png files are allowed!");
//       });
//     }
//   }
// ;

// });

module.exports = router;
