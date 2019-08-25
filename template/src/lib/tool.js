export function getUrl(base_url,url) {
    return "widget://static/day/"+base_url+'/'+url;
}

export function isLogin(obj) {
    if(!obj.$store.state.isLogin) {
        obj.$router.push('/login')
        return false;
    } 

    return true;
}