/**
 * 加载图片，将图片拼成html代码
 * @param SJ_CODE 事件编号
 */
function loadPicFormDB(data) {
    var pichtml = "";
    for (var i = 0; i < data.length; i++) {
        var src = data[i];

        var html1 = `<li class="file"><a href="javascript:;">${src}</a></li>`;
        pichtml += html1;
    };
    return pichtml;
}