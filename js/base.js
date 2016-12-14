


$(function () {
    initTop();

});

/*    
     *    选项卡样式二(箭头轮播图)
     *    oClass轮播图类;   oLeft左箭头类;
     *    oRight右键头类;   oNum显示张数默认1;
     */
    function swiperShow(oClass,oPagination,oLeft,oRight,loop,oNum){
            oNum = oNum || 1;
        var mySwiper = new Swiper('.'+oClass, {
                slidesPerView: oNum,
                loop:true,
                autoplay: 3000,
                pagination :'.'+oPagination,
                paginationClickable: true
        });
        $('.'+oLeft).on('click', function(e){
            mySwiper.swipePrev()
            console.log(mySwiper.activeIndex); 
        })
        $('.'+oRight).on('click', function(e){
            mySwiper.swipeNext()
            console.log(mySwiper.activeIndex); 
        })   
    }
//初始化页面顶部导航
function initTop() {
    var docWidth = $(document).width();
    var oTop = $("#top");
    var oNavSecond = $(".nav_second");
    var oNavFirst = $("#nav_first");
    var oNavBtns = oNavFirst.find("li");
    var oBtn = $("#nav_btn");
    var oBtn2 = $(".nav_btn02");
    oBtn.append('<img src="images/top/btn_down.jpg" alt="" />');
    var oBtnImg = oBtn.find("img");
    oNavSecond.css("width", (docWidth - 310) + "px");
    if ($(window).width() <= 960) {
        oTop.css("width", "960px");
    }
    else {
        oTop.css("width", "100%");
    }
    oBtn.hover(function () {
        $('.down-btn02').show();
    }, function () {
        $('.down-btn02').hide();
    });
    oBtn.click(function () {
        oNavFirst.slideDown();
        $('.down-btn02').hide();
        return false;
    });
    $(document).on('click',function(){
        oNavFirst.slideUp();
    })
    // oNavFirst.hover(function () { }, function () {
    //     oNavFirst.slideUp();
    // });
    oNavBtns.each(function (i) {
        $(this).hover(function () {
            oNavFirst.find("a.nav_link_f").removeClass("current");
            $(this).find("a.nav_link_f").addClass("current");
            oNavSecond.hide("fast");
            $(this).find("div.nav_second").show("fast");
        }, function () {

        });
    });
    $(window).resize(function () {
        docWidth = $(document).width();
        oNavSecond.css("width", (docWidth - 310) + "px");
        if ($(window).width() <= 960) {
            oTop.css("width", "960px");
        }
        else {
            oTop.css("width", "100%");
        }
		$('.bottom').css({'top':$(window).height()-30+'px'});
    });
}

//页面大图切换
$.fn.initImgScroll = function (options) {
    var defaults = {
        imgbox: "#wrap_index",
        imgboxs: "#wrap_index > div.index_box",
        prev: "#prev",
        next: "#next",
        time: 1000,
        i: 0
    }
    var options = $.extend(defaults, options);
    var wrap = $(this);
    var imgbox = $(options.imgbox);
    var imgboxs = $(options.imgboxs);
    var prev = $(options.prev);
    var next = $(options.next);
    var imgNum = imgboxs.length;
    var i = options.i;
    var winWidth = $(window).width();
    prev.hide();

    if (winWidth <= 960) {
        wrap.css("width", "960px");
        imgbox.css("width", (960 * imgNum) + "px");
        imgboxs.css("width", "960px");
    }
    else {
        wrap.css("width", "100%");
        imgbox.css("width", (winWidth * imgNum) + "px");
        imgboxs.css("width", winWidth + "px");
    }
    $(window).resize(function () {
        winWidth = $(window).width();
        if (winWidth <= 960) {
            wrap.css("width", "960px");
            imgbox.css("width", (960 * imgNum) + "px");
            imgboxs.css("width", "960px");
        }
        else {
            wrap.css("width", "100%");
            imgbox.css("width", (winWidth * imgNum) + "px");
            imgboxs.css("width", winWidth + "px");
        }
        imgbox.css("left", (-i * imgboxs.eq(0).width()) + "px");
    });

    prev.click(function () {
        i = i - 1;
        showBtn();
        indexAnimate();
    });
    next.click(function () {
        i = i + 1;
        showBtn();
        indexAnimate();
    });

    function indexAnimate() {
        imgbox.stop().animate({ "left": (-i * imgboxs.eq(0).width()) + "px" }, options.time);
    }
    function showBtn() {
        if (i <= 0) {
            prev.hide();
            next.show();
        }
        else if (i >= imgNum - 1) {
            prev.show();
            next.hide();
        }
        else {
            prev.show();
            next.show();
        }
        if (imgNum == 1) {
            prev.hide();
            next.hide();
        }
    }
    showBtn();
    imgbox.css({ "left": (-i * imgboxs.eq(0).width()) + "px" });
}

