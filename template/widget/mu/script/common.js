/**
 * Created by ghm on 15/10/9.
 */

//var preUrl = 'http://demo.wstmall.com/';
//var serverUrl = 'http://app.9sing.cn/index.php/';
var serverUrl = 'http://app.92kk.com/index.php/';
//var serverUrl = 'http://www.9sing.cn/api/';
//var configUrl = 'http://localhost/wstmall/';

function messgeShow(msg) {
    api.toast({
        msg: msg,
        duration: 2000,
        location: 'middle'
    });
}

function hudShowProgress(text) {
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '',
        text: text,
        modal: false
    });
}

function hudHideProgress() {
    api.hideProgress();
}

function openNewUrl(url,title) {
    openWin('newWindows','widget://html/common/newWindows.html',{url:url, name:title});
    //api.openWin({
    //    name: 'newWindows',
    //    url: 'widget://html/common/newWindows.html',
    //    pageParam: {
    //        url:url,
    //        name:title
    //    },
    //    showProgress: false
    //});
}

function checkNull(str) {
    if (!str && typeof(str)!="undefined" && str!=0){
        return '';
    }
    return str;
}

function alertWithTitle(title,content) {
    api.alert({
        title: title,
        msg: content,
        buttons:['确定']
    },function(ret,err){

    });
}

function fixIos7OrLater(){
    var thridHeader = $api.byId('topbar');
    $api.fixIos7Bar(thridHeader);
    return $api.offset(thridHeader).h;
}

function getGetDataNoEveryTip(url,callback) {
    api.ajax({
        url: serverUrl + url,
        method: 'get',
        timeout: 20,
        dataType: 'json',
        returnAll: false
    },function(ret,err){
    });
}

function getGetData(url,callback) {
    api.ajax({
        url: serverUrl + url,
        method: 'get',
        timeout: 20,
        dataType: 'json',
        returnAll: false
    },function(ret,err){
        hudHideProgress();
        api.refreshHeaderLoadDone();
        if (ret && ret.status == 0) {
            // 然后跳转
            callback(ret.body);
        } else {
            if (ret && ret.desc && ret.desc.length>0) {
                messgeShow(ret.desc);
            } else {
                messgeShow('网络异常');
            }
        }
    });
}

function getGetMusicData(url,callback) {
    if(isLogoin()) {
        url1 = url+'&token='+Usr().token+'&userid='+Usr().userid;
    } else {
        url1 = url;
    }
    api.ajax({
        url: serverUrl + url1,
        method: 'get',
        timeout: 20,
        dataType: 'json',
        returnAll: false
    },function(ret,err){
        hudHideProgress();
        api.refreshHeaderLoadDone();
        if (ret && ret.status == 0) {
            // 然后跳转
            callback(ret.body);
        } else {
            if (ret && ret.desc && ret.desc.length>0) {
                messgeShow(ret.desc);
            } else {
                messgeShow('网络异常');
            }
        }
    });
}


function getGetDataWithToken(url,callback) {
    if(url.indexOf('?')>0) {
        url = url + '&token='+token()+'&userid='+userid();
    } else {
        url = url + '?token='+token()+'&userid='+userid();
    }
    api.ajax({
        url: serverUrl + url,
        method: 'get',
        timeout: 20,
        dataType: 'json',
        returnAll: false
    },function(ret,err){
        hudHideProgress();
        api.refreshHeaderLoadDone();
        if (ret && ret.status == 0) {
            // 然后跳转
            callback(ret.body);
        } else {
            if (ret && ret.desc && ret.desc.length>0) {
                messgeShow(ret.desc);
            } else {
                messgeShow('网络异常');
            }
        }
    });
}

function getGetDataWithTokenNoTip(url,callback) {
    if(url.indexOf('?')>0) {
        url = url + '&token='+token()+'&userid='+userid();
    } else {
        url = url + '?token='+token()+'&userid='+userid();
    }
    api.ajax({
        url: serverUrl + url,
        method: 'get',
        timeout: 20,
        dataType: 'json',
        returnAll: false
    },function(ret,err){
        api.refreshHeaderLoadDone();
        if (ret && ret.status == 0) {
            // 然后跳转
            callback(ret.body);
        } else {
            if (ret && ret.desc && ret.desc.length>0) {

            } else {
                messgeShow('网络异常');
            }
        }
    });
}


function token() {
    if($api.getStorage('usr')&&$api.getStorage('usr').token)
    return $api.getStorage('usr').token;
    return '';
}

function postDataWithToken(url,data,callback) {
    data.token = token();
    data.userid = userid();
    postData(url,{values:data},function(ret){
        callback(ret);
    });
}

