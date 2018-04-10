<?php
    require('connect.php');

    $username = isset($_GET['username']) ? $_GET['username'] : null;
    $userpass = isset($_GET['userpass']) ? $_GET['userpass'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;

    $sql = "select * from user where username='$username'";
    $res = $conn->query($sql);
    if($res->num_rows > 0){
        echo 'fail';
    }else{
        if($type === 'reg'){
            $userpass = md5($userpass);
            $sql = "insert into user(username,userpass) values('$username','$userpass')";
            $result = $conn->query($sql);
            if($result){
                echo 'success';
            }else{
                echo 'fail';
            }
        }else{
            echo 'success';
        }
        
    }
?>