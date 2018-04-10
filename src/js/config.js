require.config({
    paths:{
        jquery:'../lib/jquery-3.3.1',
        header:'./header'
    },
    // 配置依赖
    shim:{
        header:['jquery']
    }
});