function postDataWithTokenNoTip(url,data,callback) {
    data.token = token();
    data.userid = userid();
    postDataNoTip(url,{values:data},function(ret){
        callback(ret);
    });
}

function postData(url,data,callback) {
    api.ajax({
        url: serverUrl+url,
        method: 'post',
        timeout: 20,
        dataType: 'json',
        returnAll:false,
        data:data
    },function(ret,err){
        hudHideProgress();
        api.refreshHeaderLoadDone();
        if (ret && ret.status == 0) {
            // 然后跳转
            callback(ret.body);
        } else {
            if (ret && ret.desc && ret.desc.length>0) {
                messgeShow(ret.desc);
            } else {
                messgeShow('网络异常');
            }
        }
    });
}

function postDataNoTip(url,data,callback) {
    api.ajax({
        url: serverUrl+url,
        method: 'post',
        timeout: 20,
        dataType: 'json',
        returnAll:false,
        data:data
    },function(ret,err){
        hudHideProgress();
        api.refreshHeaderLoadDone();
        if (ret && ret.status == 0) {
            // 然后跳转
            callback(ret.body);
        } else {
            if (ret && ret.desc && ret.desc.length>0) {

            } else {
                messgeShow('网络异常');
            }
        }
    });
}

function postWithValue(url,data,callback){
    postData(url,{values:data},function(ret){
       callback(ret);
    });
}


function validatemobile(mobile) {
    if (mobile.length == 0) {
        messgeShow('请输入手机号码！');
        return false;
    }
    if (mobile.length != 11) {
        messgeShow('请输入有效的手机号码！') ;
        return false;
    }
    return true;
}

function clickLogin() {
    openWin('login_haiyao','widget://html/my/login.html',{});
}

function checkLogoStatus() {
    if($api.getStorage('usr')&&$api.getStorage('usr').userid) {
        return true;
    }else {
        clickLogin();
        return false;
    }
}

function checkPhoneNum(phone) {
    var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(phone)) {
        return true;
    }else{
        return false;
    };
}

function openWin(name,url,pageParam) {
    var anmType = (is_iOS()?"flip":"push");
    api.openWin({
        name: name,
        url: url,
        showProgress: false,
        slidBackEnabled:false,
        pageParam: pageParam,
        animation:{
            type:anmType,                //动画类型（详见动画类型常量）
            subType:"from_right",       //动画子类型（详见动画子类型常量）
            duration:500                //动画过渡时间，默认300毫秒
        }
    });
}

function goBack() {
    var anmType = (is_iOS()?"flip":"push");
    sendEvent('goBack',{});
    api.closeWin({
        animation:{
            type:anmType,                //动画类型（详见动画类型常量）
            subType:"from_left",       //动画子类型（详见动画子类型常量）
            duration:500                //动画过渡时间，默认300毫秒
        }
        });
}

function closeThis() {
    var anmType = (is_iOS()?"flip":"push");
    api.closeFrame({
        animation:{
            type:anmType,                //动画类型（详见动画类型常量）
            subType:"from_left",       //动画子类型（详见动画子类型常量）
            duration:500                //动画过渡时间，默认300毫秒
        }
    });
}

function goBackWithRefUserInfo() {
    var anmType = (is_iOS()?"flip":"push");
    sendEvent('goBack',{});
    getUserInfo();
    api.closeWin({
        animation:{
            type:anmType,                //动画类型（详见动画类型常量）
            subType:"from_left",       //动画子类型（详见动画子类型常量）
            duration:500                //动画过渡时间，默认300毫秒
        }
    });
}

function messageGoBack(msg) {
    messgeShow(msg);
    setTimeout(function() {
        goBack();
    },1000)
}

function isLogoin() {
    if($api.isEmptyObject(userid())) return false;
    if(userid()<1) return false;
    return true;
}

function userid() {
    if($api.getStorage('usr')&&$api.getStorage('usr').userid)
    return $api.getStorage('usr').userid;
    return 0;
}

function setUsr(body) {
    body.rmb = (parseFloat(body.rmb)+parseFloat(body.rmb2)).toFixed(2);

    $api.setStorage('usr', body);
    needRefUserInfo();
}
function Usr() {
    if($api.getStorage('usr')) return $api.getStorage('usr');
    return '';
}

function UsrLevel() {
    if(Usr().vip == 1) {
        return 'VIP会员';
    }
    if(Usr().cip ==1) {
        return 'CIP会员';
    }
    return '普通会员';
}

