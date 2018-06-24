/**
 * 该模块主要是文件上传的封负责返回数据，从文件异步读取
 * @author Cloud
 */
	var fs = require('fs');
	var event = require('events');
	var eventEmitter = new event.EventEmitter();
	var timer = require('node-schedule');
	var rule = new timer.RecurrenceRule();
    rule.second =[0,10,20,30,40,50];
    var cardFile = "welcome.txt";
    var otherFile = "welcome.txt";
    var file = "welcome.txt";
    var i = 1;
    timer.scheduleJob(rule,function () {

    	if (i == 3){
    		i = 0;
		}
		i++;
		cardFile = './cards/card' +i+'.txt';
		otherFile = './other/other'+i+'.txt';
    });
	function Databack(){
		var dataType;
		this.dataType = function(dataType) {
			this.dataType = dataType;
		}
		this.getData = function(type,request,response) {
			var path = request.query.path;
			if (type == "card") {
				if(path != null && path !="") {
                    fs.readFile(path,'utf-8',function(err ,data) {
                        if (err)
                            return console.error(err);
                        console.log(data);
                        response.send(data);

                    })
				}
				else {
                    fs.readFile(cardFile,'utf-8',function(err ,data) {
                        if (err)
                            return console.error(err);
                        console.log(data);
                        response.send(data);

                    })
				}

			} 
			else if (type == 'other') {
				fs.readFile(otherFile,'utf-8',function(err ,data) {
				 if (err) 
				 	return console.error(err);
				    console.log(data);
				    response.send(data);

		   		 })
			}
		}
	}
	module.exports = Databack;