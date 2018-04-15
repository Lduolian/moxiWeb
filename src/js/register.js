require(['config'],function(){
    require(['jquery','common'],function(){

        jQuery(function($){
            $('#moxi_header').load('../html/header.html');
            $('#moxi_footer').load('../html/footer.html');
        });
        jQuery(function($){
            $('.sub').click(function(){
                let _username = $('#zhanghao').val();
                let _userpass = $('#mima').val();
                if(_username.length === 0){
                    $('.loginInfo').html('帐号不能为空');
                }else if(!/^[a-z][\w\-]{5,19}$/i.test(_username)){
                    $('.loginInfo').html('帐号格式不正确,以字母开头，6-20位字符');
                }else if(_userpass.length === 0){
                    $('.loginInfo').html('密码不能为空');
                }else{
                    $.ajax({
                        url:'../api/login.php',
                        data:{
                            username:_username,
                            userpass:_userpass
                        },
                        success:function(data){
                            if(data==='fail'){
                                $('.loginInfo').html('帐号或密码错误');
                            }else{
                                location.href='../index.html';
                            }
                        }
                    })
                }
            });
        });

        jQuery(function($){
           

            $('#username').focusout(function(){
                var username = $('#username').val();
                username = $.trim(username);
                if(username.length===0 || !(/^[\w\-]{3,10}$/i.test(username))){
                    $('.nicheng').addClass('error').html('昵称格式不正确');
                    return false;
                }else{
                    $('.nicheng').removeClass('error').html('');
                }
            });

            $('#password').focusout(function(){
                var pwd = $('#password').val();
                pwd = $.trim(pwd);
                if(pwd.length === 0 || !(/^[\w\-]{6,16}$/i.test(pwd))){
                    $('.firstPass').addClass('error').html('密码格式不正确');
                    return false;
                }else{
                    $('.firstPass').removeClass('error').html('');
                }
            });

            $('#passwordAgain').focusout(function(){
                var pwd = $('#password').val();
                pwd = $.trim(pwd);
                var pwdAgain = $('#passwordAgain').val();
                pwdAgain = $.trim(pwdAgain);
                if(pwdAgain.length ===0 || pwd.length ===0 || pwd!=pwdAgain){
                    $('.secondPass').addClass('error').html('两次密码输入不一致');
                    return false;
                }else{
                    $('.secondPass').removeClass('error').html('');
                }
            });

            var code = randomLetterNum();
            $('.randomCode').html(code);
            $('.nextCode').click(function(){
                var code = randomLetterNum();
                $('.randomCode').html(code);
            })
            $('#code').focusout(function(){
                var randomCode = $('.randomCode').html();
                randomCode = $.trim(randomCode);
                var code = $('#code').val();
                code = $.trim(code);
                if(code.length===0 || randomCode != code){
                    $('.vcode').addClass('error').html('请输入正确的验证码');
                    return false;
                }else{
                    $('.vcode').removeClass('error').html('');
                }

            });
            // }
            $('#zhuceNum').focusout(function(){
                var _zhuceNum = $('#zhuceNum').val();
                _zhuceNum = $.trim(_zhuceNum);
                if(_zhuceNum.length===0 || !(/^[\w\-]{6,20}$/i.test(_zhuceNum))){
                    $('.loginNum').addClass('error').html('帐号不能为空且长度为6-20为字符');
                    return false;
                }
                $.ajax({
                    url:'../api/register.php',
                    data:{username:_zhuceNum},
                    success:function(data){
                        if(data==='fail'){
                            $('.loginNum').addClass('error').html('这个用户名已经存在');
                        }
                        if(data==='success'){
                            $('.loginNum').removeClass('error').html('这个用户名可以注册');
                        }
                    }
                });
            });

            $('#username').focusout(function(){
                var username = $('#username').val();
                username = $.trim(username);
                if(username.length===0 || !(/^[\w\-]{3,10}$/i.test(username))){
                    $('.nicheng').addClass('error').html('昵称格式不正确');
                    return false;
                }else{
                    $('.nicheng').removeClass('error').html('');
                }
            });

            $('#password').focusout(function(){
                var pwd = $('#password').val();
                pwd = $.trim(pwd);
                if(pwd.length === 0 || !(/^[\w\-]{6,16}$/i.test(pwd))){
                    $('.firstPass').addClass('error').html('密码格式不正确');
                    return false;
                }else{
                    $('.firstPass').removeClass('error').html('');
                }
            });

            $('#passwordAgain').focusout(function(){
                var pwd = $('#password').val();
                pwd = $.trim(pwd);
                var pwdAgain = $('#passwordAgain').val();
                pwdAgain = $.trim(pwdAgain);
                if(pwdAgain.length ===0 || pwd.length ===0 || pwd!=pwdAgain){
                    $('.secondPass').addClass('error').html('两次密码输入不一致');
                    return false;
                }else{
                    $('.secondPass').removeClass('error').html('');
                }
            });

            var code = randomLetterNum();
            $('.randomCode').html(code);
            $('.nextCode').click(function(){
                var code = randomLetterNum();
                $('.randomCode').html(code);
            })
            $('#code').focusout(function(){
                var randomCode = $('.randomCode').html();
                randomCode = $.trim(randomCode);
                var code = $('#code').val();
                code = $.trim(code);
                if(code.length===0 || randomCode != code){
                    $('.vcode').addClass('error').html('请输入正确的验证码');
                    return false;
                }else{
                    $('.vcode').removeClass('error').html('');
                }

            });
            $('.btn-sub').click(function(){
                var _zhuceNum = $('#zhuceNum').val();
                _zhuceNum = $.trim(_zhuceNum);
                var _pass = $('#password').val();
                _pass = $.trim(_pass);
                var pwdAgain = $('#passwordAgain').val();
                pwdAgain = $.trim(pwdAgain);
                var randomCode = $('.randomCode').html();
                randomCode = $.trim(randomCode);
                var code = $('#code').val();
                code = $.trim(code);

                if(_zhuceNum.length === 0 || _pass.length === 0 || pwdAgain.length===0 || _pass!=pwdAgain || randomCode!=code){
                    alert("注册信息填写有误，请重新填写");
                }else{
                    $.ajax({
                        url:'../api/register.php',
                        data:{
                            username:_zhuceNum,
                            userpass:_pass,
                            type:'reg'
                        },
                        success:function(data){
                            console.log(data);
                            location.href='../index.html';
                        }
                    })
                }
                
            });



        });
        
    })
})