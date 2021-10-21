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




    if ($(".vd-banner-s1-v").length > 0) {
        new Swiper(".vd-banner-s1-v", {
            autoplay: 4000, //可选选项，自动滑动
            /* loop: true, */
            pagination: '.s1-page',
            paginationClickable: true,
            paginationBulletRender: function(swiper, index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
            onInit: function(swiper) {
                //Swiper初始化了
                var realCurIndex = swiper.realIndex; //当前轮播真是索引，不包含复制的
                bannerVideo(realCurIndex)
            },
            onSlideChangeEnd: function(swiper) {
                /* console.log(swiper)
                console.log(swiper.realIndex) */
                var realCurIndex = swiper.realIndex; //当前轮播真是索引，不包含复制的
                bannerVideo(realCurIndex)
            },

        })
    }

    if ($(".vd-banner-s2").length > 0) {
        var s2 = new Swiper(".vd-banner-s2", {
            autoplay: 4000, //可选选项，自动滑动 
            loop: true,
            pagination: '.s2-page',
            prevButton: '.s2-prev',
            nextButton: '.s2-next',
            paginationClickable: true,
            /* hashnav:true, */
            paginationBulletRender: function(swiper, index, className) {
                var pageArr = eval(document.querySelectorAll('.vd-banner-s2')[0].getAttribute('data-page'));
                // console.log(pageArr)
                return '<span class="' + className + '">' + pageArr[index] + '</span>';
            },
            onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
                swiperAnimateCache(swiper); //隐藏动画元素 
                swiperAnimate(swiper); //初始化完成开始动画
            },
            onSlideChangeEnd: function(swiper) {
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            }
        })
    }
    if ($(".vd-banner-s3").length > 0) {
        new Swiper(".vd-banner-s3", {
            autoplay: 4000, //可选选项，自动滑动
            loop: true,
            prevButton: '.s3-prev',
            nextButton: '.s3-next',
        })
    }

    function inits4(idxi) {
        if (window.innerWidth <= 860) { /*包含滚动条的浏览器宽度，中小屏17\19*/
            new Swiper('.vd-banner-s4-' + idxi, {
                autoplay: 4000, //可选选项，自动滑动
                loop: true,
                slidesPerView: 1,
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
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                nextButton: '.s4-next-' + idxi,
                prevButton: '.s4-prev-' + idxi,
                observer: true,
                observeParents: true,

            });
        }
    }

    function reportVd() {
        new Swiper('.report-vd', {
            autoplay: 3000, //可选选项，自动滑动
            loop: true,
            slidesPerView: 3,
            nextButton: '.report-next',
            prevButton: '.report-prev',
            spaceBetween: 10,
        })
    }

    function advantageVd(view) {
        new Swiper('.advantage-vd', {
            autoplay: 5000, //可选选项，自动滑动
            slidesPerView: view,
            nextButton: '.advantage-next',
            prevButton: '.advantage-prev',
        })
    }
    if ($(".spirit-vd").length > 0) {
        new Swiper('.spirit-vd', {
            autoplay: 5000, //可选选项，自动滑动
            loop: true,
            prevButton: '.spirit-prev',
            nextButton: '.spirit-next',
        })
    }



    var bodyWidth;
    var idxnewsNum = 1;
    window.onresize = function() {
            // juageBody();
            bgHeight();
            if ($(".vd-banner-s4-1").length > 0) {
                inits4(idxnewsNum)
            }
            // bannerVideoHei();
        }
        // juageBody()
    if ($(".vd-banner-s4-1").length > 0) {
        inits4(idxnewsNum)
        $(".s4-tab span").click(function() {
            var idx = $(this).index();
            /* console.log(idx) */
            $(this).addClass('active').siblings('span').removeClass('active')
            $(this).parents('.s4-tab').siblings('.s4-tabcon').find(".s4-con").hide().eq(idx).show();
            idxnewsNum = idx + 1
            inits4(idxnewsNum)
        })
    }

    function inits4(idxi) {
        if (window.innerWidth <= 860) { /*包含滚动条的浏览器宽度，中小屏17\19*/
            new Swiper('.vd-banner-s4-' + idxi, {
                autoplay: 4000, //可选选项，自动滑动
                loop: true,
                slidesPerView: 1,
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
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                nextButton: '.s4-next-' + idxi,
                prevButton: '.s4-prev-' + idxi,
                observer: true,
                observeParents: true,

            });
        }
    }

    function reportVd() {
        new Swiper('.report-vd', {
            autoplay: 3000, //可选选项，自动滑动
            loop: true,
            slidesPerView: 3,
            nextButton: '.report-next',
            prevButton: '.report-prev',
            spaceBetween: 10,
        })
    }

    function advantageVd(view) {
        new Swiper('.advantage-vd', {
            autoplay: 5000, //可选选项，自动滑动
            slidesPerView: view,
            nextButton: '.advantage-next',
            prevButton: '.advantage-prev',
        })
    }

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