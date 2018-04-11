require.config({
    paths:{
        jquery:'../lib/jquery-3.3.1',
        header:'./header',
        common:'./common'
    },
    // 配置依赖
    shim:{
        header:['jquery'],
        common:['jquery']
    }
});