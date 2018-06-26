/**
 * 该模块主要是负责对字符串进行处理
 * @author Cloud
 */
var fs = require('fs');

exports.parseUrl = function parseUrl(url) {
    var result = [];
    var query = url.split("?")[1];
    var queryArr = query.split("&");
    queryArr.forEach(function (item) {
        var obj = {};
        var value = item.split("=")[1];
        var key = item.split("=")[0];
        obj[key] = value;
        result.push(obj);
    });
    return result;
}