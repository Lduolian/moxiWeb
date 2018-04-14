require.config({
    paths:{
        jquery:'../lib/jquery-3.3.1',
        header:'./header',
        common:'./common',
        xZoom:'../lib/jquery-xZoom/jquery.xZoom'
    },
    // 配置依赖
    shim:{
        header:['jquery'],
        common:['jquery'],
        xZoom:['jquery']
    }
});