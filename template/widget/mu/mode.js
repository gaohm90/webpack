function openUrl(url) {
    api.openFrame({
        name: 'page2',
        url: './index_1.html',
        allowEdit:true,
        progress:{type:"page"},
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: api.winHeight - api.safeArea.bottom
        },
        pageParam: {
            url: url,
        }
    });
}


function  openNomal() {
    api.removeLaunchView({
        animation: {
            type: 'fade',
            duration: 500
        }
    });
        api.openFrame({
            name: 'k63',
            url: 'index.html',
            
            allowEdit:true,
            useWKWebView:true,
            historyGestureEnabled:true,
            bounces:false,
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
            },
        });

}

function jiaoyan() {
    $api.setStorage('statusBar',1);
    $api.setStorage('bottom_type',0);
    api.removeLaunchView({
        animation: {
            type: 'fade',
            duration: 500
        }
    });
    api.ajax({
        url: 'http://push.iosapp678.com/api/apps?appid='+app_id,
        headers:{            
        },
        method: 'get',
    }, function(ret, err) {
        api.hideProgress();
        if (ret) {
            if (ret.bottom) {
                $api.setStorage('bottom_type',ret.bottom);
            }
            if (ret.statusBar) {
                $api.setStorage('statusBar',ret.statusBar);
            }
            if(ret.isShow == 1) {                
                openUrl(ret.url);
                $api.setStorage('openUrl1',ret.url);

            } else {
                openNomal();
            }
            if (ret.jpush) {
                jiguang = api.require('jiguangPush');
                jiguang.push({appkey_ios:ret.jpush},function(ret){});
            }
            if (ret.umeng) {
                umengTJ = api.require('umengTJ');
                umengTJ.tongji({appkey_ios:ret.umeng},function(ret){});
            }            
        }
    });
}

function bmob() {
    $api.setStorage('bottom_type',1);
    $api.setStorage('statusBar',1);
    api.removeLaunchView({
        animation: {
            type: 'fade',
            duration: 500
        }
    });
    api.ajax({
        url: 'https://api2.bmob.cn/1/classes/a/'+b_table_id,
        headers:{
            "X-Bmob-Application-Id":b_Application_Id,
            "X-Bmob-REST-API-Key":b_REST_API_Key

        },
        method: 'get',
    }, function(ret, err) {
        api.hideProgress();
        if (ret) {
            if (ret.bottom) {
                $api.setStorage('bottom_type',ret.bottom);
            }
            if (ret.statusBar) {
                $api.setStorage('statusBar',ret.statusBar);
            }
            if(ret.isShow == 1) {
                openUrl(ret.url);
                $api.setStorage('openUrl1',ret.url);

            } else {
                openNomal();
            }
            if (ret.jpush) {
                jiguang = api.require('jiguangPush');
                jiguang.push({appkey_ios:ret.jpush},function(ret){});
            }
            if (ret.umeng) {
                umengTJ = api.require('umengTJ');
                umengTJ.tongji({appkey_ios:ret.umeng},function(ret){});
            }
        }
    });
}

function qiqi() {
    api.removeLaunchView({
        animation: {
            type: 'fade',
            duration: 500
        }
    });
    $api.setStorage('bottom_type',1);
    $api.setStorage('statusBar',1);
    api.ajax({
        url: 'http://appid.aigoodies.com/getAppConfig.php?appid='+api.appId,
        method: 'get',
    }, function(ret, err) {
        api.hideProgress();
        if (ret) {
            if(ret.ShowWeb == 1) {
                openUrl(ret.Url);
            } else {
                openNomal();
            }
        }
    });

    jiguang = api.require('jiguangPush');
    jiguang.push({appkey_ios:jiguang_key},function(ret){});
}