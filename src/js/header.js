require(['config'],function(){
    require(['jquery'],function(){
        jQuery(function($){
            
            $('.loginbonder').click(function(){
                $('#loginLay').css('display','block');
                $('#loginWindow').css('display','block');
            });
            $('.loginClose').click(function(){
                $('#loginLay').css('display','none');
                $('#loginWindow').css('display','none');
            });

            $('.username').focusout(function(){
                let _username = $('.username').val();
                _username = $.trim(_username);
                if(_username.length===0){
                    $('.loginInfo').html('用户名不能为空');
                    return;
                }else if(!/^[a-z][\w\-]{5,19}$/i.test(_username)){
                    $('.loginInfo').html('用户名格式不正确,以字母开头，6-20位字符');
                    return;
                }
            });


            $('.loginSubmit').click(function(){
                let _username = $('.username').val();
                _username = $.trim(_username);
                let _userpass = $('.userpass').val();
                _userpass = $.trim(_userpass);
                if(_username.length===0){
                    $('.loginInfo').html('用户名不能为空');
                    return;
                }else if(!/^[a-z][\w\-]{5,19}$/i.test(_username)){
                    $('.loginInfo').html('用户名格式不正确,以字母开头，6-20位字符');
                    return;
                }else if(_userpass.length===0){
                    $('.loginInfo').html('密码不能为空');
                    return;
                }else{
                    $.ajax({
                        url:'../api/login.php',
                        data:{
                            username:_username,
                            userpass:_userpass
                        },
                        success:function(data){
                            if(data==='fail'){
                                $('.loginInfo').html('用户名或密码错误');
                                
                            }else{
                                $('#loginLay').css('display','none');
                                $('#loginWindow').css('display','none');
                            }
                        }
                    })
                }
            })
        })
    })
})