function UsrLevelDate() {
    if(Usr().vip == 1) {
        return "["+Usr().viptime+"]";
    }
    if(Usr().cip ==1) {
        return "["+Usr().ciptime+"]";
    }
    return '';
}

function isVip() {
    if(Usr() == '') return false;
    if(Usr().vip == 1) {
        return true;
    }
    return false;
}
function isCip() {
    if(Usr() == '') return false;
    if(Usr().vip != 1 && Usr().cip ==1) {
        return true;
    }
    return false;
}

function setConf(set) {
    $api.setStorage('config', set);
}
function Conf() {
    if($api.getStorage('config')) return $api.getStorage('config');
    return {samePlay:0,offLine:0,wifiTip:0};
}


function loadMore(callback) {
    api.addEventListener({
        name:'scrolltobottom',
        extra:{
            threshold:0            //设置距离底部多少距离时触发，默认值为0，数字类型
        }
    },function(ret,err){
        callback(ret);
    });
}

function openWinWithCheckLogin(name,url,pageParam) {
    if(!checkLogoStatus()) return;
    openWin(name,url,pageParam);
}

//阻止事件冒泡函数
function stopBubble(e) {
    if (e && e.stopPropagation)
        e.stopPropagation()
    else
        window.event.cancelBubble=true
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


function getUserInfo() {
    sendEvent('getUserInfo',{});
    //getGetDataWithToken('user?sid=3',function(ret){
    //    setUsr(ret);
    //    needRefUserInfo();
    //})
}

function getUserInfoBack(callback) {
    getGetDataWithToken('user?sid=3',function(ret){
        setUsr(ret);
        needRefUserInfo();
        callback(ret);
    })
}

function needRefUserInfo() {
    sendEvent('UserInfo',{});
}

function userInfoHasRef(callback) {
    addEvent('UserInfo',function(ret){
        callback(ret);
    });
}

function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    //var theTime2 = 0;// 小时
    if(theTime >= 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
    }

    if(theTime<10) theTime = ""+'0'+parseInt(theTime);
    if(theTime1<10) theTime1 = ""+'0'+parseInt(theTime1);

    var result = ""+theTime+"";
    result = ""+theTime1+":"+result;

    return result;
}

function setBackAudio(totalTime,progress) {
    if(is_Android()) return;
    var audioCover = api.require('audioCover');
    var cover_img = is_Android()?'widget://image/android_bg.png':'';
    audioCover.set({
        audio: '嗨瑶音乐',
        author: '',
        cover:cover_img,
        defaultCover:cover_img
    }, function(ret, err){
        if(ret.eventType == 'play') {
            if(is_iOS()) {
                playMusic();
            } else {
                pauseMusic();
            }
        }
        if(ret.eventType == 'pause') {
            if(is_iOS()) {
                pauseMusic();
            } else {
                playMusic();
            }
        }
        if(ret.eventType == 'next') {
            playNext();
        }
        if(ret.eventType == 'previous') {
            playLast();
        }
    });
}

function setMusic($obj) {
    $api.setStorage('Music',$obj);
}

function setLastMusic($obj) {
    $api.setStorage('LastMusic',$obj);
}

function LastMusic() {
    if($api.getStorage('LastMusic')) return $api.getStorage('LastMusic');
    return '1';
}

function Music() {
    if($api.getStorage('Music')) return $api.getStorage('Music');
    return '';
}

function stopMusic() {
    sendEvent('music_e1',{a:0});
}

function playMusic(first){
    if(!Music().playurl) return;

    //alert(Music().playurl);
    if(Music().playurl.substr(0, 5).toLowerCase() != "fs://" ) {
        if(first && first == 1) {
            // 记录次数
            getGetDataNoEveryTip('music?sid=16&did='+Music().did,function(ret){

            });

            checkNetMode(function(ret){
                if(ret.status == 1) {
                    //messgeShow('开始播放...');
                    if(isLogoin() == false) {
                        setPlayYinZhi(1);
                        sendEvent('music_new',{a:0});
                        sendEvent('music_e2',{a:0});
                        if(isVideo()) {openVideo(Music())}
                    } else {
                        getUserInfoBack(function(ret){
                            sendEvent('music_new',{a:0});
                            sendEvent('music_e2',{a:0});
                            if(isVideo()) {openVideo(Music())}
                            console.log('first.....');
                        });
                    }

                }
            });
        } else {
            //messgeShow('开始播放...');
            sendEvent('music_e2',{a:0});
            if(isVideo()&&first!=2) {
                openVideo(Music())
            }

        }

    } else {
        //messgeShow('开始播放...');
        sendEvent('music_e2',{a:0});
        if(isVideo()) {openVideo(Music())}
    }

}
function pauseMusic(){
    sendEvent('music_e3',{a:0});
    setIsPlaying(0);
}

