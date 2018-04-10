require(['config'],function(){
    require(['jquery'],function($){
        $('#moxi_header').load('html/header.html');
        $('#moxi_footer').load('html/footer.html');

        //菜单显示
        jQuery(function($){
            var num = 0;
            var a = 8;
            var timer = null;
            $('.insertMenu_0').each(function(i,item){
                num = 8 -i;
                $(item).css('zIndex',num);
            });

            $('.menu_l li').mouseover(function(){
                a++;
                var index = $(this).index();
                $(this).addClass('act').siblings().removeClass('act');
                $('.insertMenu_0').eq(index).css('display','block').siblings().css('display','none');
                clearTimeout(timer);
            }).mouseout(function(){
                timer = setTimeout(function(){
                    $('.insertMenu_0').css('display','none');
                },0)
                $('.menu_l li').removeClass('act');
            });

            $('.insertMenu_0').mouseover(function(){
                a++;
                var index = $(this).index();
                $('.insertMenu_0').eq(index).css('display','block').siblings().css('display','none');
                $('.menu_l li').eq(index).addClass('act');
                clearTimeout(timer);
            }).mouseout(function(){
                timer = setTimeout(function(){
                    $('.insertMenu_0').css('display','none');
                },0);
                $('.menu_l li').removeClass('act');
            })
        });

        jQuery(function($){
            var num = 0;
            var timer = null;

            $('.bannerDot li').mouseover(function(){
                var index = $(this).index();
                num = index;
                $(this).addClass('act').siblings().removeClass('act');
                $('.bannerPic li').eq(num).fadeIn(100).siblings().fadeOut(100);
                var color = $('.bannerPic li').eq(num).attr('data-bc');
                $('#menu').css('background',color);
            });
            timer = setInterval(autoPlay,3000);
            function autoPlay(){
                if(!$('.bannerPic li').is(':animated')){
                    num++;
                    if(num >= 4){
                        num = 0;
                    }
                    $('.bannerDot li').eq(num).addClass('act').siblings().removeClass('act');
                    $('.bannerPic li').eq(num).fadeIn(800).siblings().fadeOut(800);
                    var color = $('.bannerPic li').eq(num).attr('data-bc');
                    $('#menu').css('background',color); 
                }
            }
            $('.banner').mouseover(function(){
                clearInterval(timer);
            }).mouseout(function(){
                timer = setInterval(autoPlay,3000);
            });
        }); 
  });

});