require('dotenv').config();
const path = require('path');
const AWS = require('aws-sdk');
const router = require('express').Router();
const uuid = require('uuid/v1');
const passport = require("passport");
const jwtAuth = passport.authenticate("jwt", { session: false });

const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsBucketName = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
    signatureVersion: 'v4',   
    region: 'eu-west-2',
})

//image key secure stracture : userID / <random character string>.<file extention> 

router.get('/:userID', (req,res,next) => {

    const key = `${req.params.userID}/${uuid()}.jpeg`

    s3.getSignedUrl('putObject', {
        Bucket: 'book-market-bucket',
        ContentType: 'image/jpeg',
        Key: key
    }, (err, url) => {
        console.log('URL: ' + url)
        res.send({
            key, url
        })
    })
} )

module.exports = router;