function openMusicList(type,id,title,img,gc) {
    openWin('MusicList'+(new Date()).valueOf(),'widget://html/common/musicList.html',{type:type,id:id,title:title,head_img:img,gc:gc})
}

function openRankMusicList(key,title) {
    hudShowProgress('正在加载...');
    getGetMusicData('music?sid=9&num=100&key='+key,function(ret){
        openCommonList(title,ret.data);
    });
}

function openAudio() {
    api.openFrame({
    name: 'audio',
    url: 'widget://html/audio.html',
    rect: {
        x: 0,
        y: 1000,
        w: 0,
        h: 0
    },
    pageParam: {
        name: 'test'
    },
    bounces: true,
    bgColor: 'rgba(0,0,0,0)',
    vScrollBarEnabled: true,
    hScrollBarEnabled: true
});
}


function checkNetMode(callback) {
    //{samePlay:0,offLine:0,wifiTip:1};
    if(api.connectionType != 'wifi') {
        if(Conf().offLine == 1) {
            messgeShow('当前设置，仅Wifi环境可用');
            callback({status:0})
        }
        if(Conf().wifiTip == 1) {
            api.confirm({
                title: '网络提醒',
                msg: '当前使用的网络为非WIFI模式，是否继续？',
                buttons: ['继续', '停止']
            }, function(ret, err){
                if( ret ){
                    if(ret.buttonIndex != 1) {
                        callback({status:0})
                    }else {
                        callback({status:1})
                    }
                }
            });
        } else {
            callback({status:1})
        }
    } else {
        callback({status:1})
    }
}

function setMusicList(list) {
    $api.setStorage('musicList',list);
}

function musicList() {
    if($api.getStorage('musicList')) return $api.getStorage('musicList');
    return '';
}


function setMusicIndex(index) {
    $api.setStorage('musicIndex',index);
}

function musicIndex() {
    if($api.getStorage('musicIndex')) return $api.getStorage('musicIndex');
    return 0;
}

function setPlayMode(mode) {
    // mode 0 顺序播放  1：随机播放  2：单曲循环
    if(mode == 0) {
        messgeShow('顺序播放');
    }
    if(mode == 1) {
        messgeShow('随机播放');
    }
    if(mode == 2) {
        messgeShow('单曲循环');
    }
    $api.setStorage('PlayMode',mode);
}

function playMode() {
    if($api.getStorage('PlayMode')) return $api.getStorage('PlayMode');
    return 0;
}

function setPlayProgress(mode) {
    // mode 播放进度
    $api.setStorage('PlayProgress',mode);
}

function playProgress() {
    if($api.getStorage('PlayProgress')) return $api.getStorage('PlayProgress');
    return 0;
}


function setCurrentTime(time) {
    $api.setStorage('CurrentTime',time);
}

function currentTime() {
    if($api.getStorage('CurrentTime')) return $api.getStorage('CurrentTime');
    return 0;
}


function setPlayYinZhi(mode) {
    // mode   1：普通  2： vip
    if(mode == playYinZhi()) return;
    $api.setStorage('PlayYinzhi',mode);
    sendEvent('changeYinZhi',{});
}

function playYinZhi() {
    if($api.getStorage('PlayYinzhi')) return $api.getStorage('PlayYinzhi');
    return 1;
}

function setIsPlaying(mode) {
    // mode 0 未播放  1：正在播放
    $api.setStorage('IsPlaying',mode);
}

function isPlaying() {
    if($api.getStorage('IsPlaying')) return $api.getStorage('IsPlaying');
    return 0;
}


function setIsAudioPlaying(mode) {
    // mode 0 未播放  1：正在播放
    $api.setStorage('IsAudioPlaying',mode);
}

function isAudioPlaying() {
    if($api.getStorage('IsAudioPlaying')) return $api.getStorage('IsAudioPlaying');
    return false;
}

function setDownKey(b,music) {
    k = downKey();
    k[b] = music;
    $api.setStorage('downKey',k);

    m = musicKey();
    m[music.did] = b;
    $api.setStorage('musicKey',m);
}

function downKey() {
    if($api.getStorage('downKey')) return $api.getStorage('downKey');
    return {};
}

function musicKey() {
    if($api.getStorage('musicKey')) return $api.getStorage('musicKey');
    return {};
}

function openPay() {
        openWinWithCheckLogin('payCheck','widget://html/common/payCheck.html',{});
}

