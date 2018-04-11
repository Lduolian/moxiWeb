<?php
    require('connect.php');

    $qty = isset($_GET['qty']) ? $_GET['qty'] : 20;

    $page = isset($_GET['page']) ? $_GET['page'] : 1;

    $min = $qty*($page-1)+1;
    
    $data = array();
    $sql = "select * from goodslist where id>='$min' limit 20";
    $result= $conn->query($sql);

    while($row = mysqli_fetch_array($result)){
        $data[]=$row;
    }
   // $arr = array($data);
    echo json_encode($data);

?>