$.fn.initImgScroll2 = function (options) {
    var defaults = {
        wrap: "#wrap_print",
        scroll_list: "#scroll_list",
        imgboxs: "#wrap_index > div.index_box",
        prev: "#prev",
        next: "#next",
        time: 1000
    }
    var options = $.extend(defaults, options);
    var wrap = $("#wrap_print");
    var scroll_box = $(this);
    var scroll_list = $("#scroll_list");
    var scroll_imgs = scroll_list.children();
    var winWidth = $(window).width();
    var liWidth = scroll_imgs.eq(0).outerWidth();
    var prev = $("#prev_scroll");
    var next = $("#next_scroll");
    var i = 0;
    var x = 1;

    function setPosition() {
		
        if (winWidth <= 960) {
            wrap.css("width", "960px");
        }
        else {
            wrap.css("width", "100%");
        }
        scroll_box.css("width", (Math.floor((wrap.width() - 200) / liWidth) * liWidth) + "px");
        scroll_box.css("left", (wrap.width() - scroll_box.width()) / 2 + "px");
        x = Math.ceil(scroll_imgs.length / (scroll_box.width() / liWidth));
    }
    setPosition();
    setBtn();
    $(window).resize(function () {
        winWidth = $(window).width();
        setPosition();
        setBtn();
    });

    prev.click(function () {
        setPosition();
        if (i >= x - 1) {
            i = x - 1;
        }
        i = i - 1;
        setBtn();
        scrollAnimate();
    });
    next.click(function () {
        setPosition();
        i = i + 1;
        setBtn();
        scrollAnimate();
    });
    function scrollAnimate() {
        scroll_list.stop().animate({ "left": -i * scroll_box.width() + "px" }, options.time);
    }
    function setBtn() {
        //alert(x);
        if (i <= 0) {
            prev.hide();
            next.show();
        }
        else if (i >= x - 1) {
            prev.show();
            next.hide();
        }
        else {
            prev.show();
            next.show();
        }
        if (x == 1) {
            i = 0;
            prev.hide();
            next.hide();
            scrollAnimate();
        }
    }

    scroll_imgs.each(function (i) {
        $(this).find("a").hover(function () {
            //$(this).find("img").stop().animate({ "width": "240px", "top": "-20px", "left": "-20px" }, 200);
        }, function () {
            //$(this).find("img").stop().animate({ "width": "200px", "top": "0px", "left": "0px" }, 200);
        });
    });
}

$.fn.initImgPanes = function (options) {
    var defaults = {
        navbox: ".star_img_nav",
        imgbox: ".star_img_box"
    }
    var options = $.extend(defaults, options);

    var navbox = $(options.navbox);
    var imgbox = $(options.imgbox);
    navbox.each(function (i) {
        $(this).css("padding-top", (624 - $(this).height()) / 2 + "px");
        $(this).children().each(function (x) {
            navbox.eq(i).children().removeClass("current").eq(0).addClass("current");
            imgbox.eq(i).children().hide().eq(0).show();
            $(this).click(function () {
                navbox.eq(i).children().removeClass("current").eq(x).addClass("current");
                imgbox.eq(i).children().hide("fast").eq(x).show("fast");
            });
        });
    });
}

//读取XML文件方法
function loadImgs(url, fnInitXml) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        success: function (xml) {
            fnInitXml(xml);
        }
    });
}

//读取txt文件方法
function loadTxt(url, fnInitXml) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        success: function (txt) {
            fnInitXml(txt);
        }
    });
}
// 读取url参数值
function getUrlParam(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象

    var r = window.location.search.substr(1).match(reg);  //匹配目标参数

    if (r != null) return unescape(r[2]); return null; //返回参数值

}


var browser={
		versions:function(){    
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
		trident: u.indexOf('Trident') > -1, //IE内核
		presto: u.indexOf('Presto') > -1, //opera内核 
		webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
		mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
		iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
		iPad: u.indexOf('iPad') > -1, //是否iPad
		webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部 
		};
		}()
		} 
		
		
$(document).ready(function(e) {
	 if(browser.versions.iPad){
	 	$('.scroll_body').height($(window).height()-40);
		$('.bottom').css({'top':$(window).height()-62+'px'});
	 }else{
		 $('.scroll_body').height($(window).height()-0);
		 $('.bottom').css({'top':$(window).height()-30+'px'});
	 }
	
	//$('.index_img_show').css({'top':($(window).height()-500)/2-25+'px'});
	//$('.index_img_show').css({'top':10+'px'});
	//$('.bottom').css({'top':$(window).height()-30+'px'});
	
	var hasAudio = !!(document.createElement('audio').canPlayType);
	if(hasAudio){
		var Media = document.getElementById("audio-mp3");
		if(Media){
			$('#sound').click(function(){
					//console.log(Media)
					if($(this).attr('tip')==1){
						//bgsound').html('');
						Media.pause();
						$(this).attr('tip',2);
						$(this).attr('src','images/soundno.jpg');
					}else{
						Media.play();
						//$('#bgsound').html('<audio src="music/bgmusic.mp3" controls="controls" autoplay="false" loop="loop"><source src="music/bgmusic.mp3"></source><source src="music/bgmusic.ogg"></source></audio>');
						$(this).attr('tip',1);
						$(this).attr('src','images/sound.gif');
					}
			})
		}else{
			$("#sound").attr('src','images/soundno.jpg');
		}
	}
	
	var hasAudio = !!(document.createElement('audio').canPlayType);
	if(!hasAudio){
		$("#sound,#bgsound audio").hide();
		$("#bgsound").show();
		audiojs.events.ready(function() {
			audiojs.createAll();
		});
	}
	
	$('#full').click(function(element){
		if($(this).attr('tip')==1){
			$('#bgsound').html('');
			$(this).attr('tip',2);
			element.webkitRequestFullScreen();
			element.mozRequestFullScreen();
			element.requestFullscreen();
		}else{
			$(this).attr('tip',1);
			document.webkitCancelFullScreen();
			document.mozCancelFullScreen();
			document.exitFullscreen();
		}
	})
});