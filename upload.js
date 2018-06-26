/**
 * 该模块主要是文件上传的封装
 * @author Cloud
 */
        var fs = require('fs');
        var event = require('events');
        var multer = require('multer');
        var express = require('express');
        const UPLOAD_PATH = 'uploads'

        var storage = multer.diskStorage({
            //设置上传后文件路径，uploads文件夹会自动创建。
            destination: function (req, file, cb) {
                cb(null, './uploads')
            },
            //给上传文件重命名，获取添加后缀名
            filename: function (req, file, cb) {
                var fileFormat = (file.originalname).split(".");
                cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
            }
        });
        //添加配置文件到muler对象。
        var upload = multer({
            storage: storage
        });
        var upload = multer({storage: storage});
        //导出对象
        var eventEmitter = new event.EventEmitter();
        function Uploader() {
           this.uploadSingerFile = upload.single('avatar');
           this.path = UPLOAD_PATH;
        }
        module.exports = Uploader;
