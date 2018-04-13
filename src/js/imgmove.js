// JavaScript Document
;(function($){
    
    var pluginName = "imgMove",
    defaultVal = {
            delay:6000,
            leftBtn:'leftBtn',
            rightBtn:'rightBtn',
            comBtn:'comswitch',
            current:0,
            next:0,
            picUl:'picUl',
            switchUl:'switch',
            isLoading:false
    };
        
    function imgMove(ele,opt,__this){
        this.settings  = $.extend({},defaultVal,opt);
        this.element = ele;
        this._that = __this;
        this.init();
    }
    
    imgMove.prototype = {
        init: function(){
            if(this._that.length==0) return;
            var that = this;
            that.current = this.settings.current;
            that.next = this.settings.next;
            that.disX = this._that.find('.'+this.settings.picUl+' li').width();
            that.Len = this._that.find('.'+this.settings.picUl+' li').length;
            that.picUl = this._that.find('.'+this.settings.picUl);
            that.switchUl = this._that.find('.'+this.settings.switchUl);
            that.isClick = false;
            that.loading(); //鍒濆鍖�
            that.startTimer();
            that.hoverEvent();
            that.bindEvent();
            that.switchBtnClick();
        },
        loading:function(){
            var that = this;
            var html = '';
            this._that.find('.'+this.settings.picUl+' li').not(":first").css({left:this.disX});
            for(var i=0;i<that.Len;i++){
                if(i==0){
                    html += '<li class="point active"></li>';
                }else{
                    html += '<li class="point"></li>';
                }
            };
            that.switchUl.html(html);
            that.switchUl.css({width:that.Len*22,marginLeft:-that.Len*22*0.5-5});
            clearInterval(this.timerId);
        },
        show: function(_current,_next){
            var that = this;
            this._that.find('.'+this.settings.picUl+' li').eq(_current).stop(true,false).animate({left:-that.disX},1000);
        this._that.find('.'+this.settings.picUl+' li').eq(_next).stop(true,false).css({left:that.disX}).animate({left:0},1000);
            this._that.find('.'+this.settings.switchUl+' li').eq(_current).removeClass('active');
            this._that.find('.'+this.settings.switchUl+' li').eq(_next).addClass('active');
        },
        toRightMove:function(_current,_next){
            var that = this;
            this._that.find('.'+this.settings.picUl+' li').eq(_current).stop(true,false).animate({left:that.disX},1000);
        this._that.find('.'+this.settings.picUl+' li').eq(_next).stop(true,false).css({left:-that.disX}).animate({left:0},1000);
            this._that.find('.'+this.settings.switchUl+' li').eq(_current).removeClass('active');
            this._that.find('.'+this.settings.switchUl+' li').eq(_next).addClass('active');

        },
        autoshow: function(){
            var that = this;
            if(that.next >= that.Len-1){
                that.next = 0;
                that.current = that.Len-1;
                that.show(that.current,that.next);
                that.current = that.next;
            }else{
                that.next = that.next+1;
                that.show(that.current,that.next);
                that.current = that.next;
            }
        },
        startTimer: function(){
            var that = this;
            this.timerId = setInterval(function(){
                that.autoshow();
            }, this.settings.delay);
        },
        stopTimer: function(){
            clearInterval(this.timerId);
        },
        hoverEvent:function(){
            var that= this;
            var $btnGroup = this._that.find('.'+this.settings.comBtn);
            $btnGroup.hover(function(){
                clearInterval(that.timerId);
            },function(){
                that.startTimer();
            })

            that.switchUl.hover(function(){
                clearInterval(that.timerId);
            },function(){
                that.startTimer();
            })
        },      
        switchBtnClick:function(){
            var that= this;
            that.switchUl.find('li').click(function(e){
                e.preventDefault();
                that.next = $(this).index();
                that.show(that.current,that.next);
                that.current = that.next;
            })
        },      
        bindEvent:function(){
            var that = this;
            var leftBtn = this._that.find('.'+this.settings.leftBtn);
            var rightBtn = this._that.find('.'+this.settings.rightBtn);
            leftBtn.on('click',function(){
                if(that.isClick) return;
                that.isClick = true;
                that.next = that.current - 1;
                if(that.next < 0){
                    that.next = that.Len-1;
                    that.toRightMove(that.current,that.next);
                    that.current = that.next;
                }else{
                    that.toRightMove(that.current,that.next);
                    that.current = that.next;
                };
                that.isClick = false;
            });
            rightBtn.on('click',function(){
                if(that.isClick) return;
                that.isClick = true;
                that.next = that.current + 1;
                if(that.next >that.Len-1){
                    that.next = 0;
                    that.show(that.current,that.next);
                    that.current = that.next;
                }else{
                    that.show(that.current,that.next);
                    that.current = that.next;
                }
                that.isClick = false;
                
            });
        }
    };
    $.fn[pluginName] = function(opt) {
        this.each(function() {
            var _this = $(this);
            //plugin_imgFade = new imgFade(this, opt,_this);
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new imgMove(this, opt,_this));
                
            }
        });
        return this;
    };  
    
})(jQuery);


