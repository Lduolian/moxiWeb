<?php
    require('connect.php');

   // $data = array();
   // $sql = "select * from goodslist where id>=1 limit 20";
   // $result= $conn->query($sql);

   // while($row = mysqli_fetch_array($result)){
   //  $data[]=$row;
   // }
   // // $arr = array($data);
   // echo json_encode($data);
   
   
   $sql="select * from goodslist";
   $result = $conn->query($sql);
   $res = $result->num_rows;
   echo $res;


?>