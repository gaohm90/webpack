
export function openFrm(name,url,x,y,w,h,pageParam) {
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

export function addEvent(eventName,callback) {
    api.addEventListener({
        name: eventName
    }, function(ret){
        if(ret && ret.value){
            var value = ret.value;
            callback(value);
        }
    });
}

export function sendEvent(eventName,eventMsg) {
    api.sendEvent({
        name: eventName,
        extra: eventMsg
    });
}

export function openWin(name,url,param) {
    api.openWin({
        name: name,
        url: url,
        bounces: false,
        pageParam:param
    });
}


export function messgeShow(msg) {
    api.toast({
        msg: msg,
        duration: 2000,
        location: 'middle'
    });
}

export function hudShowProgress(text) {
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '',
        text: text,
        modal: false
    });
}

export function hudHideProgress() {
    api.hideProgress();
}

export function openNewUrl(url,title) {
    api.openWin({
        name: 'newWindows',
        url: 'widget://static/api/newWindows.html',
        pageParam: {
            url:url,
            name:title
        },
        showProgress: false
    });
}



