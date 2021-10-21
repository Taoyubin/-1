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



    var idxnewsNum = 1;
    window.onresize = function() {
        bgHeight();
        if ($(".vd-banner-s4-1").length > 0) {
            inits4(idxnewsNum)
        }
        // bannerVideoHei();
    }

    if ($(".news-list").length > 0) {
        inits4(idxnewsNum)
        $(".l li").click(function() {
            $(this).children('a').addClass('active').parent().siblings().children('a').removeClass('active')


        })

    }

    function inits4(idxi) {
        if (window.innerWidth <= 860) { /*包含滚动条的浏览器宽度，中小屏17\19*/
            new Swiper('.vd-banner-s4-' + idxi, {
                autoplay: 4000, //可选选项，自动滑动
                loop: true,
                slidesPerView: 1, //屏幕为1
                slidesPerGroup: 1,
                spaceBetween: 15,
                nextButton: '.s4-next-' + idxi,
                prevButton: '.s4-prev-' + idxi,
                observer: true,
                observeParents: true,
            });
        } else {
            new Swiper('.vd-banner-s4-' + idxi, {
                autoplay: 5000, //可选选项，自动滑动
                loop: true,
                slidesPerView: 2, //屏幕为1
                slidesPerGroup: 2,
                spaceBetween: 40,
                nextButton: '.s4-next-' + idxi,
                prevButton: '.s4-prev-' + idxi,
                observer: true,
                observeParents: true,

            });
        }
    }






    if ($(".about-timeline").length > 0) {
        new Swiper('.about-timeline .swiper-container', {
            autoplay: 4000, //可选选项，自动滑动
            loop: false,
            speed: 1600,
            pagination: '.about-timeline-page',
            paginationBulletRender: function(swiper, index, className) {
                var year = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-year');
                return '<span class="' + className + '">' + year + '</span>';
            },
            paginationClickable: true,
            nextButton: '.about-timeline-next',
            prevButton: '.about-timeline-prev',
        });

    }
    if ($(".value-worth-vd").length > 0) {
        new Swiper('.value-worth-vd', {
            autoplay: 5000, //可选选项，自动滑动
            effect: 'fade',
            pagination: '.value-worth-page',
            paginationClickable: true,
            paginationBulletRender: function(swiper, index, className) {
                var txt = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-txt');
                return '<span class="' + className + '"><i></i>' + txt + '</span>';
            },
        })
    }

    if ($(".brands-vd").length > 0) {
        new Swiper('.brands-vd', {
            autoplay: 3000, //可选选项，自动滑动
            nextButton: '.brands-next',
            prevButton: '.brands-prev',
        })
    }

    if ($(".bigdata-vd").length > 0) {
        for (var bigdatai = 1; bigdatai < 3; bigdatai++) {
            new Swiper('.bigdata-vd' + bigdatai, {
                autoplay: 5000, //可选选项，自动滑动
                loop: true,
                nextButton: '.bigdata-next' + bigdatai,
                prevButton: '.bigdata-prev' + bigdatai,
            })
        }
    }


    $(".playvideo-menu").click(function() {
        $('#playpoint').html('')
        $(".layuiBg1").css({
            display: "block",
        });
        $(".layuiBox1").css({
                left: ($("body").width() - $(".layuiBox1").width()) / 2 + "px",
                top: ($(window).height() - $(".layuiBox1").height()) / 2 + "px",
                display: "block",
            })
            /* console.log($(this).attr("data-id"))
            console.log($(this).attr("data-url")) */
        if ($(this).attr("data-id")) {
            btn($(this).attr("data-id"));
        } else if ($(this).attr("data-url") != '') {
            btnself($(this).attr("data-url"))
        }
        $("#videotitle").html($(this).attr("data-title"));
    });

    $(".layuiBg1,.layerClose").click(function() {
        $(".layuiBox1 ,.layuiBg1").css({
            display: "none"
        });
        $("#playpoint").html('').hide();
    });


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