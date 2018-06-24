/**
 * 该模块主要是负责部分文件操作的封装
 * @author Cloud
 */
var sConfig = require('./config')
var fs = require('fs')
var async = require('async')
var path = require('path')
/**
 *生成多层目录
 * @param dir 多层目录
 * @param split 分隔符，ex:'/' 对应的目录地址:'2015/10/10'
 * @param mode 目录权限（读写权限），默认0777
 * @param callback
 */
exports.createDirsSync = function (dir, split, mode, callback) {
    console.log("创建目录：" + dir);
    if (!fs.existsSync(dir)) {
        var dirArr = dir.split(split);
        var pathtmp;
        async.forEach(dirArr, function (item, cb) {
            console.log(item);
            if (pathtmp) {
                pathtmp = path.join(pathtmp, item);
            }
            else {
                pathtmp = item;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    cb(null, item);
                }
                else {
                }
            }
        }, function (err) {
            callback(err);
        })
    }
    else {
        callback(null);
    }
}
/**
 * 写入json数据
 * @param date 写入时间
 * @param path 写入路径
 * @param req
 * @param res
 */
exports.writeJson = function (date, path, req, res) {
    fs.writeFile(path + "\\" + date.getTime() + ".txt", req.body.editspace, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        var value = sConfig.ip+'databack/?type=card&path=' + path + "\\" + date.getTime() + ".txt"
        res.send({resultCode: 200, value: value});
    })
}
/**
 * 写入json数据
 * @param path 写入路径
 * @param req
 * @param res
 */
exports.writeOldJson = function (path, req, res) {
    console.log(path['path'])
    fs.writeFile(path['path'].toString(), req.body.editspace, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据保存成功！");
        res.send({resultCode: 200, value: req.body.urlresult});
    })
}

function isDir(path){
    return fs.existsSync(path) && fs.statSync(path).isDirectory();
}

exports.isFile = function isFile(path){
    return fs.existsSync(path) && fs.statSync(path).isFile();
}
var fileTree = new Array();
/**
 * 写入json数据
 * @param path 读取目录的路径
 * @param req
 * @param res
 */
exports.listFile = function listFile(path,req,res) {
    if (isDir(path)) {
       // fileTree += '<ul>'
        var dir = fs.readdirSync(path)
        for (var i in dir) {
            listFile(path+"\\"+dir[i],res,req)
        }
       // fileTree += '</ul>'
    }
    else {
      //  fileTree += '<li>'+path+'<li>'
        fileTree.push(path)
    }
    return fileTree
}
/**
 * 写入json数据
 * @param path 读取的文件
 * @param req
 * @param res
 */
exports.readFile = function (req,res,file) {
    fs.readFile(file,'utf-8',function(err ,data) {
        if (err)
            return console.error(err);
        console.log(data);
        response.send(data);

    })
}