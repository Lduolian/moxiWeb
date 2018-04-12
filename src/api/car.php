<?php
    require('connect.php');

    $img = isset($_GET['img']) ? $_GET['img'] : '../images/16.jpg';
    $describe = isset($_GET['describe']) ? $_GET['describe'] : '【香港直邮】【单件装 包邮包税】日本CPB 肌肤之钥 钻石光感隔离霜 滋润型 40ml/支">';
    $price = isset($_GET['price']) ? $_GET['price'] : 480;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 2;

    $sqlsql = "select * from car where img ='$img'";
    $res = $conn->query($sqlsql);
    if($res->num_rows > 0){echo "hello";
        $data = $res->fetch_assoc();var_dump($data);
        // echo $data['qty'];
        // foreach($data as $x=>$x_value){
        //     echo "key=" . $x . ", value=" . $x_value;
           

        // }
        // $count = $data=>qty;echo $count;
        $qty = $data['qty'];
        $qty++;
        $qlql = "update car set qty='$qty' where img='$img'";
        $conn->query($qlql);
    }else{
        $sql = "insert into car(img,des,price,qty) values('$img','$describe',$price,'$qty')";
        $result = $conn->query($sql);
    }

    

    
    // echo $img;
    // echo json_encode($res,JSON_UNESCAPED_UNICODE);
    

?>