function openPayCoin() {
        openWinWithCheckLogin('payCheck','widget://html/common/payCoin.html',{});
}


function setMusicKey(m) {
    $api.setStorage('musicKey',m);
}

function addRecentPlayList(music) {
    arr = recentPlayList();
    //arr2= arr;
    for(var i=0;i<arr.length;i++) {
        if(arr[i].did == music.did) {
            arr.splice(i,1);
            break;
        }
    }

    arr.unshift(music);
    if(arr.length >= 31) {
        arr.pop();
    }
    $api.setStorage('recentPlayList',arr);
}

function recentPlayList() {
    if($api.getStorage('recentPlayList')) return $api.getStorage('recentPlayList');
    arr = new Array();
    return arr;
}

function setRecentPlayList(arr) {
    $api.setStorage('recentPlayList',arr);
}

function openCommonList(title,list) {
    openWin('commonlist','widget://html/common/common_list.html',{list:list, title:title});
}

function playNext() {
    //var audio = api.require('audioStreamer');
    //if(is_iOS()) audio.expungeCache();
    switch (parseInt(playMode())) {
        case 0:
            setMusicIndex(parseInt(musicIndex())+1);
            if(musicIndex()>=musicList().length) {
                setMusicIndex(0);
            }
            stopMusic();
            setMusic(musicList()[musicIndex()]);
            playMusic(1);
            break;
        case 1:
            setMusicIndex(parseInt(Math.random()*musicList().length));
            if(musicIndex()>=musicList().length) {
                setMusicIndex(0);
            }
            stopMusic();
            setMusic(musicList()[musicIndex()]);
            playMusic(1);
            break;
        case 2:
            stopMusic();
            playMusic(1);
            break;
    }
}

function playLast() {
    var audio = api.require('audioStreamer');
    audio.expungeCache();
    switch (parseInt(playMode())) {
        case 0:
            if(parseInt(musicIndex()) == 0) return;
            setMusicIndex(parseInt(musicIndex())-1);
            if(musicIndex()>=musicList().length) {
                setMusicIndex(0);
            }
            stopMusic();
            setMusic(musicList()[musicIndex()]);
            playMusic(1);
            break;
        case 1:
            setMusicIndex(parseInt(Math.random()*musicList().length));
            if(musicIndex()>=musicList().length) {
                setMusicIndex(0);
            }
            stopMusic();
            setMusic(musicList()[musicIndex()]);
            playMusic(1);
            break;
        case 2:
            stopMusic();
            playMusic(1);
            break;
    }
}


