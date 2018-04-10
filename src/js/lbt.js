<script type="text/javascript">
$(function () {
    var num = 0;

    var timer = null;

    $('.dot li').mouseover(function () {
        var index = $(this).index();
        num = index;

        $(this).addClass('act').siblings().removeClass('act');

        $('.inBannerMain li').eq(num).fadeIn(100).siblings().fadeOut(100);

        var color = $('.inBannerMain li').eq(num).attr('bc')

        $('.banner').css('background-color', color)

    });


    timer = setInterval(autoplay, 5000);

    function autoplay() {
        if (!$('.inBannerMain li').is(":animated")) {
            num++;
            if (num == 10) {
                num = 0;
            }

            $('.dot li').eq(num).addClass('act').siblings().removeClass('act');

            $('.inBannerMain li').eq(num).fadeIn(800).siblings().fadeOut(800);

            var color = $('.inBannerMain li').eq(num).attr('bc');

            $('.banner').css('background-color', color);
        }
    }

    $('.bannerMain').mouseover(function () {
        clearInterval(timer);
    }).mouseout(function () {
        timer = setInterval(autoplay, 5000);
    });

});
</script>
