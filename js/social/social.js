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

    /* @视频弹出 腾讯统一播放器javascript调用方法*/
    function btn(vid) {
        var videoWidth = $(".layuiBox1").width();
        var videoHeight = $(".layuiBox1").height() + 55;
        /* console.log(videoWidth)
        console.log(videoHeight) */
        var video = new tvp.VideoInfo(); //初始化视频对象
        video.setVid(vid); //向视频对象传入视频vid ，这个是点播的时候使用

        var player = new tvp.Player(videoWidth, videoHeight - 55); //初始化播放器对象并设置宽、高
        player.setCurVideo(video); //设置播放器初始化时加载的视频
        player.addParam("autoplay", "1"); //是否自动播放
        player.addParam("adplay", "0"); //是否播放广告；1播放，0不播放，默认为1
        player.addParam("wmode", "transparent"); //设置透明化，不设置时，视频为最高级，总是处于页面的最上面，此时设置z-index无效
        player.addParam("player", "html5"); //播放器类别；有4种参数，auto：自动，ocx：控件播放器，flash：flash播放器，html5：html5播放器，默认为auto，程序自动根据操作系统、平台以及浏览器选择最合适的播放器。
        player.addParam("showend", 0); //结束时是否有广告 
        player.write("playpoint"); //输出播放器  

        // var vid = document.getElementById("tenvideo_video_player_0");
        player.onplaying = function(vid) { //在视频/音频（audio/video）开始播放时触发。  
        };
        $('#playpoint').show();
    }
    /* @视频弹出 使用自己网站视频时 */
    function btnself(selfurl) {
        $('#playpoint').append('<video style="width:100%" autoplay controls="controls"><source src="' + selfurl + '"></source></video>')
        $('#playpoint').show();
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

    /* @教育科技页 */
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
    /* @战略投资页 */
    if ($(".advantage-vd").length > 0) {
        if (bodyWidth < 860 && bodyWidth > 600) {
            advantageVd(3)
        } else if (bodyWidth < 600 && bodyWidth > 460) {
            advantageVd(2)
        } else if (bodyWidth < 460) {
            advantageVd(1)
        } else {
            advantageVd(4)
        }

    }

    /* @社会责任页 数字 */
    if ($("#socialtimer1").length && $(".module4-numdistance").length && s > ($(".module4-numdistance")[0].offsetTop - 700) && timeJump) {
        for (var sociali = 1; sociali < 3; sociali++) {
            new CountUp("socialtimer" + sociali, 0, $("#socialtimer" + sociali).attr('data-num'), 0, 2, options).start();
        }
        timeJump = false;
    }

    /* @社会责任页 */

    if ($(".social-timeline").length > 0) {
        new Swiper('.social-timeline .swiper-container', {
            autoplay: 5000, //可选选项，自动滑动
            loop: false,
            speed: 1600,
            pagination: '.social-timeline-page',
            paginationBulletRender: function(swiper, index, className) {
                var year = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-year');
                return '<span class="' + className + '">' + year + '</span>';
            },
            paginationClickable: true,
            nextButton: '.social-timeline-next',
            prevButton: '.social-timeline-prev',
        });
    }
    if ($(".social-timeline2").length > 0) {
        new Swiper('.social-timeline2 .swiper-container', {
            autoplay: 5000, //可选选项，自动滑动
            loop: false,
            pagination: '.social-timeline-page2',
            paginationBulletRender: function(swiper, index, className) {
                var year = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-year');
                return '<span class="' + className + '">' + year + '</span>';
            },
            paginationClickable: true,
            nextButton: '.social-timeline-next2',
            prevButton: '.social-timeline-prev2',
        });
    }
    if ($(".social-timeline3").length > 0) { //移动
        if (bodyWidth < 860) {
            // alert(1)
            new Swiper('.social-timeline3 .swiper-container', {
                /* autoplay: 5000,//可选选项，自动滑动 */
                loop: true,
                pagination: '.social-timeline-page3',
                paginationClickable: true,
                onSlideChangeStart: function(swiper) {
                    /* console.log(swiper)
                    console.log(swiper.realIndex) */
                    $('.social-timeline3').height($('.social-timeline3 .swiper-slide-active').height())
                },
                observer: true,
                observeParents: true,
            });
        }

    }
    if ($(".spirit-vd").length > 0) {

        new Swiper('.spirit-vd', {
            autoplay: 5000, //可选选项，自动滑动
            loop: true,
            prevButton: '.spirit-prev',
            nextButton: '.spirit-next',
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