var xmlhttp;
 var isCheckPhoneMsg=false;
 var isCheckPhone=false;
 function CreateXmlHttp() {
     if (window.ActiveXObject)
         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
     else if (window.XMLHttpRequest)
         xmlhttp = new XMLHttpRequest();
 }

function checkUserByMail(UserEmail) {
    var sp = document.getElementById("result");
    sp.style.color = "";
    if (UserEmail == "") {
        sp.innerHTML = "邮箱帐号不能为空!";
        sp.style.color = "red";
        return false;
    }
    else {
        //邮箱验证 
        var s = UserEmail;
        var pattern = /^[a-zA-Z0-9_\-.?*~]{1,}@[a-zA-Z0-9_\-.?*~]{1,}\.[a-zA-Z0-9_\-.?*~]{1,}$/;
        if (pattern.exec(s)) {
            //打造对象

            CreateXmlHttp();
            xmlhttp.open("POST", "checkUserByMail.ashx");
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            xmlhttp.onreadystatechange = getResult;
            xmlhttp.send("txtuserEmail=" + UserEmail);
        }
        else {
            sp.innerHTML = "请输入正确的邮箱帐号!";
            sp.style.color = "red";
            return false;
        }
    }
    return true;
}
function getResult() {
    //alert(xmlhttp.readyState);
    var result = "检测中..."
    //接收数据
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }

    document.getElementById("result").innerHTML = result;
}
function changeImage() {
    document.getElementById("regimage").src = "/ValidateCode.aspx?t=" + new Date().getTime();
    return false;
}
function changeImage1() {
    document.getElementById("regimage1").src = "/ValidateCode.aspx?t=" + new Date().getTime();
    return false;
}
 var phoneInter;

//昵称
function CheckUserLoginName(userLoginName) {
    var userName = document.getElementById("spLoginName");
    userName.style.color = "";
    var pattern = /^[\w\u4e00-\u9fa5]+$/;
    if (!pattern.exec(userLoginName)) {
        userName.innerHTML = "3~10个字符,只含有汉字、数字、字母、_";
        userName.style.color = "red";
        return false;
    }
    if (userLoginName.length < 3 || userLoginName.length > 10) {

        userName.innerHTML = "3~10个字符,只含有汉字、数字、字母、_";
        userName.style.color = "red";
        return false;
    }
    if (userLoginName != "") {
        userName.innerHTML = "检测中..."
        $.ajax({
            type: "GET",
            url: "ashx/checkUserLoginName.ashx",
            data: "userLoginName=" + escape(userLoginName),
            success: function (msg) {
                if (msg == "0") {
                    userName.innerHTML = "该昵称存在，请重填!";
                    userName.style.color = "red";
                }
                else if (msg == "1") {
                    userName.innerHTML = "";
                }
            }
        });
    }
    else {
        userName.innerHTML = "昵称必填!";
        userName.style.color = "red";
        return false;
    }

    return true;
}

//密码验证
function CheckUsePwd(userPwd) {
    var pattern = /^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{6,16}$/;
    var pwd = document.getElementById("spPwd");

    if (userPwd == "") {
        pwd.innerHTML = "请输入密码";
        pwd.style.color = "red";
        return false;
    }
    else if (!pattern.exec(userPwd)) {
        pwd.innerHTML = "6~16位字符,只能包含字母,数字或下划线";
        pwd.style.color = "red";
        return false;
    }
    else if (userPwd.length < 6 || userPwd.length > 16) {
        pwd.innerHTML = "密码长度只能在6-16位字符之间";
        pwd.style.color = "red";
        return false;
    }
    pwd.innerHTML = "";
    return true;
}
//重复密码
function CheckRptPwd(rptPwd) {
    var sptPwd = document.getElementById("spRptPwd");
    var pwd = document.getElementById("txtuserPwd");
    if (rptPwd != pwd.value) {
        sptPwd.innerHTML = "两次输入的密码不一致";
        sptPwd.style.color = "red";
        return false;
    }
    sptPwd.innerHTML = "";
    return true;
}


