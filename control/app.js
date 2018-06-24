    /**
     * 该文件主要是控制页面转发，相当于路由器,该文件代码应该进一步拆分
     * @type {*|createApplication}
     * @author Cloud
     */
        // 引入依赖
    var express = require('express');
    var path = require("path")
    var databack = require('../databack');
    var sUploader = require('../upload');
    var sConfig = require('../config');
    var sFile = require('fs');
    var sFileUtils = require('../FsUitls')
    var sSaveUtils = require('../saveaction')
    var bodyParser = require('body-parser');
    var l = sFileUtils.listFile(sConfig.root+"cards")

    // 建立 express 实例
    var app = express();
    app.use(express.static('./static'));
    app.use('/css', express.static(path.join(__dirname, '../css')));
    app.use('/js', express.static(path.join(__dirname, '../js')));
    app.set("views", "../views");
    app.engine('html', require('ejs').renderFile);
    // body parser

    app.use(bodyParser.json());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

    // 初始界面
    app.get('/', function (req, res) {
        res.render("welcome.html", {value: 20})
    });
    // app.get('/page', function (req, res) {
    //     res.render("card_file_json_page.html")
    // });


    app.get('/searchcardfile', function (req, res) {
        var l = sFileUtils.listFile(sConfig.root+"cards")
        res.send({resultCode: 200, value: l})
    });

    var user;

    // 根据数据类型重定向到对应页面
    app.post('/page', function (req, res) {
        user = req.body.tag;
        switch (req.body.text) {
            case 'Card Data':
                res.render('card_file_json_page.html',{tag:user})
                break
            case 'Feed Data':
                res.render('feed_file_json_page.html',{tag:user})
                break
            case 'Other Data':
                res.render('other_file_json_page.html',{tag:user})
                break
            default:
                break;
        }
    });

app.get('/displayfile', function (req, res) {
    var fileName = req.query.name
    res.send(sFile.readFileSync(fileName))
    // res.body = sFile.readFileSync('../cards/card6/1520059435801.txt');
    // res.sendFile('card6/1520059435801.txt',{root:__dirname + '/../cards'});
});


    app.get('/input', function (req, res) {
        sFile.readFile('/input.html', 'utf-8', function (err, data) {
            if (err) {
                console.log('read file error');
            }
            else {
                res.send(data);
            }
        })
    });


    // 保存编辑后的内容,新建文件
    app.post('/commit', function (req, res) {
        console.log(req.body.editspace);
        var date = new Date();//card
        user = req.body.user;
        var path = sConfig.root + sConfig.cardpath + "\\" + user + "\\card" + date.getDay();
        if (!sFile.existsSync(path)) {
            sFileUtils.createDirsSync(path, '\\', 0777, null);
            sFileUtils.writeJson(date, path, req, res);
        }
        else {
            sFileUtils.writeJson(date, path, req, res);
        }

    });

    // 保存编辑后的内容，并不新建文件 这地方其实应该在html加一个标记，这样才可以更好复用
    app.post('/save', function (req, res) {
        var url = req.body.urlresult
        user = req.body.user;
        sSaveUtils.save('card',url,user,req,res)
    });
    // 根据数据类型，获取文件中的数据
    app.get('/databack', function (req, res) {
        // 从 req.query 中取出我们的 q 参数。
        // 如果是 post 传来的 body 数据，则是在 req.body 里面，不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，这个后面会讲到。
        var dataType = req.query.type;
        var author = req.query.name;
        if (dataType == "card") {
            new databack().getData('card', req, res);
        }
        if (dataType == 'other') {
            new databack().getData('other', req, res);
        }
    });
    // 上传单个文件
    app.post('/upload', new sUploader().uploadSingerFile, function (req, res) {
        res.send({resultCode: 200, value: "abcdefg"})
    })
    // use(express.static('./static')).使用静态页面
    app.listen(sConfig.port, function (req, res) {
        console.log('app is running at port 3000');
    });