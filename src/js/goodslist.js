require(['config'],function(){
    require(['jquery'],function(){
        jQuery(function($){
            $('#moxi_header').load('../html/header.html');
            $('#moxi_footer').load('../html/footer.html');
        });

        jQuery(function($){
           
            var qty = 20;

            $.ajax({
                url:'../api/goodslist.php',
                success:function(data){
                    getPage(data);
                    // data = JSON.parse(data);
                    // fun(data);console.log(data);
                }
            });

            $.ajax({
                url:'../api/goodslist2.php',
                success:function(data){
                    data = JSON.parse(data);
                    fun(data);
                }
            });

            var getPage = function(data){
                var page = Math.ceil(data/qty);
                for(var i = 0; i < page; i++){
                    var span = $('<span/>');
                    span.addClass('pageNum');
                    span.html((i+1));
                    if(i === 0){
                        $(span).addClass('active');
                    }
                    $('.page').append(span);
                }
            };

            $('.page').click(function(e){
                if(e.target.className === 'pageNum'){
                    var txt = e.target.innerHTML;
                    // e.target.classList.add('active');console.log($(e.target).siblings('span'))
                    $(e.target).addClass('active').siblings('.pageNum').removeClass('active');
                    $.ajax({
                        url:'../api/goodslist2.php',
                        data:{
                            page:txt
                        },
                        success:function(data){
                            data = JSON.parse(data);
                            fun(data);
                        }
                    })
                }
            });


            var fun = function(data){
                $('.show').html('');
                // var ul = $('<ul/>');
                // ul.addClass('show');
                var res = $.map(data,function(item){
                    return `<li data-id="${item.id}"><a href="#">
                    <div class="pic"><img src="${item.img}"></div>
                    <div class="price"><b>${item.price}</b>元</div>
                    <div class="describe">${item.describe}</div></a>
                    </li>`
                });
                // console.log(res)
                $('.show').html(res);
                // $('.goods_right').append(ul);

            };

            $('.show').click(function(e){
                if(e.target.tagName.toLowerCase() === 'img'){
                    var li = e.target.parentNode.parentNode.parentNode;
                    var id = $(li).attr('data-id');
                    var a = $('a');
                    a.attr('href','goodsdetail.html?id=' + id);
                }else if(e.target.className==='pic' || e.target.className==='describe'){
                    var li = e.target.parentNode.parentNode;
                    var id = $(li).attr('data-id');
                    var a = $('a');
                    a.attr('href','goodsdetail.html?id=' + id);
                }
            });

        });


    })
})