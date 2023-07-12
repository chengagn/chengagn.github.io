// JavaScript Document
$(window).load(function(){
	var why_obj={
        
		//可修改区域
		w_timer: 3000,				//滚动时间
        w_auto: true,				//是否自动滚动
		
		
		//不可修改区域
		w_len:$(".banner li").length,
		w_f:$("#banner"),
		w_c: $(".banner"),
		w_u: $(".banner ul"),
        w_l:$(".banner ul li"),			
        w_time: null,			
        w_top: 0,			
        w_dir:-1,			
        w_h: $(".banner ul li img").get(0).offsetHeight,
        w_nb: $(".bannNav"),
        w_curr:0,
        why_move: function () {
            var obj = this;
            if (obj.w_auto) {
                obj.w_time = setInterval(function () {
                    obj.w_top = parseInt(obj.w_u.css("top")) + obj.w_dir * obj.w_h;
                    if (obj.w_top <= -obj.w_h * obj.w_len) {
                        obj.w_top = 0;
                    }
                    obj.w_curr = Math.abs((obj.w_top / obj.w_h));
                    obj.w_u.animate({ top: obj.w_top }, 300);
                    obj.w_nb.find("a").find("h3").css("background", "#000");
                    obj.w_nb.find("a").eq(obj.w_curr).find("h3").css("background", "none");
                }, obj.w_timer)
            } else {
                clearInterval(obj.w_time);
                obj.w_time = null;
            }
        },
        why_onmouse: function () {
            var obj = this;
            obj.w_f.mouseenter(function () {
                clearInterval(obj.w_time);
                obj.w_time = null;
            })
            obj.w_f.mouseleave(function () {
                obj.why_move();
            })
        },
        why_bannNavClick: function () {
            var obj = this;
            obj.w_nb.find("a").each(function (index) {
                obj.w_nb.find("a").eq(index).click(function () {
                    var top = -(index * obj.w_h);
                    obj.w_u.animate({ top: top }, 300);
                    obj.w_curr = index;
                    obj.w_nb.find("a").find("h3").css("background", "#000");
                    obj.w_nb.find("a").eq(obj.w_curr).find("h3").css("background", "none");
                    return false;
                })
            })
        },
        why_size: function () {
            var obj = this;
            $(window).resize(function () {
                obj.w_h = $(".banner ul li img").get(0).offsetHeight;
				
                obj.w_c.css({ "height": obj.w_h + "px" });
                obj.w_f.css({ "height": obj.w_h + "px" });
                obj.w_l.css({ "height": obj.w_h + "px" });
				obj.w_curr=0;
                obj.w_u.css({"top":"0px", "height": obj.w_h * obj.w_len + "px"});
				obj.w_nb.find("a").find("h3").css("background", "#000")
				obj.w_nb.find("a").eq(obj.w_curr).find("h3").css("background", "none");
				
            })
        },
        whyInit: function () {
            var obj = this;

            obj.w_nb.css({
                "height": 43* obj.w_len + "px",
                "top": "50%",
                "margin-top": (-43 * obj.w_len/2) + "px",
                "left":"10%"
            });
            var $img=obj.w_nb.find("img");
            for (var i = 0; i < obj.w_len; i++) {
                var imgSrc = $img.eq(i).attr("src");
                $img.eq(i).parent().css("background", "url(" + imgSrc + ") no-repeat");
                $img.eq(i).remove();
            }

            obj.w_nb.find("a").eq(obj.w_curr).find("h3").css("background", "none");
            
            obj.w_c.css({"height": obj.w_h + "px" });
            obj.w_f.css({ "height": obj.w_h + "px" });
            obj.w_l.css({ "height": obj.w_h + "px" });
		    obj.w_u.css("height", obj.w_h * obj.w_len + "px");
		    obj.why_move();
		    obj.why_onmouse();
		    obj.why_bannNavClick();
		    obj.why_size();
		},
		loadFunc:function(){
			this.whyInit()
		}	
	}
	why_obj.loadFunc();
})
