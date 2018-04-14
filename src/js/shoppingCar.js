require(['config'],function(){
    require(['jquery'],function(){
        jQuery(function($){
            $('#moxi_header').load('../html/header.html');
            $('#moxi_footer').load('../html/footer.html');
        });

        jQuery(function($){


            $.ajax({
                url:'../api/shoppingCar.php',
                success:function(data){
                    data = JSON.parse(data);
                    if(data.length==0){
                        $('.buycar_loading').css('display','block');
                        $('.buycar_box').html('');
                    }else{
                        $('.buycar_loading').css('display','none');
                        fun(data);
                        var btnAdd = $('.btnAdd');
                        var btnReduce = $('.btnReduce');
                        var f_action = $('.f_action');
                        del(f_action);
                        add(btnAdd);
                        reduce(btnReduce);
                    }
                    
                }
            });

            var add = function(ele){
                ele.click(function(e){
                    // console.log($('.sumPrice em').text())
                    // console.log($(e.target).parent().parent().next().find("em").first().html());
                    // console.log($(e.target).parent().parent().prev().find("em").first().html());
                    var price = $(e.target).parent().parent().prev().find("em").first().html()*1;
                    // var sum = $(e.target).parent().parent().next().find("em").first().html();
                    var span = $(e.target).parent().parent().next().find("em").first();
                    
                    var data = $(e.target).prev().val();
                    data++;
                   $(e.target).prev().val(data);
                   var dataId = $(e.target).prev().attr('data-id');

                   var total = data*price;
                  
                   var zongjia = ($('.sumPrice em').html()*1)+(price);
                   // console.log($('.sumPrice em').html()*1,price);
                   $('.sumPrice em').html('');
                   $('.sumPrice em').html(zongjia);

                   span.html(total);
                   $.ajax({
                        url:'../api/shoppingCar.php',
                        data:{qty:data,type:'add',id:dataId}
                   })
                })
            };

            var reduce = function(ele){
                ele.click(function(e){
                    var price = $(e.target).parent().parent().prev().find("em").first().html()*1;
                    var span = $(e.target).parent().parent().next().find("em").first();

                    var data = $(e.target).next().val();
                    var dataId = $(e.target).next().attr('data-id');
                    if(data<=1){
                        $(e.target).next().val(1);
                        var total = data*price;
                        span.html(total);
                    }else{
                        data--;
                        $(e.target).next().val(data);
                        var total = data*price;
                        span.html(total);
                        var zongjia = ($('.sumPrice em').html()*1)-(price);
                        $('.sumPrice em').html('');
                        $('.sumPrice em').html(zongjia);

                        $.ajax({
                            url:'../api/shoppingCar.php',
                            data:{qty:data,type:'reduce',id:dataId}
                        })
                    }
                 
                })
            }


            var del = function(data){
                
                data.on('click','span',function(e){
                    var dataId = $(e.target).attr('id');
                    var sum = $(e.target).parent().prev().find('em').html()*1;
                    var zongji = $('.sumPrice em').html()*1 - sum
                    $('.sumPrice em').html(zongji);
                    $.ajax({
                        url:'../api/shoppingCar.php',
                        data:{id:dataId,type:'delete'},
                        success:function(data){
                            data = JSON.parse(data);
                            if(data.length==0){
                                $('.buycar_loading').css('display','block');
                                $('.buycar_box').html('');
                            }else{console.log(777)
                                $('.buycar_loading').css('display','none');
                                $(e.target).parent().parent().remove();
                            }
                        }
                    })
                    
                })
            }


            var fun = function(data){console.log("fun");
                var arr = [];
                var html = $.map(data,function(item){
                    var sum = item.qty * item.price;
                    arr[arr.length] = sum;
                    getArr(arr);
                    return `<div class="itemForm">
                                <div class="f_goods">
                                    <div class="pic">
                                        <a href="#">
                                            <img src="${item.img}"/>
                                        </a>
                                    </div>
                                    <div class="msg">
                                        <a href="#">${item.des}</a>
                                    </div>
                                </div>
                                <div class="f_price">
                                    <em class='pm'>${item.price}</em>
                                </div>
                                <div class="f_qty">
                                    <div class="wrap_input">
                                        <span class='btnReduce'>-</span>
                                        <input type="text" value="${item.qty}" data-id="${item.id}"/>
                                        <span class='btnAdd'>+</span>
                                    </div>
                                </div>
                                <div class="f_sum">
                                    <em>${sum}</em>元
                                </div>
                                <div class="f_action">
                                    <a>移入收藏夹</a>
                                    <span id="${item.id}">删除</span>
                                </div>
                            </div>`

                })
                $('.itemList').html('');
                $('.itemList').html(html);
            };

            var getArr = function(str){
                var sum = 0;
                for(var i = 0; i < str.length; i++){
                    sum+=str[i];
                }
                $('.sumPrice em').html(sum);
                // console.log(str);

            }

        })

        jQuery(function($){
            $('.btnLeft').click(function(){
                $('.car_tab_end li').first().fadeOut();
                $('.car_tab_end li').last().fadeIn();
                
            });

            $('.btnRight').click(function(){
                $('.car_tab_end li').first().fadeIn();
                $('.car_tab_end li').last().fadeOut();
            });

            
            var timer = setInterval(function(){
                var li1 = $('.car_tab_end li').first();
                var li2 = $('.car_tab_end li').last();
                var attr = li1.css('display');
                if(attr === 'none'){
                    li1.fadeIn();
                    li2.fadeOut();
                }else{
                    li1.fadeOut();
                    li2.fadeIn();
                }
            },3000);

            $('.car_tab_end').mouseover(function(){
                clearInterval(timer);
            }).mouseout(function(){
                timer = setInterval(function(){
                var li1 = $('.car_tab_end li').first();
                var li2 = $('.car_tab_end li').last();
                var attr = li1.css('display');
                if(attr === 'none'){
                    li1.fadeIn();
                    li2.fadeOut();
                }else{
                    li1.fadeOut();
                    li2.fadeIn();
                }
            },3000);
            })
           
        });
    })
})