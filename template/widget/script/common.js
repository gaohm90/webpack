/**
 * Created by ghm on 18/1/7.
 */

var game_url = 'index.html';
var hengping = 2; // 1 - 横屏  非1 - 竖屏

function openGame() {

    if(hengping == 1) {
        api.setScreenOrientation({
            orientation: 'auto_landscape'
        });
    }else {
        api.setScreenOrientation({
            orientation: 'portrait_up'
        });
    }

    openFrm('game','widget://html/'+game_url,0,0,'auto','auto',{});

}

function openFrm(name,url,x,y,w,h,pageParam) {
    api.openFrame({
        name: name,
        url: url,
        rect: {
            x: x,
            y: y,
            w: w,
            h: h
        },
        pageParam: pageParam,
        reload:true,
        scaleEnabled:true,
        progress:{type:"page",title:'正在加载'},
        bounces: false,
        bgColor: 'rgba(0,0,0,0)',
        vScrollBarEnabled: false,
        hScrollBarEnabled: false
    });
}

function addEvent(eventName,callback) {
    api.addEventListener({
        name: eventName
    }, function(ret){
        if(ret && ret.value){
            var value = ret.value;
            callback(value);
        }
    });
}

function sendEvent(eventName,eventMsg) {
    api.sendEvent({
        name: eventName,
        extra: eventMsg
    });
}




function getNeedUrl(info,callback) {
    axios.get(info.ic_url,{
            headers: {
                'X-LC-Id': info.lc_id,
                'X-LC-Key' : info.lc_key,
            },
        })
        .then(function (response) {
            var ret = response.data.results[0];
            callback(ret);

})
.catch(function (error) {
    callback({});
});
}