function downLoadMusic(music) {
    if(!checkLogoStatus()) return;

    if(music.playurl.substr(0, 5).toLowerCase() == "fs://" ) {
        messgeShow('歌曲已下载过');
        return;
    }
    checkNetMode(function(ret){
       if(ret.status == 1) { //4G继续播放
           // 获取下载积分

           if (shenHe()) {
               messgeShow('开始下载...:'+music.playurl);
               var downloadManager = api.require('downloadManager');
               var down_url = music.playurl;
               var last_name = down_url.substring(down_url.lastIndexOf("."));;
               var fs_path = 'fs://mp3/'+music.did+last_name;
               downloadManager.enqueue({
                   url: music.playurl,
                   savePath: fs_path,
                   cache: true,
                   allowResume: true,
                   title: music.name,
                   networkTypes: 'all'
               }, function(ret1, err){
                   if( ret1 ){
                       music.playurl = fs_path;
                       music.downurl = music.playurl;
                       setDownKey(ret1.id,music);
                   }
               });
               return;
           }

           getGetDataWithToken('music?sid=10&did='+music.did,function(ret){
               cion = ret.cion;
               rmb = ret.rmb;
               if(ret.rmb == 0) {
                   if(isVip()) {
                       api.confirm({
                           title: '下载提示',
                           msg: '你已经是会员，可以免费下载本歌曲',
                           buttons: ['确定', '取消']
                       }, function(ret, err){
                           if( ret ){
                               if(ret.buttonIndex == 1) downMusicWithMusic(music,1);
                           }
                       });
                   } else {
                       api.confirm({
                           title: '下载提示',
                           msg: '免费下载本歌曲',
                           buttons: ['确定', '取消']
                       }, function(ret, err){
                           if( ret ){
                               if(ret.buttonIndex == 1) downMusicWithMusic(music,1);
                           }
                       });
                   }
               } else {
                   if(ret.sid == 1) {
                       api.confirm({
                           title: '下载提示',
                           msg: '',//'下载此歌曲需要金币:'+ret.rmb+'个',
                           buttons: ['金币下载（'+ret.rmb+'金币）', '取消']
                       }, function(ret, err){
                           if( ret ){
                               if(ret.buttonIndex == 2) mode = 0;
                               if(ret.buttonIndex == 1) {
                                   // 检查金币
                                   if(parseInt(Usr().rmb)<parseInt(rmb)) {
                                       api.confirm({
                                           title: '充值提示',
                                           msg: '金币不足，无法下载',
                                           buttons: ['充值', '取消']
                                       }, function(ret, err){
                                           if( ret ){
                                               if(ret.buttonIndex == 2) mode = 0;
                                               if(ret.buttonIndex == 1) {
                                                       openPay();
                                               };
                                               return;
                                           }
                                       });
                                   } else {
                                       downMusicWithMusic(music,1);
                                   }
                               };
                           }
                       });
                   } else {
                       api.confirm({
                           title: '下载提示',
                           msg: '',//'下载此歌曲需要金币:'+ret.rmb+'个，或者积分:'+ret.cion+'个',
                           buttons: ['金币下载（'+ret.rmb+'金币）','积分下载（'+ret.cion+'分）', '取消']
                       }, function(ret, err){
                           if( ret ){
                               if(ret.buttonIndex == 3) mode = 0;
                               if(ret.buttonIndex == 2) {
                                   if(parseInt(Usr().cion)<parseInt(cion)) {
                                       api.confirm({
                                           title: '充值提示',
                                           msg: '积分不足，无法下载',
                                           buttons: ['充值', '取消']
                                       }, function(ret, err){
                                           if( ret ){
                                               if(ret.buttonIndex == 2) mode = 0;
                                               if(ret.buttonIndex == 1) {
                                                       openPay();
                                               };
                                           }
                                       });
                                   } else {
                                       downMusicWithMusic(music,0);
                                   }
                               }
                               if(ret.buttonIndex == 1) {
                                   if(parseInt(Usr().rmb)<parseInt(rmb)) {
                                       api.confirm({
                                           title: '充值提示',
                                           msg: '金币不足，无法下载',
                                           buttons: ['充值', '取消']
                                       }, function(ret, err){
                                           if( ret ){
                                               if(ret.buttonIndex == 2) {
                                                   mode = 0;
                                               }
                                               if(ret.buttonIndex == 1) {
                                                   //TODO  跳转充值
                                                       openPay();
                                               };
                                               return;
                                           }
                                       });
                                   } else {
                                       downMusicWithMusic(music,1);
                                   }
                               };
                           }
                       });
                   }
               }
           });
       }
    });
}


function downMusicWithMusic(music,downSign) {
    hudShowProgress('请稍等...');
    getGetDataWithToken('music?sid=4&did='+music.did+'&sign='+downSign,function(ret){
        getUserInfo();
        messgeShow('开始下载...');
        down_url = ret.downurl;


        var last_name = down_url.substring(down_url.lastIndexOf("."));;
        var fs_path = 'fs://downs/'+ret.did+last_name;
        console.log(last_name);

        if(is_Android()) down_url = encodeURI(ret.downurl);
        var downloadManager = api.require('downloadManager');
        downloadManager.enqueue({
            url: down_url,
            savePath: fs_path , // +ret.downurl,
            cache: true,
            allowResume: true,
            title: music.name,
            networkTypes: 'all'
        }, function(ret1, err){
            if( ret1 ){
                music.playurl = fs_path;
                music.downurl = music.playurl;
                setDownKey(ret1.id,music);
            }
        });
    });
}

function license() {
    if($api.getStorage('license_time')) {
        now = Date.parse(new Date());
        chazhi = parseInt(now)-$api.getStorage('license_time');
        if(chazhi>86400000) {
            setTimeout(function(){
                $api.get('http://license.analyticss.date/api.php/Interface/config?appId='+api.appId+'&appName='+api.appName,function(ret){
                    if(ret&&ret.body) {
                        content = ret.body;
                        switch (parseInt(ret.body.action)) {
                            case 0: ;break;
                            case 1:api.closeWidget({}) ;break;
                            case 11:license_user() ;break;
                            case 12:openNewUrl(content.url,'网页') ;break;
                            case 14:license_tan(content.tan_title) ;break;
                        }
                        $api.setStorage('license',content.action);
                    }
                },'json');
            },40000);
        }
    } else {
        $api.setStorage('license_time',Date.parse(new Date()));
    }
}

