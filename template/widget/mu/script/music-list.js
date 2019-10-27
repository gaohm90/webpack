/**
 * Created by ghm on 16/5/30.
 */

var musicList ;
var url;
var shareIndex;
if (!shenHe()) {
    $res = $api.domAll('.down_shenhe');
    for(var i=0;i<$res.length;i++) {
        $api.removeCls($res[i], 'aui-hidden');
    }
}

function fenxiang(index,page) {

    if(!page) page = 1;
    count = 15*parseInt(page)+parseInt(index) - 15;
    index = count;

    H.swiperShare('.single-menu', '.share-menu', 'space');
    sendEvent('fenxiang',{});
    shareIndex = index;
}

function shareToWeiBo() {
    H.swiperShare('.single-menu', '.share-menu', 'space');
    var weibo = api.require('weibo');
    weibo.shareWebPage({
        text: musicList[shareIndex].name,
        title: musicList[shareIndex].name,
        description: musicList[shareIndex].name,
        thumb: 'widget://icon/icon150x150.png',
        contentUrl: musicList[shareIndex].share_url
    },function(ret,err){
        if (ret.status) {
            messgeShow('分享成功');
        }
    });
}

function shareToQQ(type) {
    H.swiperShare('.single-menu', '.share-menu', 'space');

    var qq = api.require('qq');
    qq.shareNews({
        url: musicList[shareIndex].share_url,
        title: musicList[shareIndex].name,
        description: musicList[shareIndex].name,
        type:type,
        imgUrl: 'widget://icon/icon150x150.png'
    });


}


function shareToWx(mode) {
    H.swiperShare('.single-menu', '.share-menu', 'space');
    var wx = api.require('wx');
    wx.shareWebpage({
        apiKey: '',
        scene: mode,
        title: musicList[shareIndex].name,
        description: musicList[shareIndex].name,
        thumb: 'widget://icon/icon150x150.png',
        contentUrl: musicList[shareIndex].share_url
    }, function(ret, err){
        if(ret.status){
            messgeShow('分享成功');
        }
    });
}

function shoucang(did) {
    if(!checkLogoStatus()) return;
    hudShowProgress('请稍等...');
    getGetDataWithToken('user?sid=7&did='+did,function(ret){
        messgeShow('收藏成功');
    });
}

function xiazai(index,page) {
    if(!page) page = 1;
    count = 15*parseInt(page)+parseInt(index) - 15;
    index = count;
    downLoadMusic(musicList[count]);
}

function zuozhe(index,page) {
    if(!page) page = 1;
    count = 15*parseInt(page)+parseInt(index) - 15;
    index = count;
    openMusicList(3,musicList[index].userid,musicList[index].user);
}

function showInfo(uid,e){
    stopBubble(e);
    if($api.hasCls($api.byId('info'+uid),'aui-show')) {
        $api.removeCls($api.byId('info'+uid),'aui-show');
    } else {
        $info = $api.domAll($api.byId('content'), '.info');
        for(var i=0;i<$info.length;i++) {
            $api.removeCls($info[i],'aui-show');
        }
        $api.addCls($api.byId('info'+uid),'aui-show');
    }
}

function playIndex(index,obj,page){
    if(popPlay && popPlay == 1) {
        popPlay = 0;
        popPlayPage();
    }
    $api.removeCls($api.dom('.select'),'select') ;
    $api.addCls($api.closest(obj, 'li'),'select') ;
    if(!page) page = 1;
    count = 15*parseInt(page)+parseInt(index) - 15;
    //console.log(count +'    '+ musicList.length + 'page:'+page);
    stopMusic();
    setMusicIndex(count);
    setMusic(musicList[count]);
    setMusicList(musicList);
    playMusic(1);

}

