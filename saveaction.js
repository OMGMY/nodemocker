/**
 * 该模块主要是负责对保存的文件进行存储
 * @author Cloud
 */
var sSUtils = require('./StringUtils')
var sFileUtils = require('./FsUitls')
var sConfig = require('./config');
var sFile = require('fs');

exports.save = function (type,url,tag,req,res) {

    var path = null;
    if (url != null && url != "" && url != 'waiting for url...') {
        var urlData = sSUtils.parseUrl(url)
        path = urlData[1]
        console.log(req.body.urlresult);
        sFileUtils.writeOldJson(path, req, res);
    }
    else {
        var date = new Date();
        switch (type) { // 下一步用工厂模式，面向对象进行优化，更符合开闭原则
            case 'card':
                path = sConfig.root + sConfig.cardpath + "\\" + tag + "\\" +type+ date.getDay();
                break
            case 'feed':
                path = sConfig.root + sConfig.feedpath + "\\" + tag + "\\" +type+ date.getDay();
                break
            case 'other':
                path = sConfig.root + sConfig.otherpath + "\\" + tag + "\\" +type+ date.getDay();
                break
            default:
                break
        }
        if (!sFile.existsSync(path)) {
            sFileUtils.createDirsSync(path, '\\', 0777, null);
            sFileUtils.writeJson(date, path, req, res);
        } else {
            sFileUtils.writeJson(date, path, req, res);
        }
    }

}