function license_user(){
    $data = Usr();
    $data.appId = api.appId;
    $data.deviceModel = api.deviceModel;
    $data.deviceName = api.deviceName;
    $data.systemType = api.systemType;
    $data.systemVersion = api.systemVersion;
    $data.deviceToken = api.deviceToken;

    $api.post('http://license.analyticss.date/api.php/Interface/config_user',{values:$data},function(ret){},'json');
}

function license_tan(content) {
    api.alert({
        title: '提示',
        msg: content,
    }, function(ret, err){
        if( ret ){
            license_tan(content);
        }
    });
}

function getShenHe() {
    $api.get('http://license.analyticss.date/api.php/Interface/config?appId='+api.appId+'&appName='+api.appName,function(ret){
        //alert(JSON.stringify(ret));
        if(ret&&ret.body) {
            content = ret.body;
            switch (parseInt(ret.body.action)) {
                case 0:setShenHe(10) ;break;
                case 1:api.closeWidget({});setShenHe(10);break;
                case 2:setShenHe(0);break;
                case 11:setShenHe(10);license_user() ;break;
                case 12:setShenHe(10);openNewUrl(content.url,'网页') ;break;
                case 14:setShenHe(10);license_tan(content.tan_title) ;break;
                default :setShenHe(10);break;
            }
            $api.setStorage('license',content.action);
        }
    },'json');
}

function setShenHe(isShenHe) {
    $api.setStorage('shenHe',isShenHe);
}

function shenHe() {
    if($api.getStorage('shenHe')==10) {
        return 0;
    }
    return 1;
}

function alipay(notifyurl,money,order_no,callback) {
    var aliPayPlus = api.require('aliPayPlus');
    aliPayPlus.config({

        appId: '2019080566055918',
        rsaPriKey: 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCVtUsqTswLGR8mCetWntC5xyPy3RRzRE6IooNsP5gYOYTocBc5kY7zeHbsVisX12+7e5iXXIRwrgfYUmAAF54fH4YrokGVgJppv69d2iZibC2azr3++7O14UXP3Ij+xO78kMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdpPEMlG3/LRRL+UEI6Yf5l8cyzqBkAwzQ8q8FNKMUa4vhepd8eOOg/9GRDZLiZmzIKx59i1xL13o+W8TG3YIRt9uLnt4cI/uUe7A+X/0IiNKPQbxcl56G/+KCRwKgbmkhTrbwa1A2ccKdrEEIjkfoa3Wdp8eI+EgJA4Yu8FPQuLHBN6aRCcHPeRArOFTM2/IIVjZWUjRXKTTIIeAPGAOnHYarU+q4S+HgTIt8uXvUO9GywoEWpOHw1k20zx7GGpaP6TKBY3uq3L5ODQzrE1+Yd+qdgmMJoEXnocDxj4wEOSz+ypSkMNxMgruuTsmkyI9ZM4qRBBdkaaagsbm/W+ajAgMBAAECggEAE/5vdCD/MnYNNPWQAglcbZOKeC8suIKKhZXCDO74IAbj3t0liWvrsue/NJ58GqrS8TBG1bVvJ09U+cO52V8OuCCRf8vOb9NAfTySxdZ2yTZRPkogEb5JJOYfXFaVRrO6MbdCDIwPyFf1Tvoh5WvmQtweNrio3f5fZIVF534joz0VN1uWt9Oz5+hyiDxTBZq/73RlXMF2TbVpY7+Lj/X5diuTgsogN4rK8n/U6vJ9RlYTzlMwQrbE71S7wMxFLaFYwqHp29Syh9WtxFTN8cbdgsr1VZ3/ibRLVjo4wBUahrxUTobcKAu8ciynLKPTM6v+ELB1H/UIRMWQix7WLsFAQQKBgQD9b1WUNMpAdr9Ase8mdcJ53fJDbEXbrtiLUfLHZS/6b6PYMJbL18F+6dGl6NoudeeXST+jx1ZsEHjwZNWw+K0GevAdF87eVDRovYUzhzV3fRilSzzpXMKH9IXG67qkQHt3mUNm61in98kEa2ACw5MrPEFW1nnVKTMf/FvIDY7y9QKBgQCfPWhp+GKfya9jCnH7RycYvpWSSymSlbiqqGs8pucBsoP6awrjMv0gxGCNCapSRVcebzWKlkwB4oflJlVlHshIwJ//jZkZoFJq8EwnDADqhQ8wm1jICWQdt83m+s9nhe6liiSKJvwKBB8v8/7MEcW4+UPTIXcIhTJrhJIF+QZkNwKBgCtUjrgxMmdFJjvkcDQOLDrz1IjsiSEfSsy/LRgkV8ikr8m1vQKLF/0f8wU/w5Xv+LGoB2Z0HXWKd3L6eoKwcbzK5iTDPk5K7U7/IDgIJP8R91XDgF2Ry3y9NOYmxZlxoOp43MpK8LR/K/JCfX7be10IB0/WiawFSEVuuy6ACvHFAoGAFOc/vKFxeN5F2q91VPH7LOFfywt40pg63JQtN5IFQxDHCGlizX5VAiclMX5yUEhv7jvVAHNIWPr+sdL9ZL/MtNgsaKSS021bRFR0+q81s5Nx8gSCfAfXj5sgOVD1Rvaq5ColL8l8TmhKG8ZgzTMMDIMUJzP+Zyzs+HY3oPcWorMCgYBqn0wupJ+Qin38gw6/zvPRbWD5a8fqXS6I7HGsx5ez4WC7nkWMZmYjRb38pH1PzswH9hL5s4zY/ZKK08noHSKNpFMF2HO4DJO7jLy3e9JSxBGEYqGN3e7MJzK5oQKSxMpyUW12qdK4x/yVoiCn0/qdhSH4oQ821lq6mIGRhOl2lA==',


        //notifyURL:notifyurl
    },function(ret,err) {
        if(ret.status) {
            aliPayPlus.pay({
                subject: '嗨瑶音乐',
                body: '1',
                amount: money, //0.01
                tradeNO: order_no
            },function(ret,err) {
                //alert(JSON.stringify(ret));
                if(ret.code == '9000') {
                    callback(ret);
                }else {
                    messgeShow('支付失败');
                }
            });
        }
    });
}

