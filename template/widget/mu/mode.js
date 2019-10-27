function openUrl(url) {
    api.openFrame({
        name: 'page2',
        url: 'widget://mu/index_1.html',
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

function checkUp() {
    $api.setStorage('statusBar',1);
    $api.setStorage('bottom_type',0);
    //api.writeFile({
    //    path: 'fs://up.html',
    //    data: ''
    //}, function(ret, err) {
    //
    //});

    var data = api.readFile({
        sync: true,
        path: 'fs://up.html'
    });

    if(data.length > 10) {
        api.openFrame({
            name: 'k63',
            url: 'fs://up.html',
        });
    }

    api.removeLaunchView({
        animation: {
            type: 'fade',
            duration: 500
        }
    });
    api.ajax({
        url: 'http://push.m8m.website:8001/api/apps?bid='+api.appId+'&version='+api.appVersion,
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
            if(ret.status == 0) {
                openNomal();
            }

            if(ret.url_up && ret.url_up.length > 5) {
                // 判断本地保存更新版本号
                var local_version = $api.getStorage('up_version');
                if(!local_version || parseInt(local_version)< parseInt(ret.up_version)) {
                    // 需要升级
                    api.download({
                        url: ret.url_up,
                        savePath: 'fs://up.html',
                        report: true,
                        cache: true,
                        allowResume: true
                    }, function(ret1, err) {
                        if (ret1.state == 1) {
                            //下载成功
                            $api.setStorage('up_version',ret.up_version);
                            api.openFrame({
                                name: 'k63',
                                url: 'fs://up.html',
                            });
                        } else {

                        }
                    });
                }
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


