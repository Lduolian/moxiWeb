require(['config'],function(){
    require(['jquery','xZoom'],function(){
        jQuery(function($){
            $('#moxi_header').load('../html/header.html');
            $('#moxi_footer').load('../html/footer.html');
        });
        jQuery(function($){
            
            var url = decodeURI(location.search.slice(1));
            var str = url.split('=');
            var id = str[1];
            $.ajax({
                url:'../api/goodsdetail.php',
                data:{gId:id},
                success:function(data){
                    data = JSON.parse(data);
                    fun(data);
                    $('.left_pic').xZoom({
                        height:400,
                        width:400
                    })
                }
            });

            var fun = function(data){
                $('.left_pic img').attr('src',data.img);
                $('.fangdajing img').attr('src',data.img);
                $('.left_list img').attr('src',data.img);
                $('.good_center h1').html(data.describe);
                $('.good_center .money').html(data.price);
                $('.good_center .market').html(data.marketPrice);
                $('.good_center .centerNum span').html(data.number);
                $('.good_center .centerSale span').html(data.sale);
            };

            $('.btnRight').click(function(){
                $('.left_list img').animate({
                    left:240
                },1000);

            });

            $('.btnLeft').click(function(){
                
                $('.left_list img').animate({
                    left:0
                },1000)

            });

            $('.btnAdd').click(function(){
                var num = $('#count').val()*1;
                num++;
                $('#count').val(num);
            });

            $('.btnReduce').click(function(){
                var num = $('#count').val()*1;
                num--;
                $('#count').val(num);
                if($('#count').val()*1<=1){
                    $('#count').val(1);
                }
            });

            $('.btnAppend').click(function(){
                send();
            })

            var send = function(){
                var count = $('#count').val()*1;
                $.ajax({
                    url:'../api/goodsdetail.php',
                    data:{gId:id},
                    
                    success:function(data){alert("加入购物车成功");
                        data = JSON.parse(data);
                        var goods = data;
                        $.ajax({
                            url:'../api/car.php',
                            data:{
                                img:goods.img,
                                describe:goods.describe,
                                price:goods.price,
                                qty:count
                            }
                            
                        });
                    }
                });
            }
           
            

            
        });
    })
})