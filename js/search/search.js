/* 鼠标滑动导航放大缩小 */

$(function() {
    $(window).on('scroll', function() { //scroll:滚动
        if ($(window).scrollTop() > 100) {
            $('#header').removeClass('.nav-wrap').addClass('small');
        } else {
            $('#header').removeClass('small').addClass('.nav-wrap');
        }
    });
});

/* 下拉菜单 */
/* .stop() 解决动画效果重叠问题 */
$(document).ready(function() {
    $(".second-nav-wrap").stop().hide()
    $('.nav-wrap li').hover(function() {
            $('.second-nav-wrap', this).stop().slideDown(250);
        },
        function() {
            $('.second-nav-wrap', this).stop().slideUp(150);
        });
});



/* 侧边栏导航*/
$(function() {
    //点击出现
    $(".list-li").click(function() {
            Aobj(".head-wrap");
            $("body,#header,.small").animate({
                left: '-600px'
            }, 400)
            $(".side-nav-wrap").css({
                zIndex: 100
            }).animate({
                opacity: 1,
            }, 300)
            $(".side-nav").animate({
                right: 0
            }, 400)
        })
        //点击消失
    $(".close,.side-nav-wrap").click(function() {
        Aobj(".head-wrap");
        $("body,#header,.small").animate({
            left: '0'
        }, 400)
        $(".side-nav-wrap").animate({
            opacity: 0,
            zIndex: -1
        }, 300)
        $(".side-nav").animate({
            right: '-600px'
        }, 400)
    })

    function Aobj(aaa) {
        /* 点击前后过度时间为0s */
        $(aaa).css('-webkit-transition', '0s');
    }
})

/* ipad 手机端 */
$(function() {
    var navOBJ = $('.nav-menu'),
        modalBg = $('.modal-bg'),
        menulist = $('.modal-warp'),
        menuD = $('.modal-warp ul li i'),
        mson = $('.menuson');
    navOBJ.click(function() {
        switchMenu($(this));
    });
    /* 点击下拉 */
    menuD.click(function() {
        var sonBtn = $(this).siblings('.modal-a1');
        if (sonBtn.hasClass('msq')) {
            sonBtn.removeClass('msq');
            $(this).parent('span').next('.menuson').slideUp();
        } else {
            sonBtn.addClass('msq');
            $(this).parent('span').next('.menuson').slideDown();
        }
        return false;
    });

    $('.modal-bg,.modal-warp').click(function() {
        navOBJ.removeClass('menuClose');
        modalBg.fadeOut();
        menulist.removeClass('open');
        $('body,html').removeClass('limibody');
    });

    function switchMenu(_this) {
        if (_this.hasClass('menuClose')) {
            _this.removeClass('menuClose');
            modalBg.fadeOut();
            modalBg.css({
                'visibility': 'hidden'
            });
            menulist.removeClass('open');
            $('body,html').removeClass('limibody');
        } else {
            _this.addClass('menuClose');
            modalBg.fadeIn();
            modalBg.css({
                'visibility': 'visible'
            });
            menulist.addClass('open');
            $('body,html').addClass('limibody');
        }
    }

    function bgHeight() {
        var winh = $(window).height();
        modalBg.height(winh - $('.head-wrap').innerHeight());
        menulist.height(winh - $('.head-wrap').innerHeight());
        modalBg.css({
            'top': $('.head-wrap').innerHeight() + 'px'
        });
        menulist.css({
            'top': $('.head-wrap').innerHeight() + 'px',
            'overflow-y': 'scroll'
        });
    }
    bgHeight();

    /* @返回顶部 */
    totop();

    function totop(min_height) {
        min_height ? min_height = min_height : min_height = 600;
        $(window).scroll(function() {
            var s = $(window).scrollTop();
            if (s > min_height) {
                $(".gotop").fadeIn(100)
            } else {
                $(".gotop").fadeOut(200)
            }
        })
    };
    $(".gotop").click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    })

})