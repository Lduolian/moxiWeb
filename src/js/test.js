<script>

            $(".topSmallBannerClose").click(function () {
                $(".topSmallBanner").hide();
            });


            if (window.location.href == "http://www.moximoxi.net" || window.location.href == "http://www.moximoxi.net/" ||
                window.location.href.indexOf("http://www.moximoxi.net/index.aspx") >= 0) {
                $(".serverMenu").show();
                $("#navAll").hover(function () {
                    $(".serverMenu").show();
                }, function () {
                    $(".serverMenu").show();
                });

            } else {
                $(".serverMenu").hide();
                $("#navAll").hover(function () {
                    $(".serverMenu").show();
                }, function () {
                    $(".serverMenu").hide();
                });
                $(".serverMenu").hover(function () {
                    $(".serverMenu").show();
                }, function () {
                    $(".serverMenu").hide();
                });
                $(".inServerMenuB").hover(function () {
                    $(".serverMenu").show();
                }, function () {
                    $(".serverMenu").hide();
                });
            }
          
            $(function () {
                var num = 0;
                var a = 8;
                var timer = null;
                $('.inServerMenuB').each(function (i, item) {
                    num = 8 - i;
                    $(item).css('zIndex', num);
                });

                $('.inServerMenu li').mouseover(function () {
                    a++;
                    var index = $(this).index();
                    $(this).addClass('act').siblings().removeClass('act');
                    $('.inServerMenuB').eq(index).css('display', 'block').siblings().css('display', 'none');
                    clearTimeout(timer)
                }).mouseout(function () {
                    timer = setTimeout(function () {
                        $('.inServerMenuB').css('display', 'none');
                    }, 0);
                    $('.inServerMenu li').removeClass('act');

                });

                $('.inServerMenuB').mouseover(function () {
                    a++;
                    var index = $(this).index();
                    $('.inServerMenuB').eq(index).css('display', 'block').siblings().css('display', 'none');
                    $('.inServerMenu li').eq(index).addClass('act');

                    clearTimeout(timer)
                }).mouseout(function () {
                    timer = setTimeout(function () {
                        $('.inServerMenuB').css('display', 'none');
                    }, 0);
                    $('.inServerMenu li').removeClass('act');

                });

            });

    $(function(){
            var loginweyeflag=true;
            $(".loginwremember input").attr("checked",true);
            $(".loginbonder").click(function(){
                $(".loginwlay").css("display","block");
                $(".loginwindow").css("display","block");
                //判断本地是否保存的用户信息
                var str=cookie.get("loginwaccount");
                if(str){
                    $(".loginwname").val(str.split(",")[0]);
                    $(".hideps").val(str.split(",")[1]);
                    $(".showps").val(str.split(",")[1]);
                }
            });
            $(".loginwclose").click(function(){
                $(".loginwlay").css("display","none");
                $(".loginwindow").css("display","none");
            });
            //明码显示
            $(".hideps").keyup(function(){
                $(".showps").val($(".hideps").val());
            });
            $(".showps").keyup(function(){
                $(".hideps").val($(".showps").val());
            });
            $(".loginweye").click(function(){
                if(loginweyeflag){
                    $(".hideps").css('display',"none");
                    $(".showps").css("display","block");
                }else{
                    $(".showps").css('display',"none");
                    $(".hideps").css("display","block");
                }
                loginweyeflag=!loginweyeflag;
            });
            //手机号邮箱正则
            $(".loginwname").blur(function(){
                loginwvalida();
            });
            function loginwvalida(){
                $.loginwflag=true;
            }
            $(".loginwname").focus(function(){
                $(".loginwerinfo").html("");
            });
            $(".loginwps").focus(function(){
                $(".loginwerinfo").html("");
            });
            //登录
            $(".loginwsubmit").click(function(){
                loginwvalida();
                if($(".hideps").val()==""){
                    $(".loginwerinfo").html("密码不能为空，请填写~");
                    return;
                }else if($(".loginwname").val()==""){
                    $(".loginwerinfo").html("用户名不能为空，请填写~");
                    return;
                }else if(!($.loginwflag)){
                    $(".loginwerinfo").html("账户格式不正确，请重新填写~");
                    return;
                }else{
                    //保存密码
                    if($(".loginwremember :checked").length){
                        var temp=[];
                        temp.push($(".loginwname").val());
                        temp.push($(".hideps").val());
                        cookie.set("loginwaccount",temp,7);
                    }else{
                        cookie.remove("loginwaccount","",-1);
                    }
                    $.getJSON("http://www.moximoxi.net/ajax/UserLogin.aspx?callback=?",{UserName:$(".loginwname").val(),PWD:$(".hideps").val()},function(data){
                        console.log(data);
                        if(data.Success){
                            location.href=data.UrlReferrer;
                        }else{
                            $(".loginwerinfo").html(data.Message);
                        }
                    })
                }
            });
            //第三方登录
            $(".loginwqq").click(function(){
                location.href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100237117&redirect_uri=http://api.moximoxi.net/qq_Connect/ConnectSuccessweb.aspx";
            });
            $(".loginwalip").click(function(){
                $("#alipaysubmit").submit();
            });
            //cookie存取
            var cookie={set:function(name,value,days){
            var nowtime=new Date().getTime();
            var duration=days*24*60*60*1000;
            var endtime=new Date(nowtime+duration).toGMTString();
            document.cookie=window.encodeURIComponent(name)+"="+window.encodeURIComponent(value)+";path=/;expires="+endtime;
        },
        get:function(name){
            var str=window. decodeURIComponent(document.cookie);
            var array=str.split(";");
            var value;
            for(var i=0;i<array.length;i++){
                if(array[i].search(name)!=-1){
                    value=array[i].substring(array[i].indexOf("=")+1);
                    break;
                }
            }
            return value;
        },
        remove:function(name,value,days){
            cookie.set(name,"",-1);
        }
      }
    if(localStorage.getItem("fromnewfindps")){
                        $(".loginwlay").css("display","block");
                        $(".loginwindow").css("display","block");
                        localStorage.removeItem("fromnewfindps");
                    }
        })        

        </script>