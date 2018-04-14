<?php
    require('connect.php');

    $qty = isset($_GET['qty']) ? $_GET['qty'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    $id = isset($_GET['id']) ? $_GET['id'] : null;

    if($type==='add'){
        $sql = "update car set qty='$qty' where id='$id'";
        $res = $conn->query($sql);
    }

    if($type==='reduce'){
        $sql = "update car set qty='$qty' where id='$id'";
        $res = $conn->query($sql);
    }

    if($type==='delete'){
        $sql = "delete from car where id='$id'";
        $res = $conn->query($sql);
    }

    $sql = "select * from car";

    $result = $conn->query($sql);

    $data = array();

    while($row = mysqli_fetch_array($result)){
        $data[]=$row;
    }
   // $arr = array($data);
    echo json_encode($data);

?>