//Handles the S3 connection
//Author: Shawn McMannis
//Last Mod Date: 7/30/2020

const bucketName = "decoarchiveimages";
const AWS = require('aws-sdk')

//AWS S3 datastore connection
var _s3;

//Create S3 connection
function connectS3(callback) {
    if(_s3) {
        console.log("Already connected to S3");
        return callback(null, _s3);
    }
    try{
        _s3 = new AWS.S3({
            params: { Bucket: bucketName }
        });
        console.log("Connected to " + bucketName);
        return callback(null, _s3);
    } catch (err) {
        console.log('Error encountered: ', err);
    }
}

//Return the S3 connection
function getS3() {
    if(_s3) {
        return _s3;
    }
    else {
        console.log("Not yet connected to S3");
    }
}

module.exports = {
    connectS3,
    getS3
};