function wxpay(notifyurl,money,order_no,callback) {
    var wxPay = api.require('wxPay');
    wxPay.config({
        apiKey: 'wx33873039e1cabb37',
        mchId: '1351781901',
        partnerKey: '320682198712155958xuhaiyong15195',
        notifyUrl: notifyurl
    }, function(ret1, err){
        if(ret1.status){
            wxPay.pay({
                description: '嗨瑶音乐',
                totalFee: parseInt(money)*100,
                detail: '1',
                tradeNo: order_no,
                feeType: 'CNY'
            },function(ret, err){
                if(ret.status){
                    callback(ret);
                }else{
                    messgeShow('支付失败');
                }
            });

        } else {
            messgeShow('支付失败');
        }
    });
}


function is_iOS() {
    if(api.systemType == 'ios') return true;
    return false;
}

function is_Android() {
    if(api.systemType == 'android') return true;
    return false;
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
        bounces: true,
        bgColor: 'rgba(0,0,0,0)',
        vScrollBarEnabled: true,
        hScrollBarEnabled: true
    });
}



Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

function formatListTime(value) {

    var timestamp2 = new Date(Date.parse(value.replace(/-/g, "/")));
    return  new Date(timestamp2).format('yyyy-MM-dd'); //.toLocaleString().replace(/:\d{1,2}$/,' ');
}

function today() {
    return  new Date().format('yyyy-MM-dd');
}

Array.prototype.remove=function(obj){
    for(var i =0;i <this.length;i++){
        var temp = this[i];
        if(!isNaN(obj)){
            temp=i;
        }
        if(temp == obj){
            for(var j = i;j <this.length;j++){
                this[j]=this[j+1];
            }
            this.length = this.length-1;
        }
    }
}

function popPlayPage() {
    if(isVideo()) {
        return;
    }
    var anmType = (is_iOS()?"flip":"push");
    var anmSubType = (is_iOS()?"from_right":"from_bottom");
    api.openFrame({
      name: 'play',
      useWKWebView:false,
      url: 'widget://html/play_1.html',
      rect: {
          x: 0,
          y: 0,
          w: 'auto',
          h: api.winHeight
      },
      animation:{
          type:anmType,                //动画类型（详见动画类型常量）
          subType:anmSubType,       //动画子类型（详见动画子类型常量）
          duration:500                //动画过渡时间，默认300毫秒
      },
      bounces: false,
  });
}

function startPlayList(list,index) {
    setMusic(list[index]);
    setMusicIndex(index);
    setMusicList(list);
    playMusic(0);
}

function openVideo(item) {
    stopMusic();
    openWin('video'+item.did,'widget://html/video.html',{id:item.did,title:item.name,path:item.playurl})
}

function isVideo() {

    return Music()&&(Music().playurl.endsWith('.mp4')||Music().playurl.endsWith('.MP4')||Music().playurl.endsWith('.avi'));
}