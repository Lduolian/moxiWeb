/* 
 * @Author: Marte
 * @Date:   2018-02-08 11:33:03
 * @Last Modified by:   Marte
 * @Last Modified time: 2018-03-29 19:45:13
 */


/**
 * [任意范围随机整数]
 * @param  {[Number]} min [最小值]
 * @param  {[Number]} max [最大值]
 * @return {[Number]}     [返回值]
 */
function randomNumber(min, max) {
    var num = parseInt(Math.random() * (max - min + 1) + min);
    return num;
}

/**
 * [1-100随机整数]
 * @return {[Number]} [返回值]
 */
function randomInt() {
    var num = parseInt(Math.random() * 100 + 1);
    return num;
}

/**
 * [随机颜色]
 * @return {[String]} [返回值]
 */
function randomColor(){
    var r = parseInt(Math.random()*256);
    var g = parseInt(Math.random()*256);
    var b = parseInt(Math.random()*256);
    return 'rgb('+r+','+g+','+b+')';

}

/**
 * [16进制随机颜色]
 * @return {[String]} [返回值]
 */
function random16Color(){
    var str = '0123456789abcdef';
    var res = '#';
    for(var num = 0; num <6; num++){
        res += str.charAt(parseInt(Math.random()*str.length));
    }
    return res;
}

/**
 * [4为随机数字字母组合验证码]
 * @return {[String]} [返回值]
 */
function randomLetterNum(){
    var str = '0123456789abcdefghijklmnopqrstuvwxyz';
    var res = '';
    for(var num = 0; num<4; num++){
        res += str.charAt(parseInt(Math.random()*str.length));
    }
    return res;
}

/**
 * [获取元素样式，兼容IE8-]
 * @param  {Element} ele [获取样式的元素]
 * @param  {String} key [css属性]
 * @return {String}     [返回key对应的属性值]
 */
function getCss(ele,key){
    // 思路：判断浏览器是否支持这个方法
    if(window.getComputedStyle){
        // 标准浏览器
        return getComputedStyle(ele)[key]
    }else if(ele.currentStyle){
        // IE8-
        return ele.currentStyle[key]
    }else{
        // 
        return ele.style[key]
    }
}

// function animate(ele,attr,target){
//     // 清除定时器，避免多个定时器用作于一个效果
//     clearInterval(ele.timer);


//     ele.timer = setInterval(()=>{
//         // 获取当前值
//         let current = getCss(ele,attr);//100px,45deg,0.5(string)
//         // 提取单位
//         let unit = current.match(/[a-z]+$/i);//[0:px,index:6,input:current],null

//         // 三元运算实现提取单位
//         unit = unit ? unit[0] : '';

//         // 提取值
//         current = parseFloat(current);

//         // 计算缓冲速度
//         let speed = (target-current)/10;//0.5=>1,-0.5=>-1


//         // 避免速度为小数
//         speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);//1,-1

//         // 针对opacity进行操作
//         if(attr === 'opacity'){
//             speed = speed>0 ? 0.05 : -0.05;
//         }
        
//         // 根据速度改变当前值
//         current += speed;


//         // 当到达目标指时
//         if(current === target || speed === 0){
//             clearInterval(ele.timer);

//             // 避免超出target的范围
//             current = target;
//         }

//         ele.style[attr] = current + unit;
//     },30)
// }



/**
 * [动画函数]
 * @param  {Element}   ele      [动画元素]
 * @param  {Object}   opt      [动画属性]
 * @param  {Function} callback [回调函数]
 */
function animate(ele,obj,callback){
    let timerLen = 0;
    for(var attr in obj){
        timerLen++;
        createTimer(attr);
    }
    function createTimer(attr){
        let target = obj[attr];
        let timerName = attr + 'timer';
        clearInterval(ele[timerName]);
        ele[timerName] = setInterval(()=>{
            let current = getCss(ele,attr);
            let unit = current.match(/[a-z]+$/i);
            unit = unit ? unit[0] : '';
            current = parseFloat(current);
            let speed = (target-current)/10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if(attr === 'opacity'){
                speed = speed >0 ? 0.05 : -0.05;
            }
            current += speed;
            if(current === target){
                clearInterval(ele[timerName]);
                current = target;
                timerLen--;
            }
            if(timerLen===0 && typeof callback === 'function'){
                callback();
            }
            ele.style[attr] = current + unit;

        },30)
    }
}


/**
 * [DOM节点的相关方法]
 * @type {Object}
 */
// var Element = {
    /**
     * [传入一个类数组，过滤文本节点]
     * @param  {[array]} nodes [类数组]
     * @return {[array]}       [数组]
     */
    // get:function(nodes){
    //     var res = [];
    //     for(var i = 0; i < node.length; i++){
    //         if(node[i].nodeType==1){
    //             res.push(node[i]);
    //         }
    //     }
    //     return res;
    // }

    /**
     * [传入一个元素，获取他的子节点，过滤文本节点]
     * @param  {[type]} elem [元素]
     * @return {[array]}      [数组]
     */
//     children:function(elem){
//         var nodes = elem.childNodes;
//         var res = [];
//         nodes.forEach(function(item){
//             if(item.nodeType==1){
//                 res.push(item);
//             }
//         })
//         return res;
//     }
// }
// 


var Cookie = {
    get:function(key){
        var cookie = document.cookie;
        if(cookie.length ===0){
            return '';
        }
        var cookie = cookie.split('; ');
        for(var i = 0; i < cookie.length; i++){
            var arr = cookie[i].split('=');
            if(arr[0]===key){
                return arr[1];
            }
        }
    },

    set:function(key,value,date,path){
        var str = key + '=' + value;
        if(date){
            str += ';expires' + date.toUTCString();
        }
        if(path){
            str += ';path' + path;
        }
        document.cookie = str;
    },

    remove:function(key,path){
        var d = new Date();
        d.setDate(d.getDate()-1);
        // document.cookie = key + '=x;expires=' + d.toUTCString();
        this.set(key,'x',d,path);
    }
}


function type(data){
    return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}
