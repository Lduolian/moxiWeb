<?php
    require('connect.php');

    $id = isset($_GET['gId']) ? $_GET['gId'] : 1;

    $sql = "select * from goodslist where id='$id'";

    $result = $conn->query($sql);

    $res = $result ->fetch_assoc();
    
    if($result->num_rows >0){

        echo json_encode($res,JSON_UNESCAPED_UNICODE);
    }else{
        echo "fail";
    }


?>