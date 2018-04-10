<?php
    require('connect.php');

    $username = isset($_GET['username']) ? $_GET['username'] : null;
    $userpass = isset($_GET['userpass']) ? $_GET['userpass'] : null;
    
    $userpass = md5($userpass);
    $sql = "select * from user where username = '$username' and userpass = '$userpass'";
    $result  = $conn->query($sql);
    // $res = $result->fetch_assoc();
    if($result->num_rows > 0){
        echo "success";
    }else{
        echo "fail";
    }