
function ValidateRegiter() {
    var UserEmail = $("#txtuserEmail").val();
    var UserLoginName = $("#txtuserLoginName").val();
    var UserPwd = $("#txtuserPwd").val();
    UserPwd = UserPwd + "";
    var RptPwd = $("#txtrptPwd").val();
    var FromWhereLearn = escape($("#txt_FromWhereLearn").val());
    var Code = $("#txtCode").val();
    var ck = document.getElementById("agreement");
    var userid = suserID;
    var action = saction;
    if (!ck.checked) {
        alert("您没有接受《用户协议》，不能注册！"); return false;
    }
    if (!checkUserByMail(UserEmail)) {
        return false;
    }
    else if (!CheckUserLoginName(UserLoginName)) {
        return false;
    }
    else if (!CheckUsePwd(UserPwd)) {
        return false;
    }
    else if (!CheckRptPwd(RptPwd)) {
        return false;
    }
    else if (Code == "") {
        document.getElementById("spcode").innerHTML = "请输入验证码！"
        return false;
    }
    else {
        User_Register(UserEmail, UserPwd, UserLoginName, Code, FromWhereLearn, userid, action);
    }
    return true;
}

function User_Register(UserEmail, UserPwd, UserLoginName, Code, FromWhereLearn, userid, action) {
    $("#register_waiting").show();
    $("#Register_submit").hide();
    $.ajax({
        type: "POST",
        url: "/ajax/UserRegister.aspx",
        data: "UserEmail=" + UserEmail + "&UserPwd=" + UserPwd + "&UserLoginName=" + escape(UserLoginName) + "&Code=" + Code + "&FromWhereLearn=" + FromWhereLearn + "&userid=" + userid + "&action=" + action + "&date=" + new Date().toString(),
        complete: function (msg) {
            var jsonData = msg.responseText;
            if (jsonData == "success") {
                location.href = "action.aspx?action=Register";
            }
            else if (jsonData == "commonEmmail") {
                alert("提示：注册帐号应为邮箱号!");
            }
            else if (jsonData == "errorEmmail") {
                alert("提示：邮箱帐号不正确!");
            }
            else if (jsonData == "errorCode") {

                alert("提示：验证码不正确!");
            }
            else if (jsonData == "commonnicheng") {

                alert("提示：昵称存在，请重填!");
            }
            else if (jsonData == "errorIp") {
                alert("注册过于频繁,请稍后再试");
            }
            else if (jsonData == "errorPhone") {
                alert("提示：手机号码不存在或已经注册");
            } else if (jsonData == "errorFromWhereLearn") {
                alert("提示：30分钟之内不能重复使用同一推荐人!");
            }
            else {
                alert("注册失败,请与客服人员联系!");
            }
            $("#register_waiting").hide();
            $("#Register_submit").show();
        }
    });
}

function DaigouLogin() {
    $("#dv_DaigouLogin").css("display", "block");
    $("#fade").css("display", "block");

} 
function CloseLoginDiv(){
    $("#dv_DaigouLogin").css("display", "none");
    $("#fade").css("display", "none");
    if (JS_UserID==0) {
        $('#rd_NewAddr').attr('checked', 'checked');
    }